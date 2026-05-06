import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Gauge,
  GraduationCap,
  Rocket,
  Sparkles,
  Target,
  Timer,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FadeIn } from "@/components/site/fade-in";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Spoedcursus rijbewijs Utrecht — Rijschool Vlam",
  description:
    "Snel je rijbewijs halen in Utrecht? Kies voor een spoedcursus bij Rijschool Vlam: intensief lesrooster, persoonlijke begeleiding en voorbereiding op het CBR-praktijkexamen.",
};

const HERO_POINTS = [
  "Meerdere lessen per week rond jouw agenda",
  "Strak schema na je gratis proefles / intake",
  "Vaak binnen 2–4 weken richting praktijkexamen",
] as const;

const BENEFITS = [
  {
    icon: Gauge,
    title: "Snel en efficiënt",
    description: "In korte tijd veel rijden — sneller klaar voor het examen.",
  },
  {
    icon: CalendarDays,
    title: "Flexibel plannen",
    description: "Ook avond of weekend, afgestemd op jouw beschikbaarheid.",
  },
  {
    icon: Target,
    title: "Heldere leerdoelen",
    description: "Elke les heeft focus; geen vage rondjes zonder plan.",
  },
  {
    icon: Sparkles,
    title: "Kennis blijft hangen",
    description: "Door hoge frequentie blijft wat je leert vers en herkenbaar.",
  },
  {
    icon: Users,
    title: "Voor elk niveau",
    description: "Startend of bijgespijkerd — het lesplan wordt op jou toegesneden.",
  },
] as const;

const FOR_WHO = [
  "Je hebt snel je rijbewijs nodig voor werk, studie of privé.",
  "Je wilt niet maandenlang wekelijks één losse les.",
  "Je hebt (wat) ervaring en wilt snel routine opbouwen.",
  "Je wilt in korte tijd veel kilometers maken in echt Utrechts verkeer.",
] as const;

const STEPS = [
  {
    icon: CalendarDays,
    title: "Intake en planning",
    description:
      "We starten met een gratis proefles of intake en maken een haalbaar weekschema.",
  },
  {
    icon: Rocket,
    title: "Intensieve lessen",
    description:
      "Meerdere keren per week les met vaste doelen — sneller vertrouwen en vaardigheid.",
  },
  {
    icon: GraduationCap,
    title: "Examengericht trainen",
    description:
      "We oefenen route-onderdelen en situaties zoals bij het CBR in Utrecht.",
  },
  {
    icon: Timer,
    title: "Examen gereed",
    description:
      "Afhankelijk van je niveau vaak afgerond in 2–4 weken, met een helder examenmoment.",
  },
] as const;

