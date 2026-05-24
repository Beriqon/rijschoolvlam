import type { CmsReviewNode } from "@/lib/cms/types";
import type { Review } from "@/lib/reviews-data";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toRating(value: number | null): Review["rating"] {
  const rounded = Math.round(value ?? 5);
  if (rounded <= 1) return 1;
  if (rounded >= 5) return 5;
  return rounded as Review["rating"];
}

export function mapCmsReviewsToReviews(nodes: CmsReviewNode[]): Review[] {
  const usedIds = new Set<string>();

  return nodes
    .map((node, index) => {
      const fields = node.reviewFields;
      const author = fields?.naam?.trim() || node.title?.trim() || "";
      const text = fields?.reviewTekst?.trim() || "";

      if (!author || !text) {
        return null;
      }

      const baseId = slugify(author) || `review-${index + 1}`;
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);

      return {
        id,
        rating: toRating(fields?.beoordeling ?? null),
        text,
        author,
      } satisfies Review;
    })
    .filter((review): review is Review => review !== null);
}
