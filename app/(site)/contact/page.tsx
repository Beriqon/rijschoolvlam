import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarClock, Check, Clock, Mail, MessageCircle, Phone } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { ContactForm } from "@/components/site/contact-form";
import { FadeIn } from "@/components/site/fade-in";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section } from "@/components/site/section";
import { CONTACT_EMAIL, OPENING_HOURS, PHONE_DISPLAY, PHONE_E164 } from "@/lib/constants";

const TRUST_POINTS = [
  "Gratis proefles & persoonlijk lesadvies",
  "Heldere pakketten — schakel én automaat",
  "Snel reactie via telefoon, mail of formulier",
] as const;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rijschool Vlam Utrecht: adres Willem van Noortstraat 46, bel 06-13568060 of stuur een bericht via het contactformulier.",
};

function ContactCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="bg-primary/12 text-primary shrink-0 rounded-xl p-2.5 ring-1 ring-primary/15">
        <Icon className="size-5" aria-hidden strokeWidth={2.25} />
      </div>
      <div className="min-w-0 pt-0.5">
        <h2 className="text-foreground text-sm font-semibold">{title}</h2>
        <div className="text-muted-foreground mt-2 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Section className="pt-12 pb-14 md:pt-16 md:pb-20">
        <FadeIn>
          <div className="border-border/80 from-muted/45 via-background to-background relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-sm sm:p-8 md:rounded-3xl md:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-[min(28rem,70vw)] rounded-full bg-primary/[0.07] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-16 size-[min(22rem,55vw)] rounded-full bg-primary/[0.04] blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
              <div className="space-y-8 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                <div>
                  <span className="text-primary mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                    Contact
                  </span>
                  <h1 className="font-heading text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                    Neem contact met ons op
                  </h1>
                  <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                    Gratis proefles, advies over je lestraject of een vraag over tarieven — we
                    reageren snel en denken met je mee.
                  </p>
                </div>

                <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                  {TRUST_POINTS.map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check
                        className="text-primary mt-0.5 size-5 shrink-0"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-card border-primary/20 space-y-8 rounded-2xl border p-6 shadow-sm ring-1 ring-primary/10 sm:p-8">
                  <ContactCard icon={Phone} title="Bel direct">
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="text-primary font-semibold underline-offset-4 hover:underline"
                    >
                      {PHONE_DISPLAY}
                    </a>
                    <p className="mt-2 flex items-center gap-2 text-xs">
                      <Clock className="size-3.5 shrink-0 opacity-70" aria-hidden />
                      Meestal het snelst voor een afspraak.
                    </p>
                  </ContactCard>

                  <ContactCard icon={Mail} title="E-mail">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-primary break-all font-medium underline-offset-4 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </ContactCard>

                  <ContactCard icon={CalendarClock} title="Openingstijden">
                    <dl className="space-y-1.5">
                      {OPENING_HOURS.map(({ day, hours }) => (
                        <div key={day} className="flex justify-between gap-4 text-sm">
                          <dt className="text-foreground/90 shrink-0 font-medium">{day}</dt>
                          <dd className="text-right tabular-nums">{hours}</dd>
                        </div>
                      ))}
                    </dl>
                  </ContactCard>

                  <ContactCard icon={MessageCircle} title="Formulier">
                    <p>Vul het formulier in — je e-mailapp opent automatisch met alle gegevens.</p>
                  </ContactCard>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}
