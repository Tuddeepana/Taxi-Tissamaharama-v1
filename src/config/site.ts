// Central, easy-to-edit business configuration.
import wagonr from "@/assets/wagonr.jpg";
import prius from "@/assets/prius.jpg";
import minivan from "@/assets/minivan.jpg";
import kdh from "@/assets/kdh.jpg";
import highroof from "@/assets/highroof.jpg";

export const SITE = {
  name: "Taxi Tissamaharama",
  logo: "/logo.png",
  themeColor: "#171717",
  // Current public canonical domain. Update once when a custom domain is connected.
  // An empty value falls back to the request origin for self-hosted development.
  url: "https://cheerful-car-finder.lovable.app",
  title: "Sri Lanka Taxi & Private Tours | Taxi Tissamaharama",
  description:
    "Book private taxis and tours across Sri Lanka. Airport transfers, city-to-city rides, cars and vans with drivers. Request your quote on WhatsApp.",
  whatsapp: "94771263860",
  phoneDisplay: "+94 77 126 3860",
  phoneE164: "+94771263860",
  location: "Tissamaharama, Sri Lanka",
  addressLocality: "Tissamaharama",
  countryCode: "LK",
  serviceCountry: "Sri Lanka",
  experienceYears: 9,
  founder: {
    name: "Suranga Sudusinghe",
    role: "Founder & Lead Chauffeur Guide",
    image: "/founde.jpeg",
    alt: "Suranga Sudusinghe, Founder of Taxi Tissamaharama with over 9 years of private taxi and tour experience in Sri Lanka",
    message:
      "Welcome to Sri Lanka! Since starting Taxi Tissamaharama, my mission has always been simple: treat every traveller like family. Whether picking you up after a long flight at Colombo Airport, navigating a thrilling dawn safari through Yala National Park, or driving across the central highlands to Ella, our dedicated team ensures your ride is safe, flexible, and completely unforgettable. We are always just a WhatsApp message away to help you plan your journey.",
  },
};

export type Vehicle = { id: string; name: string; rate: number; tourDailyRate?: number; image: string; alt: string };

export const VEHICLES: Vehicle[] = [
  { id: "wagonr", name: "Mini Car", rate: 130, tourDailyRate: 17000, image: wagonr, alt: "White mini car on a palm-lined road in Sri Lanka" },
  { id: "prius", name: "Sedan", rate: 150, tourDailyRate: 21000, image: prius, alt: "Silver sedan parked at a tropical hotel entrance in Sri Lanka" },
  { id: "minivan", name: "Mini Van", rate: 140, image: minivan, alt: "White mini van beside paddy fields in southern Sri Lanka" },
  { id: "kdh", name: "KDH Flat Roof", rate: 200, tourDailyRate: 25000, image: kdh, alt: "White KDH van on a coastal road in southern Sri Lanka" },
  { id: "highroof", name: "KDH High Roof", rate: 250, tourDailyRate: 35000, image: highroof, alt: "White high roof van near a safari park entrance in Sri Lanka" },
];

export const TOUR = {
  intro: "Explore Sri Lanka with your own private vehicle and driver. Choose your vehicle to see the daily rate, then share your travel dates and itinerary.",
  rateLabel: "Daily tour rate",
  rateUnit: "per day",
  quoteOnRequest: "Daily rate on request",
  inclusionsTitle: "Travel comfortably — we take care of the details",
  inclusions: "Your daily tour rate includes a private vehicle with a driver, the driver's accommodation and meals, highway tolls, and parking fees. We arrange and cover these essentials, so you can relax and enjoy your journey.",
  confirmation: "Share your itinerary with us, and we'll confirm the total tour price before you book.",
};

export const UI_COPY = {
  tagline: "Taxis & tours across Sri Lanka",
  heroEyebrow: "A local team. An island of possibilities.",
  heroHeading: "Private taxis & tours",
  heroHighlight: "across Sri Lanka.",
  heroDescription: "From your first airport pickup to your last coastal sunset. Travel your way with a private car or van, a local driver, and a journey made for you.",
  heroBenefits: ["Island-wide travel", "Private cars & vans", "Direct WhatsApp booking"],
  bookingEyebrow: "YOUR NEXT JOURNEY",
  bookingTitle: "Let's get you there.",
  bookingDescription: "Choose your ride and send us your plans.",
  servicesEyebrow: "TRAVEL YOUR WAY",
  vehiclesEyebrow: "ROOM FOR EVERY JOURNEY",
  aboutEyebrow: "LOCAL PEOPLE. PERSONAL SERVICE.",
  reviewsEyebrow: "MEMORIES FROM THE ROAD",
  galleryEyebrow: "REAL JOURNEYS. REAL PEOPLE.",
};

// Describes services already presented on the landing page, without adding UI copy.
export const SEO_SERVICES = [
  { id: "taxi-service", type: "TaxiService", name: "Private taxi transfers across Sri Lanka" },
  { id: "airport-transfers", type: "Service", name: "Sri Lanka airport transfers" },
  { id: "private-tours", type: "Service", name: "Private day trips and multi-day Sri Lanka tours with a driver" },
];

export const NAV = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#vehicles", label: "Vehicles" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

// Guest reviews supplied by the business from Google; owner replies omitted.
export type GuestReview = { name: string; text: string; translated?: boolean; excerpt?: boolean };

export const REVIEW_COPY = {
  source: "Google review",
  translated: "Translated by Google",
  excerpt: "Review excerpt",
};

