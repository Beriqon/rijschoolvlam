import { mapCmsGalleryImagesToSlides } from "@/lib/cms/map-gallery";
import { getGalleryImages } from "@/lib/cms/queries";

export type GraduatePhotoSlide = {
  id: string;
  /**
   * Pad onder `public/`, bv. `/geslaagden/mijn-foto.png`
   * Zet op `null` voor een placeholder in de UI.
   */
  imageSrc: string | null;
  alt: string;
  /** Korte titel onder de foto (optioneel) */
  caption?: string;
};

/** Bestandsnamen in `public/geslaagden/` (alfabetisch / volgorde zoals op schijf). */
const GESLAAGDEN_FILENAMES = [
  "Schermafbeelding 2026-05-04 233730.png",
  "Schermafbeelding 2026-05-04 233736.png",
  "Schermafbeelding 2026-05-04 233752.png",
  "Schermafbeelding 2026-05-04 233828.png",
  "Schermafbeelding 2026-05-04 233835.png",
  "Schermafbeelding 2026-05-04 233846.png",
  "Schermafbeelding 2026-05-04 233854.png",
  "Schermafbeelding 2026-05-04 233957.png",
  "Schermafbeelding 2026-05-04 234008.png",
  "Schermafbeelding 2026-05-04 234016.png",
  "Schermafbeelding 2026-05-04 234033.png",
  "Schermafbeelding 2026-05-04 234131.png",
  "Schermafbeelding 2026-05-04 234138.png",
  "Schermafbeelding 2026-05-04 234146.png",
  "Schermafbeelding 2026-05-04 234200.png",
] as const;

function geslaagdenSrc(filename: string) {
  return `/geslaagden/${encodeURIComponent(filename)}`;
}

/** Statische backup wanneer het CMS niet bereikbaar is of geen geldige foto’s teruggeeft. */
export const GRADUATE_PHOTOS: GraduatePhotoSlide[] = GESLAAGDEN_FILENAMES.map(
  (name, i) => ({
    id: `g${i + 1}`,
    imageSrc: geslaagdenSrc(name),
    alt: `Geslaagde leerling bij Rijschool Vlam — foto ${i + 1}`,
  })
);

export async function getGraduatePhotosWithFallback(): Promise<
  GraduatePhotoSlide[]
> {
  try {
    const nodes = await getGalleryImages();
    const mapped = mapCmsGalleryImagesToSlides(nodes);
    if (mapped.length > 0) {
      return mapped;
    }
  } catch {
    // CMS onbereikbaar of query mislukt → statische geslaagdenfoto’s
  }

  return GRADUATE_PHOTOS;
}
