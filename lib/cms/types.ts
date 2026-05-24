export type CmsReviewNode = {
  title: string;
  reviewFields: {
    naam: string | null;
    beoordeling: number | null;
    reviewTekst: string | null;
  } | null;
};

export type CmsFaqNode = {
  title: string;
  faqFields: {
    vraag: string | null;
    antwoord: string | null;
  } | null;
};

export type CmsFeaturedImage = {
  node: {
    sourceUrl: string;
    altText: string | null;
  } | null;
} | null;

export type CmsGalleryImageNode = {
  title: string;
  galleryFields: {
    altTekst: string | null;
    categorie: string | null;
  } | null;
  featuredImage: CmsFeaturedImage;
};

export type CmsBlogTermNode = {
  name: string | null;
};

export type CmsBlogPostNode = {
  title: string;
  slug: string;
  date?: string | null;
  content: string | null;
  blogFields: {
    leestijd: number | null;
    korteSamenvatting: string | null;
  } | null;
  featuredImage: CmsFeaturedImage;
  categories?: { nodes: CmsBlogTermNode[] } | null;
  tags?: { nodes: CmsBlogTermNode[] } | null;
};

export type CmsSiteSettings = {
  phoneNumber: string | null;
  emailAdress: string | null;
  primaryCtaText: string | null;
  primaryCtaLink: string | null;
} | null;

/** ACF number fields komen via WPGraphQL vaak als number, niet als string. */
export type CmsPriceField = string | number | null;

export type CmsPricingSettings = {
  losseRijlesPrijs: CmsPriceField;
  bromfietsPrijs: CmsPriceField;
  theoriePakketPrijs: CmsPriceField;
  tussentijdseToetsPrijs: CmsPriceField;
  praktijkexamenPrijs: CmsPriceField;
  faalangstexamenPrijs: CmsPriceField;
  opfriscursusTekst: string | null;
  examengarantieTekst: string | null;
  pakket1Prijs: CmsPriceField;
  pakket2Prijs: CmsPriceField;
  pakket3Prijs: CmsPriceField;
  pakket4Prijs: CmsPriceField;
} | null;

export type CmsPageWithSettingsNode = {
  title: string;
  slug: string;
  siteSettings: CmsSiteSettings;
  pricingSettings: CmsPricingSettings;
};
