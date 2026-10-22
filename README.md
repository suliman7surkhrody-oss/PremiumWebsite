# Humanly — Writing, made yours

A polished, responsive writing workspace for rewriting, summarizing, drafting from a brief, and reviewing originality/citation needs.

## Live site
https://suliman7surkhrody-oss.github.io/PremiumWebsite/

## Real AI setup
1. Open the website and select **Connect AI**.
2. Enter your own OpenAI API key and choose a model.
3. Paste text, choose a mode and style, then run the transformation.

The API key is held in page memory only and is not written to local storage. It is sent from your browser directly to OpenAI. API usage may cost money. Do not use this on a shared computer or enter a key you do not control.

## Important limitations
- Humanly does not claim to guarantee a 0% AI-detector score or 0% plagiarism.
- AI detectors can produce false positives and are not reliable proof of authorship.
- No plagiarism database is queried; the review mode flags citation needs and generic phrasing but cannot certify originality.
- Check facts, citations, and the final wording yourself.
- This is a static GitHub Pages app. A production multi-user product should move API calls to a secure backend and use server-side secrets, rate limiting, and abuse protection.

## Deploy
GitHub Actions deploys the static website to GitHub Pages on every push to the main branch.
