import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle, Phone, MapPin, Plane, Sun, Map, Hotel, Car, Languages, Clock, Headset } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { BookingPanel } from "@/components/BookingPanel";
import { Reviews } from "@/components/Reviews";
import { NAV, SITE, VEHICLES, lkr, waLink } from "@/config/site";
import { getRequestOrigin } from "@/lib/routing.functions";

export const Route = createFileRoute("/")({
  loader: async () => ({ origin: SITE.url || (await getRequestOrigin()) }),
  head: ({ loaderData }) => {
    const base = loaderData?.origin ?? "";
    const url = `${base}/`;
    const img = `${base}/og-image.jpg`;
    return {
      meta: [
        { title: SITE.title },
        { name: "description", content: SITE.description },
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
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "TaxiService"],
            name: SITE.name,
            description: SITE.description,
            url,
            image: img,
            telephone: SITE.phoneE164,
            address: { "@type": "PostalAddress", addressLocality: "Tissamaharama", addressCountry: "LK" },
            areaServed: { "@type": "Country", name: "Sri Lanka" },
            priceRange: "LKR 130–250 per km",
          }),
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
  return (
    <header className="sticky top-0 z-40 border-b border-primary-foreground/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">Taxi <span className="text-gold">Tissamaharama</span></a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-5 text-sm">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="opacity-85 hover:opacity-100 hover:text-gold">{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold hidden !py-2 text-sm sm:inline-flex"><MessageCircle className="size-4" aria-hidden /> WhatsApp Us</a>
          <button type="button" className="rounded-md p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-primary-foreground/10 lg:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {NAV.map((n) => <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 hover:bg-primary-foreground/10">{n.label}</a></li>)}
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
          <img src={hero} alt="Private taxi driving through tea plantations near Ella, Sri Lanka, at sunset" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-primary" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-20">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium"><MapPin className="size-3.5 text-gold" aria-hidden /> Based in Tissamaharama · {SITE.experienceYears} years of experience</p>
              <h1 className="font-display text-3xl font-bold leading-tight sm:text-5xl">Book a Private Taxi Anywhere in Sri Lanka</h1>
              <p className="mt-4 max-w-xl text-base opacity-90 sm:text-lg">Airport transfers, hotel pickups, day tours and private journeys with experienced local drivers. Based in Tissamaharama, serving travellers across Sri Lanka.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#book-taxi" className="btn-gold">Book Your Ride</a>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle className="size-4" aria-hidden /> Chat on WhatsApp</a>
              </div>
            </div>
            <BookingPanel />
          </div>
        </section>

        <section id="services" className="section">
          <div className="container-x">
            <h2 className="h2">Our Services</h2>
            <p className="lead">Private transport for every part of your Sri Lanka trip — wherever on the island you're heading.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <a key={s.title} href={s.href} className="card-link group">
                  <s.icon className="size-8 text-gold" aria-hidden />
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">Book now →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="vehicles" className="section bg-muted/50">
          <div className="container-x">
            <h2 className="h2">Our Vehicles</h2>
            <p className="lead">Choose the vehicle that suits your journey. Rates are per kilometre of road distance.</p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {VEHICLES.map((v) => (
                <li key={v.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                  <img src={v.image} alt={v.alt} width={976} height={688} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold">{v.name}</h3>
                    <p className="mt-1 text-sm"><span className="font-bold text-primary">{lkr(v.rate)}</span> <span className="text-muted-foreground">per km</span></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container-x grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="h2">About Taxi Tissamaharama</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>For {SITE.experienceYears} years, Taxi Tissamaharama has been helping visitors travel around Sri Lanka comfortably and without fuss. We're based in Tissamaharama, in the island's deep south, and we arrange private airport transfers, hotel transfers, local journeys and tours across the whole country.</p>
                <p>We keep things simple: you tell us where you want to go, we reply with clear details, and you travel with a local driver in a private vehicle. No complicated booking platforms — just direct, friendly communication on WhatsApp or by phone.</p>
              </div>
            </div>
            <div>
              <h2 className="h2">Why Choose Us</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {WHY.map((w) => (
                  <div key={w.title} className="rounded-2xl border bg-card p-5">
                    <w.icon className="size-6 text-gold" aria-hidden />
                    <h3 className="mt-3 font-semibold">{w.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="section bg-muted/50">
          <div className="container-x">
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
        <div className="container-x flex flex-col gap-4 pl-20 text-sm sm:pl-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display font-bold">Taxi <span className="text-gold">Tissamaharama</span></p>
          <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-4 gap-y-2 opacity-85">{NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>)}</ul></nav>
          <p className="opacity-70">© {SITE.name}. All rights reserved.</p>
        </div>
      </footer>

      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Taxi Tissamaharama on WhatsApp" className="fixed bottom-4 left-4 z-40 grid size-12 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lg transition-transform hover:scale-105">
        <MessageCircle className="size-6" aria-hidden />
      </a>
    </>
  );
}
