import { createFileRoute } from "@tanstack/react-router";
import { getCanonicalUrl, getSitemap } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const xml = getSitemap(getCanonicalUrl(request.url));
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
