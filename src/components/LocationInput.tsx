import { useEffect, useId, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { searchPlaces, type Place } from "@/lib/routing.functions";

type Props = {
  label: string;
  value: string;
  onChange: (text: string, place: Place | null) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
};

export function LocationInput({ label, value, onChange, required, error, placeholder }: Props) {
  const id = useId();
  const search = useServerFn(searchPlaces);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const [note, setNote] = useState<string | null>(null);
  const typed = useRef(false);
  const reqId = useRef(0);

  useEffect(() => {
    if (!typed.current || value.trim().length < 2) {
      setItems([]);
      return;
    }
    const my = ++reqId.current;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const r = await search({ data: { q: value } });
        if (my !== reqId.current) return;
        setItems(r.places);
        setNote(!r.configured ? "Live location search isn't active yet — type the place name." : r.error ?? null);
        setOpen(true);
      } catch {
        if (my === reqId.current) setNote("Location search is unavailable — type the place name.");
      } finally {
        if (my === reqId.current) setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [value, search]);

  const pick = (p: Place) => {
    typed.current = false;
    onChange(p.label, p);
    setOpen(false);
    setItems([]);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="field-label">
        {label} {required && <span aria-hidden className="text-gold">*</span>}
      </label>
      <input
        id={id}
        className="field"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={open && items.length > 0}
        aria-controls={`${id}-list`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        onChange={(e) => {
          typed.current = true;
          setActive(-1);
          onChange(e.target.value, null);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onFocus={() => items.length && setOpen(true)}
        onKeyDown={(e) => {
          if (!open || !items.length) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(items[active]); }
          if (e.key === "Escape") setOpen(false);
        }}
      />
      {loading && <span className="absolute right-3 top-9 text-xs text-muted-foreground">Searching…</span>}
      {open && items.length > 0 && (
        <ul id={`${id}-list`} role="listbox" className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-lg border bg-popover shadow-lg">
          {items.map((p, i) => (
            <li
              key={`${p.label}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); pick(p); }}
              className={`cursor-pointer px-3 py-2 text-sm ${i === active ? "bg-accent" : "hover:bg-accent"}`}
            >
              {p.label}
            </li>
          ))}
        </ul>
      )}
      {note && !error && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
    </div>
  );
}
