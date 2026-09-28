// Central, easy-to-edit business configuration.
import wagonr from "@/assets/wagonr.jpg";
import prius from "@/assets/prius.jpg";
import minivan from "@/assets/minivan.jpg";
import kdh from "@/assets/kdh.jpg";
import highroof from "@/assets/highroof.jpg";

export const SITE = {
  name: "Taxi Tissamaharama",
  // Set to your final custom domain (e.g. "https://www.example.com") once available.
  // Leave empty to use the current request origin.
  url: "",
  title: "Taxi Tissamaharama | Private Taxi & Tours Across Sri Lanka",
  description:
    "Book a private taxi anywhere in Sri Lanka. Airport transfers, hotel pickups, day tours and multi-day trips with experienced local drivers, based in Tissamaharama.",
  whatsapp: "94716520590",
  phoneDisplay: "+94 71 652 0590",
  phoneE164: "+94716520590",
  location: "Tissamaharama, Sri Lanka",
  experienceYears: 9,
};

export type Vehicle = { id: string; name: string; rate: number; image: string; alt: string };

export const VEHICLES: Vehicle[] = [
  { id: "wagonr", name: "Wagon R", rate: 130, image: wagonr, alt: "White Wagon R compact car on a palm-lined road in Sri Lanka" },
  { id: "prius", name: "Prius", rate: 150, image: prius, alt: "Silver Prius parked at a tropical hotel entrance in Sri Lanka" },
  { id: "minivan", name: "Mini Van", rate: 140, image: minivan, alt: "White mini van beside paddy fields in southern Sri Lanka" },
  { id: "kdh", name: "KDH Van", rate: 200, image: kdh, alt: "White KDH van on a coastal road in southern Sri Lanka" },
  { id: "highroof", name: "High Roof Van", rate: 250, image: highroof, alt: "White high roof van near a safari park entrance in Sri Lanka" },
];

export const NAV = [
  { href: "#book-taxi", label: "Book a Taxi" },
  { href: "#custom-ride", label: "Custom Ride" },
  { href: "#book-tour", label: "Book a Tour" },
  { href: "#services", label: "Services" },
  { href: "#vehicles", label: "Vehicles" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

// SAMPLE placeholders — replace with verified guest reviews. Set `sample: false` for real ones.
export const REVIEWS = [
  { name: "Sample Guest A", text: "Placeholder review: smooth airport pickup and a friendly driver.", sample: true },
  { name: "Sample Guest B", text: "Placeholder review: easy WhatsApp booking for our Yala safari day.", sample: true },
  { name: "Sample Guest C", text: "Placeholder review: comfortable van for our family tour to Ella.", sample: true },
];

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const lkr = (n: number) => `LKR ${Math.round(n).toLocaleString("en-US")}`;
