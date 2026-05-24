import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { FaqJsonLd } from "@/components/site/faq-json-ld";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section, SectionHeading } from "@/components/site/section";
import { getFaqsWithFallback } from "@/lib/faq-data";
import { withCanonical } from "@/lib/metadata";

export const metadata: Metadata = withCanonical("/veelgestelde-vragen", {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op veelgestelde vragen over rijlessen, spoedcursus, ophalen in Utrecht, CBR-examen en annuleren bij Rijschool Vlam.",
});

export default async function FaqPage() {
  const faqItems = await getFaqsWithFallback();

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <Section className="pt-12 md:pt-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Veelgestelde vragen"
          description="Staat je vraag er niet tussen? Bel of mail ons — we helpen je graag persoonlijk verder."
        />
        <div className="mt-12">
          <FaqAccordion items={faqItems} />
        </div>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}
