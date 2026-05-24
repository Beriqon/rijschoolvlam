import { cache } from "react";

import { mapCmsPagesToSiteConfig } from "@/lib/cms/map-site-settings";
import { getSiteSettingsAndPricing } from "@/lib/cms/queries";
import {
  CONTACT_EMAIL,
  LESSON_PRICE_EUR,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_URL,
} from "@/lib/constants";

export type PricingPackage = {
  name: string;
  price: number;
  hours: number;
  highlight: boolean;
};

export type PricingExtra = {
  title: string;
  description: string;
  priceLabel: string;
};

export type SiteConfig = {
  phoneDisplay: string;
  phoneE164: string;
  whatsappUrl: string;
  contactEmail: string;
  primaryCta: {
    text: string;
    href: string;
  };
  lessonPriceEur: number;
  lessonPriceLabel: string;
  packages: PricingPackage[];
  extras: PricingExtra[];
};

const DEFAULT_PACKAGES: PricingPackage[] = [
  { name: "Pakket 1", price: 1120, hours: 10, highlight: false },
  { name: "Pakket 2", price: 1900, hours: 20, highlight: true },
  { name: "Pakket 3", price: 2650, hours: 30, highlight: false },
  { name: "Pakket 4", price: 3400, hours: 40, highlight: false },
];

const DEFAULT_EXTRAS: PricingExtra[] = [
  {
    title: "Bromfietslessen",
    description:
      "Het oefenen op gebied van praktijk en theorie kost slechts €275,-. Je hebt ook geweldige examen garantie.",
    priceLabel: "€275,-",
  },
  {
    title: "Opfriscursus",
    description:
      "Heb je moeite met bepaalde onderdelen in het verkeer doordat je lang niet hebt gereden? Kies dan voor onze opfriscursus.",
    priceLabel: "Op aanvraag",
  },
  {
    title: "Losse rijlessen",
    description: `Zit je krap bij kas? Elke rijles kun je bij ons apart afrekenen. Losse rijlessen kost €${LESSON_PRICE_EUR},-.`,
    priceLabel: `€${LESSON_PRICE_EUR},-`,
  },
  {
    title: "Tussentijdse toets",
    description:
      "Voor een tussentijdse toets van het CBR betaal je €300,- incl. de huur van de auto.",
    priceLabel: "€300,-",
  },
  {
    title: "Los rij examen",
    description:
      "Voor een praktijk examen van het CBR betaal je €350,-. De huur van de auto is dan meegerekend.",
    priceLabel: "€350,-",
  },
  {
    title: "Faalangst examen",
    description:
      "Voor een faalangst examen van het CBR betaal je €470,-. De huur van de auto is dan meegerekend.",
    priceLabel: "€470,-",
  },
  {
    title: "Theorie pakket",
    description: "Voor extra uitleg en theorie examen van het CBR betaal je €160,-.",
    priceLabel: "€160,-",
  },
  {
    title: "Examengarantie",
    description:
      "Wil je examengarantie? Neem contact met ons op en vraag naar de voorwaarden.",
    priceLabel: "Op aanvraag",
  },
];

/** Statische backup wanneer het CMS niet bereikbaar is of geen settings teruggeeft. */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  phoneDisplay: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  whatsappUrl: WHATSAPP_URL,
  contactEmail: CONTACT_EMAIL,
  primaryCta: {
    text: "Gratis proefles",
    href: "/contact",
  },
  lessonPriceEur: LESSON_PRICE_EUR,
  lessonPriceLabel: `€${LESSON_PRICE_EUR},-`,
  packages: DEFAULT_PACKAGES,
  extras: DEFAULT_EXTRAS,
};

export async function getSiteConfigWithFallback(): Promise<SiteConfig> {
  try {
    const nodes = await getSiteSettingsAndPricing();
    const mapped = mapCmsPagesToSiteConfig(nodes, DEFAULT_SITE_CONFIG);
    if (mapped) {
      return mapped;
    }
  } catch {
    // CMS onbereikbaar of query mislukt → statische siteconfig
  }

  return DEFAULT_SITE_CONFIG;
}

export const getSiteConfig = cache(getSiteConfigWithFallback);
