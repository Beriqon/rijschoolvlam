export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rijschoolvlam.nl";

export const SITE_NAME = "Rijschool Vlam";

/** Logo in `public/logo/` */
export const SITE_LOGO = {
  src: "/logo/rijschoolvlamlogo.png",
  width: 360,
  height: 100,
} as const;

export const SITE_TAGLINE =
  "Rijschool Utrecht — snel en betaalbaar je rijbewijs";

export const PHONE_DISPLAY = "06 13568060";
export const PHONE_E164 = "+31613568060";

/** WhatsApp chat link (digits only, no +) */
export const WHATSAPP_URL = `https://wa.me/${PHONE_E164.replace(/\D/g, "")}`;

export const FACEBOOK_URL = "https://www.facebook.com/www.rijschoolvlam.nl";

export const INSTAGRAM_URL = "https://www.instagram.com/rijschool_vlam_utrecht/";

export const CONTACT_EMAIL = "info@rijschoolvlam.nl";

/** Handelsregisternummer Kamer van Koophandel */
export const KVK_NUMBER = "516685050000";

export const ADDRESS = {
  street: "Willem van Noortstraat 46",
  postalCode: "3514 GG",
  city: "Utrecht",
  country: "Nederland",
} as const;

/** Zelfde uren op contactpagina en in de footer. */
export const OPENING_HOURS = [
  { day: "Maandag", hours: "10:00 – 19:00" },
  { day: "Dinsdag", hours: "10:00 – 19:00" },
  { day: "Woensdag", hours: "10:00 – 19:00" },
  { day: "Donderdag", hours: "10:00 – 19:00" },
  { day: "Vrijdag", hours: "10:00 – 19:00" },
  { day: "Zaterdag", hours: "Gesloten" },
  { day: "Zondag", hours: "Gesloten" },
] as const;

export const CBR_UTRECHT = {
  name: "CBR Utrecht",
  street: "Mississippidreef 151",
  note: "Praktijkexamen Utrecht",
} as const;

/** Hoofdmenu (geen Home — die bereik je via het logo) */
export const NAV_LINKS = [
  { href: "/tarieven", label: "Tarieven" },
  { href: "/spoedcursus", label: "Spoedcursus" },
  { href: "/theorieles", label: "Theorieles" },
  { href: "/bijzondere-verrichtingen", label: "Verrichtingen" },
  { href: "/veelgestelde-vragen", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/** Footer + overzicht van alle nuttige routes */
export const FOOTER_NAV_LINKS = [
  { href: "/", label: "Home" },
  ...NAV_LINKS,
] as const;

export const UTRECHT_AREAS = [
  "Overvecht",
  "Tuindorp",
  "Vogelenbuurt",
  "Utrecht Centrum",
  "Wittevrouwen",
  "Leidsche Rijn",
  "Kanaleneiland",
  "Lombok",
] as const;

export const LESSON_PRICE_EUR = 79;
export const CANCELLATION_HOURS = 48;
