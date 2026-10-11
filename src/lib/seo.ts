import { SEO_SERVICES, SITE } from "@/config/site";

/** One absolute homepage URL for metadata, schema, robots and sitemap. */
export function getCanonicalUrl(requestOrigin: string): string {
  return new URL("/", SITE.url || requestOrigin).href;
}

export function getStructuredData(url: string) {
  const businessId = `${url}#business`;
  const websiteId = `${url}#website`;
  const pageId = `${url}#webpage`;
  const areaServed = { "@type": "Country", name: SITE.serviceCountry };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: SITE.name,
        description: SITE.description,
        url,
        image: new URL("og-image.jpg", url).href,
        logo: new URL(SITE.logo, url).href,
        telephone: SITE.phoneE164,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.addressLocality,
          addressCountry: SITE.countryCode,
        },
        areaServed,
        founder: {
          "@type": "Person",
          name: SITE.founder.name,
          jobTitle: SITE.founder.role,
          image: new URL(SITE.founder.image, url).href,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url,
        name: SITE.name,
        inLanguage: "en",
        publisher: { "@id": businessId },
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url,
        name: SITE.title,
        description: SITE.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": businessId },
        mainEntity: SEO_SERVICES.map((service) => ({ "@id": `${url}#${service.id}` })),
      },
      ...SEO_SERVICES.map((service) => ({
        "@type": service.type,
        "@id": `${url}#${service.id}`,
        name: service.name,
        url,
        provider: { "@id": businessId },
        areaServed,
      })),
    ],
  };
}

export function serializeStructuredData(data: unknown): string {
  // Keep business copy from terminating the JSON-LD script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function getSitemap(url: string): string {
  const escaped = url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${escaped}</loc></url>
</urlset>`;
}

export function getRobots(url: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", url).href}\n`;
}
