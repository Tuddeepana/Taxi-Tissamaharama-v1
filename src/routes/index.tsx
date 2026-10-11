import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle, Phone, MapPin, Plane, Sun, Map, Hotel, Car, Languages, Clock, Headset, ArrowUpRight, Check } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { BookingPanel } from "@/components/BookingPanel";
import { Reviews } from "@/components/Reviews";
import { Brand } from "@/components/Brand";
import { Gallery } from "@/components/Gallery";
import { NAV, SITE, UI_COPY, VEHICLES, waLink } from "@/config/site";
import { getRequestOrigin } from "@/lib/routing.functions";
import { getCanonicalUrl, getStructuredData, serializeStructuredData } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async () => ({ origin: SITE.url || (await getRequestOrigin()) }),
  head: ({ loaderData }) => {
    const url = getCanonicalUrl(loaderData?.origin ?? SITE.url);
    const img = new URL("og-image.jpg", url).href;
    return {
      meta: [
        { title: SITE.title },
        { name: "description", content: SITE.description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: SITE.title },
        { property: "og:description", content: SITE.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SITE.title },
        { name: "twitter:description", content: SITE.description },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: serializeStructuredData(getStructuredData(url)),
        },
      ],
    };
  },
  component: Index,
});

const SERVICES = [
  { icon: Plane, title: "Sri Lanka Airport Transfers", href: "#book-taxi", text: "Arriving at Colombo's Bandaranaike International Airport or Mattala? We'll meet you and drive you straight to your hotel, whether that's in Colombo, the south coast or the hill country." },
  { icon: Sun, title: "Private Day Tours", href: "#custom-ride", text: "Spend a day on your own schedule — a morning safari in Yala, the Galle Fort ramparts, or a scenic drive to Ella — with a driver who knows the roads." },
  { icon: Map, title: "Multi-Day Sri Lanka Tours", href: "#book-tour", text: "Plan a round trip across the island with one driver and vehicle throughout. Share your ideas and we'll help shape a comfortable itinerary." },
  { icon: Hotel, title: "Hotel Transfers", href: "#book-taxi", text: "Move between hotels and towns without the hassle of buses or trains — from Tissamaharama to Mirissa, Kandy, Nuwara Eliya or wherever you're staying next." },
];

const WHY = [
  { icon: Car, title: "Private Cars & Vans", text: "Vehicle options for different journeys, from solo trips to group travel." },
  { icon: Languages, title: "Experienced, English-speaking Drivers", text: "Helpful communication throughout your trip." },
  { icon: Clock, title: "24/7 Service Available", text: "Request transport at any time of day or night." },
  { icon: Headset, title: "Direct Booking Support", text: "Discuss your trip details directly with our team." },
];

