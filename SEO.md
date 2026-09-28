# Nationwide SEO handover

## Scope

Taxi Tissamaharama is the business name and operating base. The business provides private taxis, airport transfers, day trips and multi-day tours across Sri Lanka. Nationwide service is the primary positioning; the base is not the limit of service.

The SEO implementation changed metadata and crawler endpoints only. A subsequent owner-authorized branding refresh uses the supplied `public/logo.png` for the header, footer, favicon, Apple touch icon and business schema, and updates the visible theme and hero to emphasize nationwide service. No new customer-facing pages are added.

## Implemented

- Title: `Sri Lanka Taxi & Private Tours | Taxi Tissamaharama`.
- Description: `Book private taxis and tours across Sri Lanka. Airport transfers, city-to-city rides, cars and vans with drivers. Request your quote on WhatsApp.`
- Open Graph and Twitter metadata use the same title, description and canonical domain.
- Explicit indexing and large-image-preview directives on the homepage.
- `SITE.url` pins the canonical to the currently published `https://cheerful-car-finder.lovable.app`. Preview/request hosts no longer become alternate homepage canonicals by default.
- One shared URL builder serves canonical metadata, structured data, sitemap and robots.txt. The helper normalizes the homepage URL and supports the request origin when `SITE.url` is deliberately empty.
- Linked `LocalBusiness`, `WebSite`, `WebPage`, `TaxiService` and tour/airport `Service` entities identify the business and its nationwide services separately. `TaxiService` is a service type, not a business category.
- Removed the business-wide, hardcoded per-kilometre price range because it does not describe daily tour pricing. No invented prices, review scores, full address, opening hours or profile URLs are included.
- `/robots.txt` is now a server route that allows crawling and advertises the canonical sitemap URL.
- `/sitemap.xml` lists the sole indexable homepage, with XML escaping. It does not list booking fragments or invent modification dates.

Business facts and SEO copy remain in `src/config/site.ts`. SEO helpers are in `src/lib/seo.ts`.

## Publishing and account work still required

1. Deploy these changes through the existing project workflow. Local edits do not update the published site automatically unless the connected workflow deploys them.
2. If adopting a custom domain, connect it first, change `SITE.url` once, redirect the old domain where supported, and update the Google Business Profile website link. Recheck canonicals, sitemap and robots.txt on the deployed host. A custom domain supports consistent branding; it is not a guaranteed ranking improvement.
3. Verify the correct website property in Google Search Console. For the Lovable subdomain, use a supported URL-prefix verification method; a custom domain can also use DNS verification. Do not insert an invented verification token.
4. Submit `/sitemap.xml`. Inspect the homepage, test its live rendering, check Google's selected canonical and request indexing after deployment. A successful fetch does not establish indexing or ranking.
5. Validate the deployed JSON-LD in Schema.org's validator and Google's Rich Results Test. Valid service markup does not guarantee a rich result. Only a locality and country are confirmed for the business; do not invent a street address to satisfy a validator.
6. Run mobile PageSpeed Insights on the deployed page and review Search Console's field data when available. No performance score or Core Web Vitals pass is claimed by this implementation.
7. Confirm the exact Google Maps share/profile URL before adding identity links. Business Profile categories, service areas, verification status and performance have not been audited through the owner's account.

## Contact information

The owner confirmed `+94 77 126 3860` for all contact channels. WhatsApp destinations, visible phone labels, click-to-call links and business structured data use this number through `src/config/site.ts`.

The Google Business Profile phone number still needs to be checked against the actual listing.

## Nationwide search strategy

These are targeting hypotheses, not measured search-volume or ranking claims:

| Intent | Topics | Future content, if separately authorized |
| --- | --- | --- |
| Private transport | Sri Lanka private taxi, Sri Lanka taxi booking, intercity transfers | Existing homepage and a substantive transfer service page |
| Airport pickup | Colombo Airport transfers to actual destinations served; Mattala airport transfers | Airport service details, waiting policy, luggage and confirmed inclusions |
| Private tours | Sri Lanka private tours with driver, Sri Lanka multi-day tours | Tour service information, sample itineraries and booking process |
| Daily hire | Sri Lanka car or van with driver, private driver daily rates | Confirmed vehicle capacities, daily rates and exclusions |
| Point-to-point travel | Routes the business regularly operates, chosen using booking records and Search Console | Useful individual route pages with original journey details |

The current project intentionally has one landing page. Route pages, additional visible FAQs, rewritten headings and static tour-price content are future frontend/content work, not part of this implementation. Do not create near-identical pages for every city or fictitious local offices.

Tour prices and the full set of reviews are interactive content. Metadata cannot substitute for useful visible information, and search engines should not be assumed to click booking tabs or wait through an entire carousel. Future content work should expose important service details in crawlable page content.

## Google Business Profile and ongoing work

- Keep the genuine business name. Nationwide service does not justify adding marketing keywords to it.
- Choose accurate categories and service areas for the real operation. Follow Google's service-area rules; do not claim staffed branches where none exist.
- Use real vehicle/driver photographs and accurate service descriptions. Request permission for identifiable guest photographs.
- Ask genuine customers for honest reviews without incentives and reply professionally. Website testimonials do not qualify the business for self-serving organic review-star snippets.
- Develop genuine hotel and travel-industry referrals and relevant links. Avoid bulk paid-link packages.
- Track search impressions/clicks, qualified enquiries, confirmed bookings and revenue separately. A WhatsApp click is not a confirmed booking.
- Analytics events, Search Console verification and profile changes require real account/configuration details. No tracking provider or account was invented or installed.

Suggested sequence: validate deployment and indexing first; establish a baseline and complete profile information next; then use actual search and booking data to prioritize future content. Evaluate trends over weeks and months rather than promising daily bookings or a particular position.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link)
- [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Schema.org TaxiService](https://schema.org/TaxiService)
- [Google robots.txt guidance](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)
- [Search Console URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en)
- [Google local-ranking guidance](https://support.google.com/business/answer/7091?hl=en)
- [Google Business Profile guidelines](https://support.google.com/business/answer/3038177?hl=en)
- [Google review guidance](https://support.google.com/business/answer/3474122?hl=en)
- [Self-serving review restrictions](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful)