export default function SpoedcursusPage() {
  return (
    <>
      <Section className="pb-14 pt-12 md:pb-20 md:pt-16">
        <FadeIn className="grid gap-10 lg:grid-cols-[1fr,min(100%,21rem)] lg:gap-14 lg:items-start">
          <div>
            <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
              Intensief traject · Utrecht
            </p>
            <h1 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:max-w-[22ch]">
              Spoedcursus bij Rijschool Vlam
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
              Geen maanden tussen elke losse les: een strak spoedprogramma waarin je in korte
              tijd veel rijdt — met rust, structuur en persoonlijke begeleiding.
            </p>
            <ul className="mt-8 max-w-xl space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
              {HERO_POINTS.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="text-primary mt-0.5 size-5 shrink-0" strokeWidth={2.5} aria-hidden />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="relative overflow-hidden rounded-2xl border-2 border-primary/25 bg-card p-6 shadow-md md:p-7">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-transparent"
              aria-hidden
            />
            <div className="relative">
              <p className="text-foreground font-semibold">Start jouw spoedtraject</p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Eerst vrijblijvend kennis maken — daarna stemmen we uren per week af op jouw
                niveau en doelen.
              </p>
              <Button className="mt-6 w-full" size="lg" asChild>
                <Link href="/contact">Plan gratis proefles</Link>
              </Button>
              <Button className="mt-3 w-full" variant="outline" size="lg" asChild>
                <Link href="/tarieven">Bekijk tarieven</Link>
              </Button>
              <p className="text-muted-foreground mt-5 border-t pt-5 text-xs leading-relaxed">
                Typisch tussen de <strong className="text-foreground font-medium">10 en 30 uur</strong>{" "}
                praktijk, afhankelijk van je startniveau.
              </p>
            </div>
          </aside>
        </FadeIn>
      </Section>

      <Section className="border-border border-t bg-muted/35 pb-14 pt-12 md:pb-20 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <FadeIn>
            <h2 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
              Wat is een spoedopleiding?
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Je volgt een <strong className="text-foreground font-medium">hoog tempo</strong>{" "}
              met meerdere lessen per week. Door de cadans bouw je sneller routine op en blijven
              handelingen en verkeersinzicht beter beklijven — niet omdat we haast hebben,
              maar omdat je vaak genoeg zit voor consistente vooruitgang.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              De intake helpt bij een eerlijk uren‑ en weekplan (vaak circa{" "}
              <strong className="text-foreground font-medium">2–4 weken</strong> richting examen bij
              passend niveau).
            </p>
            <div className="text-foreground mt-8 inline-flex rounded-xl border bg-background/90 px-4 py-3 text-sm shadow-sm">
              <span className="text-primary mr-3 font-semibold">
                Bij ons = &ldquo;goed georganiseerd&rdquo;
              </span>
              <span className="text-muted-foreground">
                niet onrustig of slap along schuiven tussen losse lessen.
              </span>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-card border-border rounded-2xl border p-7 shadow-sm md:p-8">
              <h2 className="text-foreground text-lg font-semibold md:text-xl">
                Geschikt voor jou als…
              </h2>
              <ul className="mt-5 space-y-3.5 text-sm leading-relaxed">
                {FOR_WHO.map((line) => (
                  <li key={line} className="flex gap-3">
                    <ArrowRight className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                    <span className="text-muted-foreground">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="pb-14 pt-12 md:pb-20 md:pt-16">
        <FadeIn className="text-center">
          <h2 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
            Waarom een spoedcursus in Utrecht?
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-[0.9375rem]">
            Druk stadsverkeer, rotondes, snelweg en buurten door elkaar — ideaal om snel breed
            te leren rijden, met dezelfde rust en veiligheid als bij een gewoon lestempo.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map((item, idx) => (
            <FadeIn key={item.title} delay={idx * 0.03}>
              <article className="bg-card flex min-h-[9.5rem] flex-col gap-3 p-5 md:p-6">
                <item.icon className="text-primary size-6 shrink-0" aria-hidden />
                <h3 className="text-foreground text-sm font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
                  {item.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-border bg-muted/30 pb-16 pt-12 md:pb-24 md:pt-14">
        <FadeIn className="mx-auto max-w-3xl text-center md:text-left">
          <p className="text-primary mb-2 text-sm font-semibold uppercase tracking-wide">
            Aanpak
          </p>
          <h2 className="text-foreground text-xl font-semibold tracking-tight md:text-3xl md:leading-snug">
            Van intake tot praktijkexamen in vaste stappen
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:mx-0 md:text-[0.9375rem]">
            Transparante volgorde: je weet waar je staat — en wat de volgende fase is.
          </p>
        </FadeIn>

        <FadeIn className="relative mx-auto mt-12 max-w-3xl">
          <span
            className="bg-primary/35 absolute bottom-10 left-[1.0625rem] top-10 w-[2px] md:left-8"
            aria-hidden
          />
          <ol className="relative space-y-8 md:space-y-10">
            {STEPS.map((step, idx) => (
              <li key={step.title} className="flex gap-5 md:gap-8">
                <div className="relative z-[1] flex shrink-0 flex-col items-center pt-1">
                  <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-sm font-bold md:size-14 md:text-lg">
                    {idx + 1}
                  </span>
                </div>
                <div className="bg-card border-border min-w-0 flex-1 rounded-xl border px-5 py-5 shadow-sm md:px-6 md:py-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <step.icon className="text-primary size-5 shrink-0 md:size-6" aria-hidden />
                    <h3 className="text-foreground text-base font-semibold md:text-lg">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-[0.9375rem]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>

        <FadeIn className="text-muted-foreground mx-auto mt-12 max-w-2xl space-y-4 border-t pt-12 text-center text-sm leading-relaxed md:mt-14 md:text-[0.9375rem]">
          <p>
            Utrecht combineert stad, ring en wijken: je bouwt daarom breed ervaring op — waardevol voor later elke rit.
          </p>
          <p>
            Klaar voor een realistisch spoedadvies voor jouw agenda? Plant vandaag nog je gratis proefles.
          </p>
        </FadeIn>

        <FadeIn className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/contact">Vrijblijvende intake aanvragen</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Stel een vraag</Link>
          </Button>
        </FadeIn>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}
