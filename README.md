# Humanly — Writing, made yours

A responsive writing workspace for rewriting essays, paragraphs, emails, reports, and other text; summarizing; drafting from a brief; and reviewing writing quality.

## Live site
https://suliman7surkhrody-oss.github.io/PremiumWebsite/

## Real AI rewriting — free allowance, no browser API key

The front end uses a Cloudflare Workers AI backend so it can use a language model without downloading one onto a phone or exposing a provider token in the webpage. The default model is `@cf/google/gemma-4-26b-a4b-it`. Your text is sent to your configured Worker only when you click the rewrite button. Do not submit confidential content unless you are comfortable sending it to Cloudflare.

Cloudflare currently provides a **10,000 Neurons/day free Workers AI allocation** on the Workers Free plan. On that plan, requests stop when the free allocation is reached; keep the account on Free and do not upgrade to a paid plan if you need a hard no-billing limit. Usage and model availability are governed by Cloudflare's current terms and limits:
- [Workers AI pricing and free allocation](https://developers.cloudflare.com/workers-ai/platform/pricing/)
- [Workers AI model setup](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/)

## One-time setup for the AI Worker

The frontend is on GitHub Pages, which is static hosting and cannot itself run server-side AI code. The Worker files are included in this repository, but must be deployed to your Cloudflare account once before model-based rewriting can work.

1. Create or sign in to a [Cloudflare account](https://dash.cloudflare.com/). Keep the account on the **Workers Free** plan.
2. In Cloudflare, create an API token using the **Edit Cloudflare Workers** template and copy your Account ID. Scope the token to the account where you will deploy Humanly.
3. In this repository open **Settings → Secrets and variables → Actions** and add these repository secrets:
   - `CLOUDFLARE_API_TOKEN` — the token from Cloudflare.
   - `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare Account ID.
   
   Never paste the API token into a source file or the Humanly webpage.
4. Open **Actions → Deploy Humanly Free AI Worker → Run workflow**. When the run succeeds, open its log and copy the published `https://humanly-free-ai....workers.dev` URL.
5. Open the Humanly website, click **Connect free AI**, paste that Worker URL, and select **Test and connect**. This URL is saved in that browser only, so repeat that final step on your phone.

The deployment workflow is manual-only. It will not deploy the Worker until you explicitly run it after adding the two GitHub secrets.

## What the AI does

- **Humanize / Polish:** makes a genuine sentence- and paragraph-level edit instead of only swapping a few phrases.
- **Summarize:** writes a concise summary of the supplied text.
- **Draft from brief:** creates a first draft based on the supplied assignment instructions.
- **Originality review:** provides editorial feedback on repeated wording, clarity, reasoning, and evidence needs; it does not query a plagiarism database.

The model is instructed to keep the writer's meaning, avoid invented facts or experiences, and not promise or target any AI-detector score. Detectors may be inaccurate, and no tool can guarantee a particular result. Review the text yourself and add your own analysis, examples, and sources.

## Limits and privacy

- Inputs are limited to 12,000 characters per request.
- The Worker is intended to accept requests from the Humanly GitHub Pages origin only. This is a browser-origin restriction, not strong authentication; treat the endpoint as public. The Workers Free plan's daily AI allowance is the hard no-charge usage limit.
- Humanly does not log the content of submitted drafts in its Worker code.
- The frontend keeps only the Worker URL in local browser storage; it does not store your draft there.
- PDF/DOCX extraction uses browser libraries loaded from public CDNs.

## Deploy the website

GitHub Actions deploys the static website to GitHub Pages on every push to the `main` branch. Deploying the AI Worker is a separate, manual action described above.
