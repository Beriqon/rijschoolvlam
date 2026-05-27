import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import {
  getLandingPageBySlugWithFallback,
  getLandingPageStaticParamsWithFallback,
} from "@/lib/landing-pages-data";
import { withCanonical } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/site-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateStaticParams() {
  return getLandingPageStaticParamsWithFallback();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const page = await getLandingPageBySlugWithFallback(slug);

  if (!page) {
    return {
      title: {
        absolute: "Rijschool Vlam",
      },
    };
  }

  const title =
    page.seoTitle ?? `${page.heroTitle || page.title} | Rijschool Vlam`;
  const description =
    page.metaDescription ??
    stripHtml(page.heroHtml ?? page.introHtml ?? page.contentHtml ?? page.heroTitle).slice(
      0,
      160,
    );

  return withCanonical(`/${slug}`, {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      url: `/${slug}`,
    },
    twitter: {
      title,
      description,
    },
  });
}

export default async function LandingPage(props: PageProps) {
  const { slug } = await props.params;
  const [page, site] = await Promise.all([
    getLandingPageBySlugWithFallback(slug),
    getSiteConfig(),
  ]);

  if (!page) {
    notFound();
  }

  return <LandingPageTemplate page={page} site={site} />;
}
