# Sparkling Search & Serve

TECHNOLOGY AND SEO REQUIREMENTS

Build this as a new Lovable project using its current TanStack Start stack with server-side rendering (SSR). Render the landing page’s headings, service descriptions, vehicle information, and SEO metadata in the initial HTML. Use client-side interactivity only for the booking forms, location search, fare calculation, and WhatsApp actions.

Use TypeScript and responsive, accessible components. Keep the routing/geocoding API key in a server-side secret and call the provider through a server function. Never expose the key in browser code.

Provide a unique page title, meta description, canonical URL, Open Graph image and tags, accurate LocalBusiness/TaxiService structured data, sitemap.xml, and robots.txt. Use my final custom domain as the primary domain once I provide it.

Before launch, verify that the published page’s initial HTML contains the main content and metadata. Run Lovable’s SEO & AI search review, fix its relevant findings, and check mobile performance with Google PageSpeed Insights. After connecting the domain, set up Google Search Console and submit the sitemap.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cheerful-car-finder.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e23855b3-cc11-4cd3-bbe4-6f81703eb37d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

See [SEO.md](SEO.md) for the nationwide SEO implementation, deployment checks and remaining Search Console / Google Business Profile work.

Location search and driving distances use Google Places API (New) and Routes API through server functions. Enable both APIs and billing in the Google Cloud project for your key.

For local development, set `GOOGLE_MAPS_API_KEY` in `.env.local` (ignored by Git). For deployment, set the same name in your hosting provider's server secrets. Never prefix it with `VITE_` or put it in `src/config/site.ts`. The local environment file is not deployed with the repository.

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
