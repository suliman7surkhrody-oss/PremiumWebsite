# Humanly — Writing, made yours

A responsive writing workspace for improving text, making a quick extractive summary, planning an essay, and reviewing writing quality.

## Live site
https://suliman7surkhrody-oss.github.io/PremiumWebsite/

## Free, phone-friendly text tools

Humanly's built-in text tools run directly in the page. They do **not** call a paid AI API, load a language model, or require an account, API key, subscription, or software installation.

1. Open Humanly on your phone or computer.
2. Paste or type your essay, paragraph, email, report, or other text.
3. Choose **Humanize text** or **Rewrite & polish**, then tap the action button.
4. Copy the result or export it as a text file.

The humanizer tidies spacing and punctuation and replaces selected wordy or formulaic phrases with simpler wording. Conversational style can use common contractions; concise style applies a few additional reductions. It is intentionally lightweight and fast on mobile devices. Your text is processed in the browser and is not sent to an AI inference provider.

## What the tools can and cannot do

- **Humanize / Polish:** small, rule-based wording improvements. This is not generative AI and will not rewrite every sentence from scratch.
- **Summarize:** selects relevant sentences from your input; it does not write a new abstract in its own words.
- **Draft from brief:** creates an essay outline to help you write your own argument. It does not generate a complete essay from a short prompt.
- **Originality review:** flags a few formulaic phrases, repeated sentence openings, long sentences, and claims worth checking. It does not query a plagiarism database or detect AI authorship.
- No tool can guarantee a 0% AI-detector score or a plagiarism-free result. Verify facts, citations, tone, and meaning before using the text.

Document upload supports TXT, Markdown, CSV, DOCX, and text-based PDF. DOCX/PDF extraction uses browser libraries loaded from public CDNs, while basic text editing and transformation need no AI model download.

## Deploy
GitHub Actions deploys the static website to GitHub Pages on every push to the `main` branch.
