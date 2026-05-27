import { cmsFetch } from "@/lib/cms/client";
import type {
  CmsBlogPostNode,
  CmsFaqNode,
  CmsGalleryImageNode,
  CmsLandingPageNode,
  CmsPageWithSettingsNode,
  CmsReviewNode,
} from "@/lib/cms/types";

const REVIEWS_QUERY = /* GraphQL */ `
  query GetReviews {
    reviews(first: 100) {
      nodes {
        title
        reviewFields {
          naam
          beoordeling
          reviewTekst
        }
      }
    }
  }
`;

const FAQS_QUERY = /* GraphQL */ `
  query GetFaqs {
    faqs(first: 100, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        title
        faqFields {
          vraag
          antwoord
        }
      }
    }
  }
`;

/** Haalt “FAQ 1”, “FAQ 2”, … uit post title voor natuurlijke volgorde (1 < 2 < 10). */
function extractFaqTitleNumber(title: string): number | null {
  const match = title.match(/FAQ\s*(\d+)/i);
  if (!match) {
    return null;
  }
  const n = Number.parseInt(match[1], 10);
  return Number.isFinite(n) ? n : null;
}

function sortFaqNodesByTitleNumber(nodes: CmsFaqNode[]): CmsFaqNode[] {
  return [...nodes].sort((a, b) => {
    const na =
      extractFaqTitleNumber(a.title?.trim() ?? "") ?? Number.MAX_SAFE_INTEGER;
    const nb =
      extractFaqTitleNumber(b.title?.trim() ?? "") ?? Number.MAX_SAFE_INTEGER;
    if (na !== nb) {
      return na - nb;
    }
    return (a.title ?? "").localeCompare(b.title ?? "", "nl", {
      numeric: true,
      sensitivity: "base",
    });
  });
}

const GALLERY_IMAGES_QUERY = /* GraphQL */ `
  query GetGalleryImages {
    galleryimages(first: 100) {
      nodes {
        title
        galleryFields {
          altTekst
          categorie
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const BLOG_POSTS_QUERY = /* GraphQL */ `
  query GetBlogPosts {
    posts(first: 100, where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        title
        slug
        date
        content
        blogFields {
          leestijd
          korteSamenvatting
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const BLOG_POST_BY_SLUG_QUERY = /* GraphQL */ `
  query GetBlogPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      title
      slug
      date
      content
      blogFields {
        leestijd
        korteSamenvatting
      }
      categories {
        nodes {
          name
        }
      }
      tags {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

const SITE_SETTINGS_AND_PRICING_QUERY = /* GraphQL */ `
  query GetSiteSettingsAndPricing {
    pages {
      nodes {
        title
        slug
        siteSettings {
          phoneNumber
          emailAdress
          primaryCtaText
          primaryCtaLink
        }
        pricingSettings {
          losseRijlesPrijs
          bromfietsPrijs
          theoriePakketPrijs
          tussentijdseToetsPrijs
          praktijkexamenPrijs
          faalangstexamenPrijs
          opfriscursusTekst
          examengarantieTekst
          pakket1Prijs
          pakket2Prijs
          pakket3Prijs
          pakket4Prijs
        }
      }
    }
  }
`;

const LANDING_PAGES_QUERY = /* GraphQL */ `
  query GetLandingPages {
    landingspaginas(
      first: 100
      where: { orderby: { field: TITLE, order: ASC } }
    ) {
      nodes {
        title
        slug
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        landingspaginaVelden {
          herotitel
          herotekst
          introtitel
          introtekst
          contenttitel
          contenttekst
          faqtitel
          faq1vraag
          faq1antwoord
          faq2vraag
          faq2antwoord
          faq3vraag
          faq3antwoord
          faq4vraag
          faq4antwoord
          faq5vraag
          faq5antwoord
          ctatitel
          ctatekst
          ctaknoptekst
          ctaknopurl
          seotitel
          metabeschrijving
        }
      }
    }
  }
`;

const LANDING_PAGE_BY_SLUG_QUERY = /* GraphQL */ `
  query GetLandingPageBySlug($slug: String!) {
    landingspaginas(first: 1, where: { name: $slug }) {
      nodes {
        title
        slug
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        landingspaginaVelden {
          herotitel
          herotekst
          introtitel
          introtekst
          contenttitel
          contenttekst
          faqtitel
          faq1vraag
          faq1antwoord
          faq2vraag
          faq2antwoord
          faq3vraag
          faq3antwoord
          faq4vraag
          faq4antwoord
          faq5vraag
          faq5antwoord
          ctatitel
          ctatekst
          ctaknoptekst
          ctaknopurl
          seotitel
          metabeschrijving
        }
      }
    }
  }
`;

export async function getReviews(): Promise<CmsReviewNode[]> {
  const data = await cmsFetch<{ reviews: { nodes: CmsReviewNode[] } }>(
    REVIEWS_QUERY,
  );
  return data.reviews.nodes;
}

export async function getFaqs(): Promise<CmsFaqNode[]> {
  const data = await cmsFetch<{ faqs: { nodes: CmsFaqNode[] } }>(FAQS_QUERY);
  return sortFaqNodesByTitleNumber(data.faqs.nodes);
}

export async function getGalleryImages(): Promise<CmsGalleryImageNode[]> {
  const data = await cmsFetch<{
    galleryimages: { nodes: CmsGalleryImageNode[] };
  }>(GALLERY_IMAGES_QUERY);
  return data.galleryimages.nodes;
}

export async function getBlogPosts(): Promise<CmsBlogPostNode[]> {
  const data = await cmsFetch<{ posts: { nodes: CmsBlogPostNode[] } }>(
    BLOG_POSTS_QUERY,
  );
  return data.posts.nodes;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<CmsBlogPostNode | null> {
  const data = await cmsFetch<{ postBy: CmsBlogPostNode | null }>(
    BLOG_POST_BY_SLUG_QUERY,
    { slug },
  );
  return data.postBy;
}

export async function getSiteSettingsAndPricing(): Promise<
  CmsPageWithSettingsNode[]
> {
  const data = await cmsFetch<{ pages: { nodes: CmsPageWithSettingsNode[] } }>(
    SITE_SETTINGS_AND_PRICING_QUERY,
  );
  return data.pages.nodes;
}

export async function getLandingPages(): Promise<CmsLandingPageNode[]> {
  const data = await cmsFetch<{
    landingspaginas: { nodes: CmsLandingPageNode[] };
  }>(LANDING_PAGES_QUERY);
  return data.landingspaginas.nodes;
}

export async function getLandingPageBySlug(
  slug: string,
): Promise<CmsLandingPageNode | null> {
  const data = await cmsFetch<{
    landingspaginas: { nodes: CmsLandingPageNode[] };
  }>(LANDING_PAGE_BY_SLUG_QUERY, { slug });

  return data.landingspaginas.nodes.find((node) => node.slug === slug) ?? null;
}
