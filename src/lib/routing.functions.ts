import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Place = { label: string; lat: number; lng: number };

export const searchPlaces = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ q: z.string().trim().min(2).max(120) }).parse(d))
  .handler(async ({ data }): Promise<{ configured: boolean; places: Place[]; error?: string }> => {
    const key = process.env["GOOGLE_MAPS_API_KEY"];
    if (!key) return { configured: false, places: [] };
    try {
      const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location",
        },
        body: JSON.stringify({
          textQuery: data.q,
          regionCode: "LK",
          languageCode: "en",
          pageSize: 6,
          locationRestriction: { rectangle: {
            low: { latitude: 5, longitude: 79 },
            high: { latitude: 10.5, longitude: 82.5 },
          } },
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) {
        console.error("Google Places search failed", res.status);
        return { configured: true, places: [], error: "Location search is unavailable right now." };
      }
      const json = (await res.json()) as {
        places?: { displayName?: { text?: string }; formattedAddress?: string; location?: { latitude: number; longitude: number } }[];
      };
      return {
        configured: true,
        places: (json.places ?? []).flatMap((p) => {
          if (!p.location || !pt.safeParse({ lat: p.location.latitude, lng: p.location.longitude }).success) return [];
          const label = [p.displayName?.text, p.formattedAddress].filter(Boolean).join(", ");
          return label ? [{ label, lng: p.location.longitude, lat: p.location.latitude }] : [];
        }),
      };
    } catch {
      console.error("Google Places search request failed");
      return { configured: true, places: [], error: "Location search is unavailable right now." };
    }
  });

const pt = z.object({ lat: z.number().min(5).max(10.5), lng: z.number().min(79).max(82.5) });

export const getRoadDistance = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ from: pt, to: pt }).parse(d))
  .handler(async ({ data }): Promise<{ km: number | null; error?: string }> => {
    const key = process.env["GOOGLE_MAPS_API_KEY"];
    if (!key) return { km: null, error: "not_configured" };
    try {
      const res = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "routes.distanceMeters",
        },
        body: JSON.stringify({
          origin: { location: { latLng: { latitude: data.from.lat, longitude: data.from.lng } } },
          destination: { location: { latLng: { latitude: data.to.lat, longitude: data.to.lng } } },
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_UNAWARE",
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) {
        console.error("Google Routes calculation failed", res.status);
        return { km: null, error: "We couldn't calculate this route." };
      }
      const json = (await res.json()) as { routes?: { distanceMeters: number }[] };
      const m = json.routes?.[0]?.distanceMeters;
      if (m == null || !Number.isFinite(m) || m < 0) return { km: null, error: "We couldn't calculate this route." };
      return { km: Math.round((m / 1000) * 10) / 10 };
    } catch {
      console.error("Google Routes request failed");
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
