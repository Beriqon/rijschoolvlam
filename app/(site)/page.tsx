import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Car,
  Gauge,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FadeIn } from "@/components/site/fade-in";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { ReviewsSection } from "@/components/site/reviews-section";
import { Section, SectionHeading } from "@/components/site/section";
import { FAQ_ITEMS, FAQ_PREVIEW_COUNT } from "@/lib/faq-data";
import { CBR_UTRECHT, PHONE_DISPLAY, PHONE_E164 } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rijschool Utrecht — Rijbewijs bij Rijschool Vlam",
  description:
    "Rijlessen in Utrecht met schakel-, automaat- of elektrische lesauto: gratis proefles, scherp tarief per les, persoonlijke begeleiding en flexibele lestijden. Rijschool Vlam helpt je tot je praktijkexamen — lees ervaringen van leerlingen op de homepage.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2000&q=80";

export default function HomePage() {
  const faqPreview = FAQ_ITEMS.slice(0, FAQ_PREVIEW_COUNT);

  return (
    <>
      <section className="relative min-h-[min(100vh,52rem)] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Perspectief vanuit een auto op de weg"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/20" />
        <div className="relative mx-auto flex min-h-[min(100vh,52rem)] max-w-7xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
          <FadeIn className="max-w-3xl">
            <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
              Utrecht en omgeving
            </p>
            <h1 className="font-sans text-foreground text-balance text-[clamp(2.1875rem,1.45rem+2.6vw,3.75rem)] font-semibold leading-[1.07] tracking-[-0.022em] sm:leading-[1.06] lg:tracking-[-0.028em]">
              Snel en betaalbaar je rijbewijs bij Rijschool Vlam
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
              Kwalitatieve rijlessen, duidelijke tarieven en een rustige, doelgerichte
              aanpak — van gratis proefles tot je praktijkexamen bij het CBR. Naast schakel
              lesauto&apos;s bieden we ook{" "}
              <strong className="text-foreground font-medium">
                automaatrijlessen en elektrische autorijlessen
              </strong>
              , zodat je oefent in het type auto dat bij jou past.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild>
                <Link href="/contact">Plan gratis proefles</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${PHONE_E164}`}>Bel {PHONE_DISPLAY}</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Section className="py-14 md:py-20">
        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ShieldCheck,
              title: "Betrouwbaar en professioneel",
              text: "Erkende autorijschool met ervaren instructeurs en focus op verkeersveiligheid.",
            },
            {
              icon: Gauge,
              title: "Hoog slagingspercentage",
              text: "Doelgerichte methode en examengerichte routes in Utrecht.",
            },
            {
              icon: Users,
              title: "Persoonlijke aandacht",
              text: "Vaste lijn in je traject, geduldige didactiek en tempo op jouw niveau.",
            },
            {
              icon: Car,
              title: "Schakel, automaat of elektrisch",
              text: "Rijlessen in een schakelauto, automaat of elektrische lesauto — je oefent in het type auto dat bij jouw voorkeur en je praktijkexamen past.",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05} className="h-full">
              <div className="bg-card border-border flex h-full flex-col rounded-xl border p-6 shadow-sm">
                <item.icon className="text-primary size-9 shrink-0" aria-hidden />
                <h3 className="mt-4 shrink-0 text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/40 py-14 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-heading text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
              Rijlessen op maat in Utrecht
            </h2>
            <div className="text-muted-foreground mt-6 space-y-4 text-base leading-relaxed">
              <p>
                Of je nu kiest voor individuele autorijlessen, een spoedcursus of
                theoriebegeleiding: wij stemmen alles af op jouw tempo en leerdoelen.
              </p>
              <p>
                Naast schakel lesauto&apos;s kun je bij ons ook lessen in een{" "}
                <strong className="text-foreground font-medium">automaat</strong> en in een{" "}
                <strong className="text-foreground font-medium">elektrische lesauto</strong>
                . Zo oefen je in het type auto dat past bij jouw voorkeur en bij je
                praktijkexamen (schakel of automaat).
              </p>
              <p>
                Wij halen en brengen je op een locatie in Utrecht die voor jou past —
                bijvoorbeeld Utrecht Centraal, school, werk of thuis — ook &apos;s avonds
                en in het weekend.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="bg-card border-border rounded-xl border p-8 shadow-sm">
              <h3 className="text-lg font-semibold">Kosteloos inschrijven</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Je start zonder extra administratiekosten. Lessen tot{" "}
                <strong className="text-foreground">48 uur</strong> van tevoren kosteloos
                verplaatsen of annuleren.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/tarieven">Bekijk tarieven</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      <ReviewsSection />

      <Section className="bg-muted/40">
        <FadeIn>
          <div className="border-border overflow-hidden rounded-2xl border shadow-sm">
            <Image
              src="/site/sectieutrecht.png"
              alt="Dekking: Rijschool Vlam in heel Utrecht — wij halen je op in alle wijken."
              width={1536}
              height={1024}
              className="h-auto w-full"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </FadeIn>
      </Section>

      <GraduatePhotosSection />

      <Section className="bg-muted/40">
        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="bg-card border-border flex h-full flex-col rounded-xl border p-8 shadow-sm">
              <BookOpen className="text-primary size-9" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold">Theoriecursus</h3>
              <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                Klassikaal of online: we leggen de verkeersregels begrijpelijk uit zodat
                je zelfverzekerd naar het CBR-theorie-examen gaat.
              </p>
              <Button variant="outline" className="mt-6 w-fit" asChild>
                <Link href="/theorieles">Meer over theorieles</Link>
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="bg-card border-border flex h-full flex-col rounded-xl border p-8 shadow-sm">
              <Gauge className="text-primary size-9" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold">Spoedcursus</h3>
              <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                Snel je rijbewijs? Na de proefles stellen we een intensief weekschema op
                met meerdere lessen per week.
              </p>
              <Button variant="outline" className="mt-6 w-fit" asChild>
                <Link href="/spoedcursus">Meer over spoedcursus</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Examen"
          title="Praktijkexamen in Utrecht"
          description={`We vragen je examen aan bij het CBR (${CBR_UTRECHT.street}). Je oefent de routes die relevant zijn voor je examen.`}
        />
        <FadeIn className="mx-auto mt-8 max-w-4xl text-center">
          <p className="text-muted-foreground mx-auto text-sm leading-relaxed">
            Tip: machtig ons tijdig via Mijn CBR met ons rijschoolnummer, zodat we je
            examen kunnen plannen en begeleiden.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-muted/40">
        <SectionHeading
          eyebrow="FAQ"
          title="Veelgestelde vragen"
          description="Antwoorden op de meest gestelde vragen. Bekijk alle vragen op de FAQ-pagina."
        />
        <FadeIn className="mt-10">
          <FaqAccordion items={faqPreview} />
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/veelgestelde-vragen">Alle veelgestelde vragen</Link>
            </Button>
          </div>
        </FadeIn>
      </Section>

      <CtaBand />
    </>
  );
}
