import { useEffect, useState } from "react";
import { REVIEWS } from "@/config/site";

export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);
  const r = REVIEWS[i]!;
  return (
    <div className="mx-auto max-w-2xl text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <figure key={i} aria-live="polite" className="fade-in min-h-32 rounded-2xl border bg-card p-6 shadow-sm">
        {r.sample && <span className="mb-3 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Sample review — placeholder</span>}
        <blockquote className="text-lg">“{r.text}”</blockquote>
        <figcaption className="mt-3 text-sm font-semibold text-muted-foreground">— {r.name}</figcaption>
      </figure>
      <div className="mt-4 flex justify-center gap-2">
        {REVIEWS.map((x, n) => (
          <button key={n} type="button" aria-label={`Show review ${n + 1}`} aria-current={n === i} onClick={() => setI(n)} className={`h-2.5 rounded-full transition-all ${n === i ? "w-6 bg-gold" : "w-2.5 bg-border"}`} />
        ))}
      </div>
    </div>
  );
}
