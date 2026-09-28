import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { REVIEW_COPY, REVIEWS } from "@/config/site";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  const rotating = !paused && !hovered && !focused && !reducedMotion;
  useEffect(() => {
    if (!rotating || REVIEWS.length < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % REVIEWS.length), 8000);
    return () => clearInterval(timer);
  }, [rotating]);

  const review = REVIEWS[index];
  if (!review) return null;

  const move = (direction: number) => {
    setPaused(true);
    setIndex((current) => (current + direction + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Guest reviews"
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div aria-live={rotating ? "off" : "polite"} aria-atomic="true">
        <figure key={index} className="fade-in flex min-h-80 flex-col rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Quote className="size-8 text-gold" aria-hidden="true" />
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{REVIEW_COPY.source}</span>
          </div>
          <blockquote className="flex-1 whitespace-pre-line text-base leading-relaxed sm:text-lg">&ldquo;{review.text}&rdquo;</blockquote>
          <figcaption className="mt-6 border-t pt-4">
            <p className="font-semibold">{review.name}</p>
            {review.translated && <p className="mt-1 text-xs text-muted-foreground">{REVIEW_COPY.translated}</p>}
            {review.excerpt && <p className="mt-1 text-xs text-muted-foreground">{REVIEW_COPY.excerpt}</p>}
          </figcaption>
        </figure>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button type="button" aria-label="Previous review" onClick={() => move(-1)} className="flex size-11 items-center justify-center rounded-full border bg-card transition-colors hover:bg-accent">
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <span className="min-w-20 text-center text-sm tabular-nums text-muted-foreground">{index + 1} / {REVIEWS.length}</span>
        <button type="button" aria-label="Next review" onClick={() => move(1)} className="flex size-11 items-center justify-center rounded-full border bg-card transition-colors hover:bg-accent">
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
        {!reducedMotion && (
          <button type="button" onClick={() => setPaused((current) => !current)} className="inline-flex min-h-11 items-center gap-2 rounded-full border bg-card px-4 text-sm transition-colors hover:bg-accent">
            {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
            {paused ? "Play reviews" : "Pause reviews"}
          </button>
        )}
      </div>
    </div>
  );
}
