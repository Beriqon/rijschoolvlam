import type { CmsGalleryImageNode } from "@/lib/cms/types";
import type { GraduatePhotoSlide } from "@/lib/graduate-photos-data";

/** Tijdelijk: lokaal CMS draait nog zonder geldig SSL op het subdomein. */
function normalizeGalleryImageSrc(url: string): string {
  return url.replace(
    /^https:\/\/cms\.rijschoolvlam\.nl/i,
    "http://cms.rijschoolvlam.nl",
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function mapCmsGalleryImagesToSlides(
  nodes: CmsGalleryImageNode[],
): GraduatePhotoSlide[] {
  const usedIds = new Set<string>();

  return nodes
    .map((node, index) => {
      const rawImageSrc = node.featuredImage?.node?.sourceUrl?.trim();
      if (!rawImageSrc) {
        return null;
      }
      const imageSrc = normalizeGalleryImageSrc(rawImageSrc);

      const altTekst = node.galleryFields?.altTekst?.trim();
      const featuredAlt = node.featuredImage?.node?.altText?.trim();
      const title = node.title?.trim();
      const alt =
        altTekst ||
        featuredAlt ||
        title ||
        `Geslaagde leerling bij Rijschool Vlam — foto ${index + 1}`;

      const categorie = node.galleryFields?.categorie?.trim();
      const caption = categorie || undefined;

      const baseId = slugify(title || `gallery-${index + 1}`) || `g${index + 1}`;
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);

      const slide: GraduatePhotoSlide = {
        id,
        imageSrc,
        alt,
        ...(caption ? { caption } : {}),
      };

      return slide;
    })
    .filter((slide): slide is GraduatePhotoSlide => slide !== null);
}
