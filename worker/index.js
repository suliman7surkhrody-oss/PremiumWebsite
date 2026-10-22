const ALLOWED_ORIGIN = "https://suliman7surkhrody-oss.github.io";
const MODEL = "@cf/google/gemma-4-26b-a4b-it";
const MAX_INPUT_CHARS = 12000;
const MAX_OUTPUT_TOKENS = 2200;

function makeHeaders(origin) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Vary": "Origin"
  };
  if (origin === ALLOWED_ORIGIN) {
    headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN;
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return headers;
}

function jsonResponse(origin, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: makeHeaders(origin)
  });
}

function styleDescription(tone) {
  const tones = {
    natural: "natural, balanced and clear",
    academic: "academic and precise, but not needlessly formal",
    professional: "professional, direct and polished",
    conversational: "warm and conversational, using contractions where they fit",
    concise: "concise and direct without losing important qualifications",
    confident: "confident and persuasive without overstating the evidence"
  };
  return tones[tone] || tones.natural;
}

function depthDescription(depth) {
  const depths = {
    deep: "Make a genuine sentence-level and paragraph-level rewrite. Rebuild repetitive or awkward sentences where needed; do not merely swap synonyms. Remove empty introductory filler, vary sentence patterns when it helps the meaning, and improve transitions without adding padding.",
    balanced: "Rewrite awkward sentences and formulaic phrases while keeping much of the author's organization and wording.",
    light: "Make only the edits needed for clarity, grammar, and flow. Preserve most of the original phrasing."
  };
  return depths[depth] || depths.deep;
}

function lengthDescription(length) {
  const lengths = {
    similar: "Keep approximately the same overall length.",
    shorter: "Make it more concise while preserving the essential points, examples, evidence, and qualifications.",
    longer: "Develop under-explained points only when the supplied text supports it. Do not pad the answer or invent missing details."
  };
  return lengths[length] || lengths.similar;
}

function modeDescription(mode) {
  const modes = {
    humanize: "Edit the supplied draft as a careful human editor would: improve flow, natural phrasing, sentence variety, clarity and specificity while preserving the author's intended meaning and voice. Retain the original language. Avoid stock introductions, repetitive transitions, and generic conclusions when they add nothing.",
    rewrite: "Rewrite and polish the supplied text for clarity, grammar, structure and impact. Preserve the author's position, nuance, factual claims, names, numbers, quotations and citations.",
    summarize: "Summarize only the supplied text. Keep its central claims, key supporting details and important limitations. Do not add outside facts. Return a readable summary, not a commentary about the task.",
    essay: "Use the user's brief to create a useful first draft with a clear thesis, coherent paragraphs, analysis and a conclusion. Use only facts and sources supplied by the user. Do not invent quotations, references, statistics or personal experiences. Mark missing evidence as [source needed] and make it clear where the user should add their own analysis.",
    originality: "Review the supplied writing for formulaic wording, weak reasoning, unclear sentences and claims that need evidence. Give actionable suggestions and quote only short snippets from the supplied text. Do not claim to run a plagiarism database or an AI detector, and do not claim a score."
  };
  return modes[mode] || modes.humanize;
}

function getResult(output) {
  if (typeof output === "string") return output;
  if (typeof output?.response === "string") return output.response;
  if (typeof output?.result === "string") return output.result;
  const content = output?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  return "";
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      if (origin !== ALLOWED_ORIGIN) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers: makeHeaders(origin) });
    }

    // This Worker is intended for the Humanly GitHub Pages origin only.
    if (origin !== ALLOWED_ORIGIN) {
      return jsonResponse(origin, { error: "Requests are accepted only from the Humanly website." }, 403);
    }

    if (request.method === "GET" && (url.pathname === "/health" || url.pathname === "/")) {
      return jsonResponse(origin, {
        ok: true,
        service: "humanly-free-ai",
        model: MODEL,
        message: "Humanly AI Worker is ready."
      });
    }

    if (url.pathname !== "/humanize") {
      return jsonResponse(origin, { error: "Route not found." }, 404);
    }

    if (request.method !== "POST") {
      return jsonResponse(origin, { error: "Use POST for text processing." }, 405);
    }

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 60000) {
      return jsonResponse(origin, { error: "The request is too large. Split your draft into shorter sections." }, 413);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(origin, { error: "The request body must be valid JSON." }, 400);
    }

    const text = typeof body?.text === "string" ? body.text.trim() : "";
    if (!text) {
      return jsonResponse(origin, { error: "Paste or write some text first." }, 400);
    }
    if (text.length > MAX_INPUT_CHARS) {
      return jsonResponse(origin, { error: "Please process up to 12,000 characters at a time." }, 413);
    }

    const allowedModes = new Set(["humanize", "rewrite", "summarize", "essay", "originality"]);
    const mode = allowedModes.has(body.mode) ? body.mode : "humanize";
    const tone = styleDescription(body.tone);
    const depth = depthDescription(body.depth);
    const length = lengthDescription(body.length);

    const system = [
      "You are Humanly, a careful and experienced writing editor.",
      modeDescription(mode),
      "Requested style: " + tone + ".",
      "Rewrite depth: " + depth,
      "Length preference: " + length,
      "Preserve the input's language, main ideas, intended audience, point of view, specific factual claims, names, numbers, quoted text, and citations unless the task specifically asks otherwise.",
      "Do not fabricate facts, sources, quotations, data, or personal experiences. Do not insert deliberate mistakes or distort meaning. If source support is missing, say so rather than inventing it.",
      "Focus on genuinely clear, natural and specific prose rather than superficial synonym swaps. Do not optimize for, promise, or claim to bypass AI detectors; their scores cannot be guaranteed.",
      "Return only the finished rewrite, summary, draft, or review. Do not add a preamble about what you changed."
    ].join("\n");

    try {
      const output = await env.AI.run(MODEL, {
        messages: [
          { role: "system", content: system },
          { role: "user", content: text }
        ],
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: mode === "humanize" || mode === "rewrite" ? 0.78 : 0.55,
        top_p: 0.9,
        chat_template_kwargs: { enable_thinking: false }
      });

      const result = getResult(output).trim();
      if (!result) {
        return jsonResponse(origin, { error: "The AI model returned no text. Try a shorter input and retry." }, 502);
      }

      // Do not log request bodies or user text.
      return jsonResponse(origin, { result, model: MODEL });
    } catch (error) {
      // Error text is intentionally not logged because provider errors can include request metadata.
      return jsonResponse(origin, {
        error: "The AI request did not complete. Check the Cloudflare Workers AI daily free quota, the model's availability, and try again."
      }, 503);
    }
  }
};
