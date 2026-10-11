import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/config/site";

/**
 * Gallery component — displays real-journey photos from /public.
 * SEO: descriptive alt text on every <img>; captions visible in the lightbox.
 * UX: Masonry-style grid, click to open a full-screen lightbox, keyboard nav.
 */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const currentImage = open !== null ? GALLERY[open] : null;

  const prev = () =>
    setOpen((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length));
  const next = () =>
    setOpen((i) => (i === null ? null : (i + 1) % GALLERY.length));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setOpen(null);
  };

  return (
    <>
      {/* ── Grid ── */}
      <ul
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        aria-label="Photo gallery of Taxi Tissamaharama journeys in Sri Lanka"
      >
        {GALLERY.map((img, idx) => (
          <li key={img.src}>
            <button
              type="button"
              id={`gallery-thumb-${idx}`}
              className="gallery-thumb group relative overflow-hidden rounded-2xl"
              onClick={() => setOpen(idx)}
              aria-label={`View photo: ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Caption overlay on hover */}
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-6 text-xs font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
                {img.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* ── Lightbox ── */}
      {open !== null && currentImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          onKeyDown={handleKey}
          tabIndex={-1}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        >
          {/* Inner — stop propagation so clicks on image/controls don't close */}
          <div
            className="relative mx-4 flex max-h-[90dvh] max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              aria-label="Close photo"
              className="absolute -right-3 -top-3 z-10 grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/40"
              onClick={() => setOpen(null)}
            >
              <X className="size-5" aria-hidden />
            </button>

            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[80dvh] w-full rounded-2xl object-contain"
              width={1200}
              height={900}
            />

            {/* Caption */}
            <p className="mt-3 text-center text-sm font-medium text-white/80">
              {currentImage.caption}
            </p>

            {/* Prev / Next */}
            <button
              type="button"
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/40"
              onClick={prev}
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/40"
              onClick={next}
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to photo ${i + 1}`}
                  onClick={() => setOpen(i)}
                  className={`size-2 rounded-full transition-all ${i === open ? "w-5 bg-gold" : "bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
