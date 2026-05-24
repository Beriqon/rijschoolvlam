import type { CmsPageWithSettingsNode, CmsPricingSettings } from "@/lib/cms/types";
import type { PricingExtra, PricingPackage, SiteConfig } from "@/lib/site-config";

type CmsScalar = string | number | null | undefined;

function cmsScalarToString(value: CmsScalar): string | null {
  if (value == null) {
    return null;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function hasFilledCmsValue(value: CmsScalar): boolean {
  if (value == null) {
    return false;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0;
  }
  return value.trim().length > 0;
}

function pickSettingsPage(
  nodes: CmsPageWithSettingsNode[],
): CmsPageWithSettingsNode | null {
  if (!nodes.length) {
    return null;
  }

  return (
    nodes.find(
      (node) =>
        hasFilledCmsValue(node.siteSettings?.phoneNumber) ||
        hasFilledCmsValue(node.pricingSettings?.losseRijlesPrijs),
    ) ?? null
  );
}

function parsePriceNumber(value: CmsScalar, fallback: number): number {
  const raw = cmsScalarToString(value);
  if (!raw) {
    return fallback;
  }
  const digits = raw.replace(/[^\d]/g, "");
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function priceLabel(value: CmsScalar, fallback: string): string {
  const raw = cmsScalarToString(value);
  if (!raw) {
    return fallback;
  }
  if (raw.startsWith("€")) {
    return raw;
  }
  const amount = parsePriceNumber(raw, NaN);
  if (Number.isFinite(amount)) {
    return `€${amount},-`;
  }
  return raw;
}

function phoneFromCms(
  value: CmsScalar,
  fallback: Pick<SiteConfig, "phoneDisplay" | "phoneE164" | "whatsappUrl">,
) {
  const raw = cmsScalarToString(value);
  if (!raw) {
    return fallback;
  }

  const digits = raw.replace(/\D/g, "");
  if (!digits) {
    return fallback;
  }

  let e164: string;
  if (digits.startsWith("31")) {
    e164 = `+${digits}`;
  } else if (digits.startsWith("0")) {
    e164 = `+31${digits.slice(1)}`;
  } else {
    e164 = `+31${digits}`;
  }

  const display = /\s/.test(raw) ? raw : formatDutchMobile(digits);
  const whatsappUrl = `https://wa.me/${e164.replace(/\D/g, "")}`;

  return { phoneDisplay: display, phoneE164: e164, whatsappUrl };
}

function formatDutchMobile(digits: string): string {
  let national = digits;
  if (national.startsWith("31")) {
    national = `0${national.slice(2)}`;
  } else if (!national.startsWith("0") && national.length === 9) {
    national = `0${national}`;
  }

  if (national.length === 10 && national.startsWith("06")) {
    return `${national.slice(0, 2)} ${national.slice(2, 5)} ${national.slice(5, 7)} ${national.slice(7)}`;
  }

  return national;
}

function applyPackagePrices(
  packages: PricingPackage[],
  pricing: CmsPricingSettings,
): PricingPackage[] {
  const cmsPrices = [
    pricing?.pakket1Prijs,
    pricing?.pakket2Prijs,
    pricing?.pakket3Prijs,
    pricing?.pakket4Prijs,
  ];

  return packages.map((pkg, index) => ({
    ...pkg,
    price: parsePriceNumber(cmsPrices[index], pkg.price),
  }));
}

function applyExtraPrices(
  extras: PricingExtra[],
  pricing: CmsPricingSettings,
  lessonPriceLabel: string,
): PricingExtra[] {
  const byTitle: Record<string, CmsScalar> = {
    Bromfietslessen: pricing?.bromfietsPrijs,
    Opfriscursus: pricing?.opfriscursusTekst,
    "Losse rijlessen": pricing?.losseRijlesPrijs,
    "Tussentijdse toets": pricing?.tussentijdseToetsPrijs,
    "Los rij examen": pricing?.praktijkexamenPrijs,
    "Faalangst examen": pricing?.faalangstexamenPrijs,
    "Theorie pakket": pricing?.theoriePakketPrijs,
    Examengarantie: pricing?.examengarantieTekst,
  };

  return extras.map((extra) => {
    const cmsValue = byTitle[extra.title];
    const nextLabel = priceLabel(cmsValue, extra.priceLabel);

    if (extra.title === "Losse rijlessen") {
      return {
        ...extra,
        priceLabel: nextLabel,
        description: `Zit je krap bij kas? Elke rijles kun je bij ons apart afrekenen. Losse rijlessen kost ${lessonPriceLabel}.`,
      };
    }

    return {
      ...extra,
      priceLabel: nextLabel,
    };
  });
}

export function mapCmsPagesToSiteConfig(
  nodes: CmsPageWithSettingsNode[],
  defaults: SiteConfig,
): SiteConfig | null {
  const page = pickSettingsPage(nodes);
  if (!page) {
    return null;
  }

  const base = defaults;
  const site = page.siteSettings;
  const pricing = page.pricingSettings;

  const phone = phoneFromCms(site?.phoneNumber, {
    phoneDisplay: base.phoneDisplay,
    phoneE164: base.phoneE164,
    whatsappUrl: base.whatsappUrl,
  });

  const lessonPriceEur = parsePriceNumber(
    pricing?.losseRijlesPrijs,
    base.lessonPriceEur,
  );
  const lessonPriceLabel = priceLabel(
    pricing?.losseRijlesPrijs,
    base.lessonPriceLabel,
  );

  const primaryCtaText =
    cmsScalarToString(site?.primaryCtaText) || base.primaryCta.text;
  const primaryCtaHref =
    cmsScalarToString(site?.primaryCtaLink) || base.primaryCta.href;

  const hasSiteData =
    hasFilledCmsValue(site?.phoneNumber) ||
    Boolean(cmsScalarToString(site?.emailAdress)) ||
    Boolean(cmsScalarToString(site?.primaryCtaText)) ||
    Boolean(cmsScalarToString(site?.primaryCtaLink));

  const hasPricingData =
    hasFilledCmsValue(pricing?.losseRijlesPrijs) ||
    hasFilledCmsValue(pricing?.pakket1Prijs) ||
    Boolean(cmsScalarToString(pricing?.bromfietsPrijs));

  if (!hasSiteData && !hasPricingData) {
    return null;
  }

  const packages = applyPackagePrices(base.packages, pricing);
  const extras = applyExtraPrices(base.extras, pricing, lessonPriceLabel);

  return {
    ...base,
    ...phone,
    contactEmail: cmsScalarToString(site?.emailAdress) || base.contactEmail,
    primaryCta: {
      text: primaryCtaText,
      href: primaryCtaHref,
    },
    lessonPriceEur,
    lessonPriceLabel,
    packages,
    extras,
  };
}