export const REVIEWS: GuestReview[] = [
  {
    "name": "Karine BURIGNAT",
    "text": "Excellent agency, reliable with helpful and always available drivers. We highly recommend them!",
    "translated": true
  },
  {
    "name": "Mahima Salian",
    "text": "Very friendly and kind! Would definitely choose him again."
  },
  {
    "name": "Lydia",
    "text": "Fantastic and reliable taxi service in Sri Lanka. We did several legs of our ‘tour’ of the island and Suranga was lovely. Great prices, will help to sort other cabs if he is not available and easy to arrange all via Whatssap. Thanks once again!"
  },
  {
    "name": "Jonas Dutronc",
    "text": "Simple and efficient, I booked online the day before for the following day. The website is very well designed; it redirected me directly to WhatsApp with an automatically generated message. Achintha is a fantastic driver; he was great, I highly recommend him.",
    "translated": true
  },
  {
    "name": "Priyatham Varma",
    "text": "Excellent, marvellous, super helpful and friendly person"
  },
  {
    "name": "Teresanna Gentile",
    "text": "Good experience!\nOn time and with a good guide."
  },
  {
    "name": "Cale Geffre",
    "text": "Suranga and Rajun gave us a variety of rides around Sri Lanka with great service, communication, and competitive prices compared to other drivers we spoke with"
  },
  {
    "name": "Anh Luu",
    "text": "highly recommend his service. I had a fantastic Yala Safari tour with him. I saw two leopards, wow. They were very attentive and the price was great; they even prepared a Sri Lankan meal, everything was excellent."
  },
  {
    "name": "Nicola Hilary Day",
    "text": "Suranga was an excellent taxi driver. Very safe and reliable and always picking us up on time. We would highly recommend him."
  },
  {
    "name": "David Eason",
    "text": "Highly recommend - we took transfers from Yala to Hiriketiya and Hiriketiya to the airport. The drivers were on time/ early and very friendly 👍"
  },
  {
    "name": "ammad bhatti",
    "text": "Great driver and nice car. Professional and punctual on time with very reasonable rates ! Must try as he is really good"
  },
  {
    "name": "Gregory Nichols",
    "text": "We used Suranga for multiple stages of our family holiday in Sri Lanka for journeys taking up to 3 hours a time (2 adults 1 child aged 11). He was always very accomodating, on time for every pickup and made the long journeys as comfortable as possible. Easy to pay on cash or card and reasonable prices. Would recommend."
  },
  {
    "name": "Dinesh Sanjeewa",
    "text": "🚙❤️"
  },
  {
    "name": "Ervin Farrugia",
    "text": "Suranga is an amazing driver. Throughout our stay in Sri Lanka he suggested very interesting places while also took us to places of our choice. He is very knowledgeable about all areas of the country and he is…",
    "excerpt": true
  },
  {
    "name": "Rossana Sciberras",
    "text": "Suranga is very friendly and patient. He adheres to our choices but also suggests very nice and interesting places. He is always on time and respects our privacy. He is also a good photographer. When visiting Sri Lanka we highly recommand his services."
  },
  {
    "name": "Shaun Hunter",
    "text": "Very good taxi, we went from Tissa to Ella and the driver was very friendly"
  },
  {
    "name": "TAXI tissamaharama with sumudu",
    "text": "Good ride with sumudu"
  },
  {
    "name": "Max Bezpalov",
    "text": "Suranga is really very nice man who helped us a lot. He organize a safari tour for us for a good price) The leopard hunt was very exciting. Pick us from airport and to Welligama. Tell us some interesting facts about his country. Big thanks for all and highly recommended!!"
  },
  {
    "name": "Tobias Zuser",
    "text": "Great communicator, and very reliable. Answers any questions promptly and makes sure that all your needs are met. Definitely my go to choice for my Sri Lanka trip."
  }
];

export type GalleryImage = { src: string; alt: string; caption: string };

export const GALLERY: GalleryImage[] = [
  {
    src: '/g1 (1).jpeg',
    alt: 'Taxi Tissamaharama private car on a scenic Sri Lanka road surrounded by lush greenery',
    caption: "Private transfers through Sri Lanka's beautiful landscapes",
  },
  {
    src: '/g1 (2).jpeg',
    alt: 'Happy tourists with Taxi Tissamaharama driver during a private tour in southern Sri Lanka',
    caption: 'Friendly, experienced local drivers',
  },
  {
    src: '/g1 (3).jpeg',
    alt: 'Taxi Tissamaharama vehicle at Yala National Park entrance for a safari day trip',
    caption: 'Yala safari day trips from Tissamaharama',
  },
  {
    src: '/g1 (4).jpeg',
    alt: 'Private taxi on coastal road near Mirissa beach, southern Sri Lanka',
    caption: 'Coastal transfers from Mirissa to Galle and beyond',
  },
  {
    src: '/g1 (5).jpeg',
    alt: 'Taxi Tissamaharama KDH van ready for a group airport transfer in Sri Lanka',
    caption: 'Spacious vans for family and group travel',
  },
  {
    src: '/g1 (6).jpeg',
    alt: 'Guests loading luggage into a Taxi Tissamaharama vehicle for a hotel transfer in Sri Lanka',
    caption: 'Hotel-to-hotel transfers anywhere on the island',
  },
  {
    src: '/g1 (7).jpeg',
    alt: 'Scenic mountain road in Sri Lanka hill country with a Taxi Tissamaharama private car',
    caption: 'Multi-day tours through Ella and the hill country',
  },
  {
    src: '/g1 (8).jpeg',
    alt: 'Taxi Tissamaharama driver smiling with satisfied travellers after a Sri Lanka tour',
    caption: 'Memories made with every journey',
  },
];

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const lkr = (n: number) => `LKR ${Math.round(n).toLocaleString("en-US")}`;
