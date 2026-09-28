import { useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getRoadDistance, type Place } from "@/lib/routing.functions";
import { LocationInput } from "./LocationInput";
import { SITE, VEHICLES, lkr, waLink } from "@/config/site";

type Tab = "taxi" | "custom" | "tour";
const TABS: { id: Tab; hash: string; label: string }[] = [
  { id: "taxi", hash: "#book-taxi", label: "Book a Taxi" },
  { id: "custom", hash: "#custom-ride", label: "Custom Ride" },
  { id: "tour", hash: "#book-tour", label: "Book a Tour" },
];

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function openWhatsApp(text: string) {
  window.open(waLink(text), "_blank", "noopener,noreferrer");
}

const Field = ({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className="field-label">
      {label} {required && <span aria-hidden className="text-gold">*</span>}
    </label>
    {children}
    {error && <p id={`${id}-err`} className="field-error">{error}</p>}
  </div>
);

const VehicleSelect = ({ id, value, onChange, error }: { id: string; value: string; onChange: (v: string) => void; error?: string }) => (
  <select id={id} className="field" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error}>
    <option value="">Select a vehicle</option>
    {VEHICLES.map((v) => (
      <option key={v.id} value={v.id}>{v.name} — {lkr(v.rate)}/km</option>
    ))}
  </select>
);

const Confirm = () => (
  <p className="text-sm text-muted-foreground">Your booking is confirmed only after our team replies.</p>
);

