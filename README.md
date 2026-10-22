# Humanly — Writing, made yours

A polished, responsive writing workspace for humanizing and polishing text, summarizing, drafting from a brief, and reviewing citation needs.

## Live site
https://suliman7surkhrody-oss.github.io/PremiumWebsite/

## Free AI — no API key or subscription

Humanly runs the open-source **SmolLM2-360M-Instruct** ONNX model directly in your browser through Hugging Face Transformers.js.

1. Open Humanly and click **Free AI · not loaded**.
2. Select **Load free AI model**.
3. On the first run, allow the browser to download approximately 386 MB of model files. Keep the tab open while it loads.
4. Paste or type your text, choose a mode and style, and select the transform button.

No paid API, account, API key, Windows software installation, or external inference server is required. The model runs in the browser using its CPU/WASM runtime; it is smaller and slower than a large hosted model, so results may be less capable and long text should be processed in sections. The browser may cache the model for later sessions, but it can download the files again if its cache is cleared or evicted.

**Privacy:** your text is sent to the local in-browser model for generation, not uploaded to OpenAI or another AI inference provider. The page does download the model and runtime files from public CDNs/Hugging Face. Do not use Humanly on a shared device for private text.

## Important limitations
- Humanly does not promise a 0% AI-detector score or 0% plagiarism.
- AI detectors can produce false positives and are not reliable proof of authorship.
- No plagiarism database is queried; review mode flags citation needs and generic phrasing but cannot certify originality.
- A compact browser model can make mistakes and may rewrite nuanced text imperfectly. Check facts, citations, tone, and meaning before using the result.
- Processing longer drafts in sections is more reliable with this small model.

## Deploy
GitHub Actions deploys the static website to GitHub Pages on every push to the `main` branch.
