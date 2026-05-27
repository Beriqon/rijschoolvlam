import { cache } from "react";

import { prepareBlogHtmlForRender } from "@/lib/cms/blog-html";
import { prepareFaqHtmlForRender } from "@/lib/cms/faq-html";
import { getLandingPageBySlug, getLandingPages } from "@/lib/cms/queries";
import type { CmsLandingPageNode } from "@/lib/cms/types";
import { SITE_URL } from "@/lib/constants";
import type { FaqItem } from "@/lib/faq-data";

export type LandingPageLink = {
  title: string;
  slug: string;
  group: "regions" | "popular";
};

export type LandingPageFooterGroups = {
  regions: LandingPageLink[];
  popular: LandingPageLink[];
};

export type LandingPage = {
  title: string;
  slug: string;
  heroTitle: string;
  heroHtml?: string;
  introTitle?: string;
  introHtml?: string;
  contentTitle?: string;
  contentHtml?: string;
  faqTitle?: string;
  faqItems: FaqItem[];
  ctaTitle?: string;
  ctaHtml?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
  seoTitle?: string;
  metaDescription?: string;
  heroImage?: {
    src: string;
    alt: string;
  };
};

function cleanText(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function prepareLandingHtml(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  const safeHtml = prepareBlogHtmlForRender(prepareFaqHtmlForRender(trimmed)).html.trim();
  return safeHtml || undefined;
}

function normalizeLandingHref(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }

  try {
    const target = new URL(trimmed);
    const site = new URL(SITE_URL);

    if (target.host === site.host) {
      const path = `${target.pathname}${target.search}${target.hash}`;
      return path || "/";
    }
  } catch {
    // Onparseerbare URL → ongewijzigd doorgeven.
  }

  return trimmed;
}

function normalizeCmsImageSrc(url: string): string {
  return url.replace(
    /^https:\/\/cms\.rijschoolvlam\.nl/i,
    "http://cms.rijschoolvlam.nl",
  );
}

function normalizeCategoryName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function resolveLandingPageGroup(node: CmsLandingPageNode): LandingPageLink["group"] {
  const categories = node.categories?.nodes ?? [];
  const hasRegionCategory = categories.some((category) => {
    const name = cleanText(category.name);
    return name ? normalizeCategoryName(name) === "regios" : false;
  });

  return hasRegionCategory ? "regions" : "popular";
}

function buildFaqItems(node: CmsLandingPageNode): FaqItem[] {
  const fields = node.landingspaginaVelden;
  const pairs = [
    [fields?.faq1vraag, fields?.faq1antwoord],
    [fields?.faq2vraag, fields?.faq2antwoord],
    [fields?.faq3vraag, fields?.faq3antwoord],
    [fields?.faq4vraag, fields?.faq4antwoord],
    [fields?.faq5vraag, fields?.faq5antwoord],
  ] as const;

  return pairs
    .map<FaqItem | null>(([questionValue, answerValue], index) => {
      const question = cleanText(questionValue);
      const answer = prepareFaqHtmlForRender(answerValue ?? "");

      if (!question || !answer) {
        return null;
      }

      return {
        id: `${node.slug}-faq-${index + 1}`,
        question,
        answer,
        answerIsHtml: true,
      };
    })
    .filter((item): item is FaqItem => item !== null);
}

export function mapCmsLandingPage(node: CmsLandingPageNode): LandingPage | null {
  const title = cleanText(node.title);
  const slug = cleanText(node.slug);

  if (!title || !slug) {
    return null;
  }

  const fields = node.landingspaginaVelden;
  const heroTitle = cleanText(fields?.herotitel) ?? title;
  const heroHtml = prepareLandingHtml(fields?.herotekst);
  const introTitle = cleanText(fields?.introtitel);
  const introHtml = prepareLandingHtml(fields?.introtekst);
  const contentTitle = cleanText(fields?.contenttitel);
  const contentHtml = prepareLandingHtml(fields?.contenttekst);
  const faqTitle = cleanText(fields?.faqtitel);
  const faqItems = buildFaqItems(node);
  const ctaTitle = cleanText(fields?.ctatitel);
  const ctaHtml = prepareLandingHtml(fields?.ctatekst);
  const ctaButtonText = cleanText(fields?.ctaknoptekst);
  const ctaButtonHref = normalizeLandingHref(fields?.ctaknopurl);
  const seoTitle = cleanText(fields?.seotitel);
  const metaDescription = cleanText(fields?.metabeschrijving);
  const rawHeroImageSrc = cleanText(node.featuredImage?.node?.sourceUrl);
  const heroImageAlt =
    cleanText(node.featuredImage?.node?.altText) ?? heroTitle ?? title;
  const heroImage = rawHeroImageSrc
    ? {
        src: normalizeCmsImageSrc(rawHeroImageSrc),
        alt: heroImageAlt,
      }
    : undefined;

  return {
    title,
    slug,
    heroTitle,
    ...(heroHtml ? { heroHtml } : {}),
    ...(introTitle ? { introTitle } : {}),
    ...(introHtml ? { introHtml } : {}),
    ...(contentTitle ? { contentTitle } : {}),
    ...(contentHtml ? { contentHtml } : {}),
    ...(faqTitle ? { faqTitle } : {}),
    faqItems,
    ...(ctaTitle ? { ctaTitle } : {}),
    ...(ctaHtml ? { ctaHtml } : {}),
    ...(ctaButtonText ? { ctaButtonText } : {}),
    ...(ctaButtonHref ? { ctaButtonHref } : {}),
    ...(seoTitle ? { seoTitle } : {}),
    ...(metaDescription ? { metaDescription } : {}),
    ...(heroImage ? { heroImage } : {}),
  };
}

function mapCmsLandingPageLinks(nodes: CmsLandingPageNode[]): LandingPageLink[] {
  return nodes
    .map((node) => {
      const title = cleanText(node.title);
      const slug = cleanText(node.slug);

      if (!title || !slug) {
        return null;
      }

      return {
        title,
        slug,
        group: resolveLandingPageGroup(node),
      };
    })
    .filter((item): item is LandingPageLink => item !== null);
}

export const getLandingPageBySlugWithFallback = cache(
  async (slug: string): Promise<LandingPage | null> => {
    try {
      const node = await getLandingPageBySlug(slug);
      return node ? mapCmsLandingPage(node) : null;
    } catch {
      // Geen hardcoded fallback voor landingspagina’s; 404 is veiliger dan een crash.
      return null;
    }
  },
);

export const getLandingPageLinksWithFallback = cache(
  async (): Promise<LandingPageLink[]> => {
    try {
      const nodes = await getLandingPages();
      return mapCmsLandingPageLinks(nodes);
    } catch {
      return [];
    }
  },
);

export const getLandingPageFooterGroupsWithFallback = cache(
  async (): Promise<LandingPageFooterGroups> => {
    const links = await getLandingPageLinksWithFallback();

    return {
      regions: links.filter((page) => page.group === "regions"),
      popular: links.filter((page) => page.group === "popular"),
    };
  },
);

export const getLandingPageStaticParamsWithFallback = cache(
  async (): Promise<Array<{ slug: string }>> => {
    const links = await getLandingPageLinksWithFallback();
    return links.map(({ slug }) => ({ slug }));
  },
);