export function BookingPanel() {
  const [tab, setTab] = useState<Tab>("taxi");
  const [min, setMin] = useState<string>("");

  useEffect(() => {
    setMin(todayStr());
    const sync = () => {
      const t = TABS.find((x) => x.hash === window.location.hash);
      if (t) {
        setTab(t.id);
        document.getElementById("booking")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + TABS.length) % TABS.length;
    else return;
    e.preventDefault();
    setTab(TABS[n].id);
    document.getElementById(`tab-${TABS[n].id}`)?.focus();
  };

  return (
    <div id="booking" className="scroll-mt-24 rounded-2xl border bg-card p-4 text-card-foreground shadow-xl sm:p-6">
      <span id="book-taxi" className="sr-only" />
      <span id="custom-ride" className="sr-only" />
      <span id="book-tour" className="sr-only" />
      <div role="tablist" aria-label="Booking options" className="mb-5 grid grid-cols-3 gap-1 rounded-xl bg-muted p-1">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`rounded-lg px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
              tab === t.id ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === "taxi" && <TaxiForm min={min} />}
        {tab === "custom" && <CustomForm min={min} />}
        {tab === "tour" && <TourForm min={min} />}
      </div>
    </div>
  );
}

type Errs = Record<string, string>;

function TaxiForm({ min }: { min: string }) {
  const route = useServerFn(getRoadDistance);
  const [f, setF] = useState({ pickup: "", drop: "", date: "", time: "", type: "Airport pickup", vehicle: "wagonr", name: "", notes: "" });
  const [from, setFrom] = useState<Place | null>(null);
  const [to, setTo] = useState<Place | null>(null);
  const [km, setKm] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "off">("idle");
  const [errs, setErrs] = useState<Errs>({});
  const set = (k: keyof typeof f, v: string) => setF((s) => ({ ...s, [k]: v }));
  const vehicle = VEHICLES.find((v) => v.id === f.vehicle);

  useEffect(() => {
    if (!from || !to) { setKm(null); setStatus("idle"); return; }
    let live = true;
    setStatus("loading");
    route({ data: { from, to } })
      .then((r) => {
        if (!live) return;
        setKm(r.km);
        setStatus(r.km != null ? "idle" : r.error === "not_configured" ? "off" : "error");
      })
      .catch(() => live && (setKm(null), setStatus("error")));
    return () => { live = false; };
  }, [from, to, route]);

  const fare = km != null && vehicle ? km * vehicle.rate : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errs = {};
    if (!f.pickup.trim()) er.pickup = "Please enter a pickup location.";
    if (!f.drop.trim()) er.drop = "Please enter a drop-off location.";
    if (!f.date) er.date = "Please choose a pickup date.";
    else if (f.date < todayStr()) er.date = "Pickup date can't be in the past.";
    if (!f.time) er.time = "Please choose a pickup time.";
    if (!vehicle) er.vehicle = "Please select a vehicle.";
    setErrs(er);
    if (Object.keys(er).length) return;
    const lines = [
      `*Taxi booking request — ${SITE.name}*`,
      `Pickup: ${f.pickup}`,
      `Drop-off: ${f.drop}`,
      `Date: ${f.date}`,
      `Time: ${f.time}`,
      `Pickup type: ${f.type}`,
      `Vehicle: ${vehicle!.name} (${lkr(vehicle!.rate)}/km)`,
      km != null ? `Road distance: ${km} km` : "Road distance: not calculated",
      fare != null ? `Estimated fare: ${lkr(fare)}` : "Estimated fare: please quote",
      f.name && `Guest name: ${f.name}`,
      f.notes && `Notes: ${f.notes}`,
    ].filter(Boolean);
    openWhatsApp(lines.join("\n"));
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <LocationInput label="Pickup location" required value={f.pickup} error={errs.pickup} placeholder="e.g. Bandaranaike Airport" onChange={(t, p) => { set("pickup", t); setFrom(p); }} />
        <LocationInput label="Drop-off location" required value={f.drop} error={errs.drop} placeholder="e.g. Tissamaharama" onChange={(t, p) => { set("drop", t); setTo(p); }} />
        <Field id="t-date" label="Pickup date" required error={errs.date}>
          <input id="t-date" type="date" className="field" min={min} value={f.date} onChange={(e) => set("date", e.target.value)} aria-invalid={!!errs.date} />
        </Field>
        <Field id="t-time" label="Pickup time" required error={errs.time}>
          <input id="t-time" type="time" className="field" value={f.time} onChange={(e) => set("time", e.target.value)} aria-invalid={!!errs.time} />
        </Field>
        <Field id="t-type" label="Pickup type">
          <select id="t-type" className="field" value={f.type} onChange={(e) => set("type", e.target.value)}>
            {["Airport pickup", "Hotel pickup", "City pickup", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="t-name" label="Guest name (optional)">
          <input id="t-name" className="field" value={f.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
      </div>

      <fieldset>
        <legend className="field-label">Vehicle <span aria-hidden className="text-gold">*</span></legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {VEHICLES.map((v) => (
            <label key={v.id} className={`flex cursor-pointer flex-col items-center rounded-xl border p-2 text-center transition-colors focus-within:ring-2 focus-within:ring-ring ${f.vehicle === v.id ? "border-gold bg-gold/10" : "hover:bg-accent"}`}>
              <input type="radio" name="vehicle" value={v.id} checked={f.vehicle === v.id} onChange={() => set("vehicle", v.id)} className="sr-only" />
              <img src={v.image} alt="" width={96} height={68} loading="lazy" className="h-12 w-auto rounded object-cover" />
              <span className="mt-1 text-xs font-semibold">{v.name}</span>
              <span className="text-[11px] text-muted-foreground">{lkr(v.rate)}/km</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="t-notes" label="Notes (optional)">
        <textarea id="t-notes" rows={2} className="field" value={f.notes} onChange={(e) => set("notes", e.target.value)} />
      </Field>

      <div aria-live="polite" className="rounded-xl bg-muted p-4 text-sm">
        {status === "loading" && <p>Calculating road distance…</p>}
        {status === "off" && <p>Instant fare estimates are coming soon. Send your request and we'll quote via WhatsApp.</p>}
        {status === "error" && <p>We couldn't calculate this route. You can still send your request and we'll quote via WhatsApp.</p>}
        {status === "idle" && km == null && <p className="text-muted-foreground">Choose pickup and drop-off from the suggestions to see a road-distance estimate.</p>}
        {status === "idle" && km != null && vehicle && (
          <dl className="grid grid-cols-3 gap-2">
            <div><dt className="text-xs text-muted-foreground">Road distance</dt><dd className="font-semibold">{km} km</dd></div>
            <div><dt className="text-xs text-muted-foreground">Rate</dt><dd className="font-semibold">{lkr(vehicle.rate)}/km</dd></div>
            <div><dt className="text-xs text-muted-foreground">Estimated fare</dt><dd className="font-display text-lg font-bold text-primary">{lkr(fare!)}</dd></div>
          </dl>
        )}
        {km != null && <p className="mt-2 text-xs text-muted-foreground">Estimated fare only — the final fare is confirmed by our team.</p>}
      </div>

      <button type="submit" className="btn-gold w-full">Request This Ride on WhatsApp</button>
      <Confirm />
    </form>
  );
}

function CustomForm({ min }: { min: string }) {
  const [f, setF] = useState({ name: "", pickup: "", dest: "", vehicle: "", desc: "", date: "", time: "" });
  const [errs, setErrs] = useState<Errs>({});
  const set = (k: keyof typeof f, v: string) => setF((s) => ({ ...s, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errs = {};
    if (!f.name.trim()) er.name = "Please enter your name.";
    if (!f.pickup.trim()) er.pickup = "Please enter a pickup location.";
    if (!f.dest.trim()) er.dest = "Please enter a destination.";
    if (!f.vehicle) er.vehicle = "Please select a vehicle.";
    if (!f.desc.trim()) er.desc = "Please describe your requirements.";
    if (f.date && f.date < todayStr()) er.date = "Date can't be in the past.";
    setErrs(er);
    if (Object.keys(er).length) return;
    const v = VEHICLES.find((x) => x.id === f.vehicle)!;
    openWhatsApp([
      `*Custom ride quote request — ${SITE.name}*`,
      `Guest name: ${f.name}`,
      `Pickup: ${f.pickup}`,
      `Destination: ${f.dest}`,
      `Vehicle: ${v.name}`,
      f.date && `Preferred date: ${f.date}`,
      f.time && `Preferred time: ${f.time}`,
      `Requirements: ${f.desc}`,
    ].filter(Boolean).join("\n"));
  };
  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="c-name" label="Guest name" required error={errs.name}><input id="c-name" className="field" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errs.name} /></Field>
        <Field id="c-veh" label="Vehicle type" required error={errs.vehicle}><VehicleSelect id="c-veh" value={f.vehicle} onChange={(v) => set("vehicle", v)} error={errs.vehicle} /></Field>
        <Field id="c-pick" label="Pickup location" required error={errs.pickup}><input id="c-pick" className="field" value={f.pickup} onChange={(e) => set("pickup", e.target.value)} aria-invalid={!!errs.pickup} /></Field>
        <Field id="c-dest" label="Destination" required error={errs.dest}><input id="c-dest" className="field" value={f.dest} onChange={(e) => set("dest", e.target.value)} aria-invalid={!!errs.dest} /></Field>
        <Field id="c-date" label="Preferred date (optional)" error={errs.date}><input id="c-date" type="date" min={min} className="field" value={f.date} onChange={(e) => set("date", e.target.value)} /></Field>
        <Field id="c-time" label="Preferred time (optional)"><input id="c-time" type="time" className="field" value={f.time} onChange={(e) => set("time", e.target.value)} /></Field>
      </div>
      <Field id="c-desc" label="Description / requirements" required error={errs.desc}><textarea id="c-desc" rows={3} className="field" value={f.desc} onChange={(e) => set("desc", e.target.value)} aria-invalid={!!errs.desc} /></Field>
      <button type="submit" className="btn-gold w-full">Request a Custom Quote</button>
      <Confirm />
    </form>
  );
}

function TourForm({ min }: { min: string }) {
  const [f, setF] = useState({ name: "", start: "", end: "", pickup: "", itinerary: "", vehicle: "", travellers: "", extra: "" });
  const [errs, setErrs] = useState<Errs>({});
  const set = (k: keyof typeof f, v: string) => setF((s) => ({ ...s, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errs = {};
    if (!f.name.trim()) er.name = "Please enter your name.";
    if (!f.start) er.start = "Please choose a start date.";
    else if (f.start < todayStr()) er.start = "Start date can't be in the past.";
    if (!f.end) er.end = "Please choose an end date.";
    else if (f.start && f.end < f.start) er.end = "End date can't be before the start date.";
    if (!f.pickup.trim()) er.pickup = "Please enter a pickup location.";
    if (!f.itinerary.trim()) er.itinerary = "Please list destinations or your itinerary.";
    if (!f.vehicle) er.vehicle = "Please select a vehicle.";
    const n = Number(f.travellers);
    if (!f.travellers || !Number.isInteger(n) || n < 1) er.travellers = "Please enter the number of travellers.";
    setErrs(er);
    if (Object.keys(er).length) return;
    const v = VEHICLES.find((x) => x.id === f.vehicle)!;
    openWhatsApp([
      `*Tour planning request — ${SITE.name}*`,
      `Guest name: ${f.name}`,
      `Dates: ${f.start} to ${f.end}`,
      `Pickup: ${f.pickup}`,
      `Travellers: ${f.travellers}`,
      `Vehicle: ${v.name}`,
      `Destinations / itinerary: ${f.itinerary}`,
      f.extra && `Additional requirements: ${f.extra}`,
    ].filter(Boolean).join("\n"));
  };
  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <p className="text-sm text-muted-foreground">Tell us where you'd like to go and our team will reply with a custom tour quote.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="r-name" label="Guest name" required error={errs.name}><input id="r-name" className="field" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errs.name} /></Field>
        <Field id="r-pick" label="Pickup location" required error={errs.pickup}><input id="r-pick" className="field" value={f.pickup} onChange={(e) => set("pickup", e.target.value)} aria-invalid={!!errs.pickup} /></Field>
        <Field id="r-start" label="Start date" required error={errs.start}><input id="r-start" type="date" min={min} className="field" value={f.start} onChange={(e) => set("start", e.target.value)} aria-invalid={!!errs.start} /></Field>
        <Field id="r-end" label="End date" required error={errs.end}><input id="r-end" type="date" min={f.start || min} className="field" value={f.end} onChange={(e) => set("end", e.target.value)} aria-invalid={!!errs.end} /></Field>
        <Field id="r-veh" label="Vehicle type" required error={errs.vehicle}><VehicleSelect id="r-veh" value={f.vehicle} onChange={(v) => set("vehicle", v)} error={errs.vehicle} /></Field>
        <Field id="r-trav" label="Number of travellers" required error={errs.travellers}><input id="r-trav" type="number" min={1} inputMode="numeric" className="field" value={f.travellers} onChange={(e) => set("travellers", e.target.value)} aria-invalid={!!errs.travellers} /></Field>
      </div>
      <Field id="r-itin" label="Destinations / itinerary" required error={errs.itinerary}><textarea id="r-itin" rows={3} className="field" placeholder="e.g. Yala, Ella, Kandy, Galle" value={f.itinerary} onChange={(e) => set("itinerary", e.target.value)} aria-invalid={!!errs.itinerary} /></Field>
      <Field id="r-extra" label="Additional requirements (optional)"><textarea id="r-extra" rows={2} className="field" value={f.extra} onChange={(e) => set("extra", e.target.value)} /></Field>
      <button type="submit" className="btn-gold w-full">Plan My Tour</button>
      <Confirm />
    </form>
  );
}
