import { SITE, UI_COPY } from "@/config/site";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" aria-label={`${SITE.name} home`} className={`brand ${inverse ? "brand-inverse" : ""}`}>
      <img src={SITE.logo} alt="" width={64} height={64} className="brand-mark" />
      <span className="min-w-0">
        <span className="block font-display text-sm font-bold tracking-tight sm:text-base">{SITE.name}</span>
        <span className="mt-1 hidden text-[11px] font-medium opacity-65 sm:block">{UI_COPY.tagline}</span>
      </span>
    </a>
  );
}
