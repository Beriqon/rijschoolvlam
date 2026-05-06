import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section, SectionHeading } from "@/components/site/section";
import { FAQ_ITEMS } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op veelgestelde vragen over rijlessen, spoedcursus, ophalen in Utrecht, CBR-examen en annuleren bij Rijschool Vlam.",
};

export default function FaqPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Veelgestelde vragen"
          description="Staat je vraag er niet tussen? Bel of mail ons — we helpen je graag persoonlijk verder."
        />
        <div className="mt-12">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}