function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4">
        <Brand />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-1 text-sm xl:gap-3">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="nav-link">{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold hidden !py-2 text-sm sm:inline-flex"><MessageCircle className="size-4" aria-hidden /> WhatsApp Us</a>
          <button ref={toggle} type="button" className="grid size-11 place-items-center rounded-xl border lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t bg-card lg:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {NAV.map((n) => <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-accent">{n.label}</a></li>)}
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold mt-2 w-full">WhatsApp Us</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-background focus:p-2">Skip to content</a>
      <Header />
      <main id="main">
        <section id="top" className="relative overflow-hidden bg-primary text-primary-foreground">
          <img src={hero} alt="Private taxi driving through tea plantations near Ella, Sri Lanka, at sunset" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:py-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14 lg:py-16">
            <div className="min-w-0 lg:py-10">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-gold">{UI_COPY.heroEyebrow}</p>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium"><MapPin className="size-3.5 text-gold" aria-hidden /> Based in Tissamaharama · {SITE.experienceYears} years of experience</p>
              <h1 className="font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl xl:text-[3.25rem]">{UI_COPY.heroHeading} <span className="block text-gold">{UI_COPY.heroHighlight}</span></h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">{UI_COPY.heroDescription}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#book-taxi" className="btn-gold">Book Your Ride <ArrowUpRight className="size-4" aria-hidden /></a>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle className="size-4" aria-hidden /> Chat on WhatsApp</a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-6">
                {UI_COPY.heroBenefits.map((benefit) => <span key={benefit} className="hero-benefit"><Check className="size-4 text-gold" aria-hidden />{benefit}</span>)}
              </div>
            </div>
            <BookingPanel />
          </div>
        </section>

        <section id="services" className="section">
          <div className="container-x">
            <p className="section-eyebrow">{UI_COPY.servicesEyebrow}</p>
            <h2 className="h2">Our Services</h2>
            <p className="lead">Private transport for every part of your Sri Lanka trip — wherever on the island you're heading.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <a key={s.title} href={s.href} className="card-link group">
                  <span className="service-icon"><s.icon className="size-6" aria-hidden /></span>
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Book now <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="vehicles" className="section bg-muted/50">
          <div className="container-x">
            <p className="section-eyebrow">{UI_COPY.vehiclesEyebrow}</p>
            <h2 className="h2">Our Vehicles</h2>
            <p className="lead">Choose the vehicle that suits your journey.</p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {VEHICLES.map((v) => (
                <li key={v.id} className="vehicle-card">
                  <img src={v.image} alt={v.alt} width={976} height={688} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                  <div className="border-t-2 border-gold p-5">
                    <h3 className="font-display text-lg font-semibold">{v.name}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-eyebrow">{UI_COPY.aboutEyebrow}</p>
              <h2 className="h2">About Taxi Tissamaharama</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>For {SITE.experienceYears} years, Taxi Tissamaharama has been helping visitors travel around Sri Lanka comfortably and without fuss. We're based in Tissamaharama, in the island's deep south, and we arrange private airport transfers, hotel transfers, local journeys, and tours across the whole country.</p>
                <p>We keep things simple: you tell us where you want to go, we reply with clear details, and you travel with a local driver in a private vehicle. No complicated booking platforms — just direct, friendly communication on WhatsApp or by phone.</p>
              </div>

              {/* Founder Spotlight Card */}
              <div className="mt-8 overflow-hidden rounded-3xl border border-gold/30 bg-card p-6 shadow-sm sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative shrink-0">
                    <img
                      src={SITE.founder.image}
                      alt={SITE.founder.alt}
                      width={120}
                      height={120}
                      loading="lazy"
                      decoding="async"
                      className="size-24 rounded-2xl border-2 border-gold object-cover shadow-md sm:size-28"
                    />
                    <span className="absolute -bottom-2 -right-2 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow">
                      Founder
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{SITE.founder.name}</h3>
                    <p className="text-sm font-medium text-gold">{SITE.founder.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Based in Tissamaharama · {SITE.experienceYears}+ Years Serving Global Travelers</p>
                  </div>
                </div>

                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">A Message from Our Founder</p>
                  <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground italic">
                    "{SITE.founder.message}"
                  </blockquote>
                </div>
              </div>
            </div>

            <div>
              <h2 className="h2">Why Choose Us</h2>
              <p className="mt-2 text-sm text-muted-foreground">Reliable service trusted by travelers from all around the world.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {WHY.map((w) => (
                  <div key={w.title} className="rounded-2xl border bg-card p-5 transition duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
                    <span className="inline-flex rounded-xl bg-gold/20 p-3"><w.icon className="size-5 text-primary" aria-hidden /></span>
                    <h3 className="mt-3 font-semibold">{w.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container-x">
            <p className="section-eyebrow text-center">{UI_COPY.galleryEyebrow}</p>
            <h2 className="h2 text-center">Our Journeys in Pictures</h2>
            <p className="lead mx-auto text-center">Real photos from real trips — see what travelling with Taxi Tissamaharama looks like across Sri Lanka.</p>
            <Gallery />
          </div>
        </section>

        <section id="reviews" className="section bg-muted/50">
          <div className="container-x">
            <p className="section-eyebrow text-center">{UI_COPY.reviewsEyebrow}</p>
            <h2 className="h2 text-center">Guest Reviews</h2>
            <p className="lead mx-auto text-center">What travellers say about riding with us.</p>
            <div className="mt-8"><Reviews /></div>
          </div>
        </section>

        <section id="contact" className="section bg-primary text-primary-foreground">
          <div className="container-x text-center">
            <h2 className="h2">Ready to Plan Your Journey?</h2>
            <p className="mx-auto mt-3 max-w-xl opacity-85">Message us on WhatsApp or call any time. We'll reply with the details for your trip.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold"><MessageCircle className="size-4" aria-hidden /> WhatsApp {SITE.phoneDisplay}</a>
              <a href={`tel:${SITE.phoneE164}`} className="btn-outline"><Phone className="size-4" aria-hidden /> Call {SITE.phoneDisplay}</a>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm opacity-85"><MapPin className="size-4 text-gold" aria-hidden /> {SITE.location}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary-foreground/10 bg-primary pb-24 pt-8 text-primary-foreground sm:pb-8">
        <div className="container-x flex flex-col gap-6 text-sm lg:flex-row lg:items-center lg:justify-between">
          <Brand inverse />
          <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-4 gap-y-2 opacity-85">{NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>)}</ul></nav>
          <p className="opacity-70">© {SITE.name}. All rights reserved.</p>
        </div>
      </footer>

      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Taxi Tissamaharama on WhatsApp" className="fixed bottom-4 right-4 z-40 hidden size-12 place-items-center rounded-full border-2 border-white bg-whatsapp text-primary-foreground shadow-lg transition-transform hover:scale-105 lg:grid">
        <MessageCircle className="size-6" aria-hidden />
      </a>
    </>
  );
}
