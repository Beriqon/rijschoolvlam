import type { CmsBlogPostNode } from "@/lib/cms/types";
import type { BlogPost } from "@/lib/blog-data";

const DEFAULT_BLOG_IMAGE_SRC = "/logo/rijschoolvlamlogo.png";
const DEFAULT_READ_TIME_MINUTES = 5;

/** Tijdelijk: lokaal CMS draait nog zonder geldig SSL op het subdomein. */
function normalizeBlogImageSrc(url: string): string {
  return url.replace(
    /^https:\/\/cms\.rijschoolvlam\.nl/i,
    "http://cms.rijschoolvlam.nl",
  );
}

function toPublishedAt(date: string | null | undefined): string {
  if (!date?.trim()) {
    return "";
  }
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  return parsed.toISOString().slice(0, 10);
}

function toReadTimeMinutes(value: number | null | undefined): number {
  const minutes = Math.round(value ?? DEFAULT_READ_TIME_MINUTES);
  return minutes > 0 ? minutes : DEFAULT_READ_TIME_MINUTES;
}

/** Categories + tags uit WordPress → unieke pill-labels. */
function mapCmsBlogTerms(node: CmsBlogPostNode): string[] | undefined {
  const labels = new Set<string>();

  for (const term of node.categories?.nodes ?? []) {
    const name = term.name?.trim();
    if (name) {
      labels.add(name);
    }
  }

  for (const term of node.tags?.nodes ?? []) {
    const name = term.name?.trim();
    if (name) {
      labels.add(name);
    }
  }

  if (labels.size === 0) {
    return undefined;
  }

  return [...labels].sort((a, b) => a.localeCompare(b, "nl"));
}

/** Alleen velden voor blogoverzicht / cards; geen `content`. */
export function mapCmsBlogPostsToListItems(
  nodes: CmsBlogPostNode[],
): BlogPost[] {
  return nodes
    .map((node) => {
      const slug = node.slug?.trim();
      const title = node.title?.trim();
      if (!slug || !title) {
        return null;
      }

      const fields = node.blogFields;
      const excerpt = fields?.korteSamenvatting?.trim() || "";
      const rawImageSrc = node.featuredImage?.node?.sourceUrl?.trim();
      const imageSrc = rawImageSrc
        ? normalizeBlogImageSrc(rawImageSrc)
        : DEFAULT_BLOG_IMAGE_SRC;

      const tags = mapCmsBlogTerms(node);
      /** WP featured images: tekst links → zelfde crop als hardcoded `coverImageAnchor: "left"`. */
      const coverImageAnchor = rawImageSrc ? ("left" as const) : undefined;

      const slide: BlogPost = {
        slug,
        title,
        excerpt,
        imageSrc,
        publishedAt: toPublishedAt(node.date),
        readTimeMinutes: toReadTimeMinutes(fields?.leestijd),
        ...(coverImageAnchor ? { coverImageAnchor } : {}),
        ...(tags ? { tags } : {}),
      };

      return slide;
    })
    .filter((post): post is BlogPost => post !== null);
}

export function mapCmsBlogPostToDetail(
  node: CmsBlogPostNode,
): BlogPost | null {
  const slug = node.slug?.trim();
  const title = node.title?.trim();
  if (!slug || !title) {
    return null;
  }

  const fields = node.blogFields;
  const excerpt = fields?.korteSamenvatting?.trim() || "";
  const rawImageSrc = node.featuredImage?.node?.sourceUrl?.trim();
  const imageSrc = rawImageSrc
    ? normalizeBlogImageSrc(rawImageSrc)
    : DEFAULT_BLOG_IMAGE_SRC;

  const htmlContent = node.content?.trim() || undefined;
  const tags = mapCmsBlogTerms(node);
  const coverImageAnchor = rawImageSrc ? ("left" as const) : undefined;

  return {
    slug,
    title,
    excerpt,
    imageSrc,
    publishedAt: toPublishedAt(node.date),
    readTimeMinutes: toReadTimeMinutes(fields?.leestijd),
    ...(coverImageAnchor ? { coverImageAnchor } : {}),
    ...(tags ? { tags } : {}),
    ...(htmlContent ? { htmlContent } : {}),
  };
}
