import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ORS = "https://api.openrouteservice.org";

export type Place = { label: string; lat: number; lng: number };

export const searchPlaces = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ q: z.string().trim().min(2).max(120) }).parse(d))
  .handler(async ({ data }): Promise<{ configured: boolean; places: Place[]; error?: string }> => {
    const key = process.env["ORS_API_KEY"];
    if (!key) return { configured: false, places: [] };
    try {
      const url = `${ORS}/geocode/autocomplete?api_key=${encodeURIComponent(key)}&text=${encodeURIComponent(
        data.q,
      )}&boundary.country=LK&size=6`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error("ORS geocode", res.status, await res.text());
        return { configured: true, places: [], error: "Location search is unavailable right now." };
      }
      const json = (await res.json()) as {
        features?: { geometry: { coordinates: [number, number] }; properties: { label: string } }[];
      };
      return {
        configured: true,
        places: (json.features ?? []).map((f) => ({
          label: f.properties.label,
          lng: f.geometry.coordinates[0],
          lat: f.geometry.coordinates[1],
        })),
      };
    } catch (e) {
      console.error(e);
      return { configured: true, places: [], error: "Location search is unavailable right now." };
    }
  });

const pt = z.object({ lat: z.number().min(5).max(10.5), lng: z.number().min(79).max(82.5) });

export const getRoadDistance = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ from: pt, to: pt }).parse(d))
  .handler(async ({ data }): Promise<{ km: number | null; error?: string }> => {
    const key = process.env["ORS_API_KEY"];
    if (!key) return { km: null, error: "not_configured" };
    try {
      const res = await fetch(`${ORS}/v2/directions/driving-car`, {
        method: "POST",
        headers: { Authorization: key, "Content-Type": "application/json" },
        body: JSON.stringify({
          coordinates: [
            [data.from.lng, data.from.lat],
            [data.to.lng, data.to.lat],
          ],
        }),
      });
      if (!res.ok) {
        console.error("ORS directions", res.status, await res.text());
        return { km: null, error: "We couldn't calculate this route." };
      }
      const json = (await res.json()) as { routes?: { summary: { distance: number } }[] };
      const m = json.routes?.[0]?.summary?.distance;
      if (m == null) return { km: null, error: "We couldn't calculate this route." };
      return { km: Math.round((m / 1000) * 10) / 10 };
    } catch (e) {
      console.error(e);
      return { km: null, error: "We couldn't calculate this route." };
    }
  });

export const getRequestOrigin = createServerFn({ method: "GET" }).handler(async () => {
  const { getRequest } = await import("@tanstack/react-start/server");
  const req = getRequest();
  const url = new URL(req.url);
  const sandboxHost = url.hostname === "localhost" ? req.headers.get("x-forwarded-host") : null;
  return sandboxHost ? `https://${sandboxHost}` : url.origin;
});
