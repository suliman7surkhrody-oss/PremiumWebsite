# Humanly — Writing, made yours

A responsive writing workspace for improving text, making a quick extractive summary, planning an essay, and reviewing writing quality.

## Live site
https://suliman7surkhrody-oss.github.io/PremiumWebsite/

## Free, phone-friendly writing tools

Humanly's built-in text tools run directly in the webpage. They do **not** call a paid AI API, load a language model, or require an account, API key, subscription, or software installation.

1. Open Humanly on your phone or computer.
2. Paste your own essay, paragraph, email, report, or other text.
3. Choose **Humanize text** or **Rewrite & polish**.
4. Select a writing style and **Rewrite depth**. Deeper natural rewrite is the default.
5. Copy the result or export it as a text file.

### Rewrite settings
- **Deeper natural rewrite:** removes common essay filler openings, simplifies wordy phrases, rewrites selected repetitive sentence templates, and prefers clearer verbs.
- **Balanced rewrite:** makes common wording changes while keeping more transitions.
- **Light touch:** preserves more of the source wording.
- **Writing style:** supports natural, academic, professional, conversational, concise, and confident preferences. Conversational style can use contractions; concise style shortens selected expressions.

Humanly processes text locally in the browser. It does not upload the draft to an AI inference provider.

## What the tools can and cannot do

- **Humanize / Polish:** rule-based writing edits, not generative AI. They cannot rewrite every sentence from scratch or reliably make an AI-written essay indistinguishable from a human-written one.
- **Summarize:** selects relevant sentences from your input; it does not write a new abstract in its own words.
- **Draft from brief:** creates an essay outline to help you write your own argument. It does not generate a complete essay from a short prompt.
- **Originality review:** flags selected formulaic phrases, repeated sentence openings, long sentences, and claims worth checking. It does not query a plagiarism database or detect AI authorship.
- AI detectors can be wrong, and different detectors may give conflicting scores. Humanly cannot promise a particular detector score. For meaningful improvement, use your own reasoning, evidence, wording, and examples, then verify the edited result.

Document upload supports TXT, Markdown, CSV, DOCX, and text-based PDF. DOCX/PDF extraction uses browser libraries loaded from public CDNs; everyday text rewriting needs no model download.

## Deploy
GitHub Actions deploys the static website to GitHub Pages on every push to the `main` branch.
