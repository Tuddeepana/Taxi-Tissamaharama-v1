<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Business data (rates, WhatsApp number, copy, reviews, site URL) lives in src/config/site.ts — single editable source.
- Geocoding/routing uses openrouteservice via server functions in src/lib/routing.functions.ts with secret ORS_API_KEY — key never reaches the browser.
- Single landing page at /; sitemap served by src/routes/sitemap[.]xml.ts using SITE.url or request origin.
