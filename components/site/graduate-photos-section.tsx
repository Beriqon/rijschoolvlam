import { GraduatePhotosCarousel } from "@/components/site/graduate-photos-carousel";
import { SectionHeading } from "@/components/site/section";
import { getGraduatePhotosWithFallback } from "@/lib/graduate-photos-data";

type GraduatePhotosSectionProps = {
  size?: "default" | "compact";
};

export async function GraduatePhotosSection({
  size = "default",
}: GraduatePhotosSectionProps) {
  const slides = await getGraduatePhotosWithFallback();

  return (
    <section
      className={
        size === "compact"
          ? "bg-muted/40 py-12 md:py-16"
          : "bg-muted/40 py-16 md:py-24"
      }
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resultaat"
          title="Geslaagden in beeld"
          description="Fotomomenten van leerlingen na een geslaagd examen."
        />
      </div>
      <GraduatePhotosCarousel slides={slides} size={size} />
    </section>
  );
}
