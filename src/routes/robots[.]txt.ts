import { createFileRoute } from "@tanstack/react-router";
import { getCanonicalUrl, getRobots } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => new Response(getRobots(getCanonicalUrl(request.url)), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
    },
  },
});
