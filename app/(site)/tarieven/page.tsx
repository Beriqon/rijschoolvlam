import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FadeIn } from "@/components/site/fade-in";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section, SectionHeading } from "@/components/site/section";
import { CANCELLATION_HOURS, LESSON_PRICE_EUR } from "@/lib/constants";
import { withCanonical } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = withCanonical("/tarieven", {
  title: "Tarieven — Rijschool Vlam Utrecht",
  description: `Bekijk onze tarieven: losse rijles €${LESSON_PRICE_EUR},- (60 min) en rijlespakketten inclusief CBR-praktijkexamen. Transparant, zonder inschrijfgeld.`,
});

const packageFeatures = [
  "Ervaren instructeurs",
  "CBR-praktijkexamen",
  "Schakel of automaat lessen",
  "Flexibele lestijden",
  "Geen inschrijfgeld",
  "Vrijblijvende proefles",
] as const;

const HERO_TRUST_POINTS = [
  "Transparante prijzen — geen inschrijfgeld",
  "Losse lessen of rijlespakketten, met optie inclusief CBR-praktijkexamen",
  "Schakel en automaat: dezelfde pakkettarieven",
] as const;

const trialLessonSteps = [
  {
    title: "Plan je proefles",
    body: "Je start bij ons met een proefles. Via de website kies je eenvoudig een datum en tijdstip dat bij je past. Tip: populaire momenten zitten snel vol. Je theoriecertificaat is nog niet nodig; dat regel je voordat je praktijkexamen gepland wordt.",
  },
  {
    title: "Bevestiging via WhatsApp of e-mail",
    body: "Na je aanvraag ontvang je een bericht met een bevestigingslink. Zodra je bevestigt, staat je proefles definitief in de agenda.",
  },
  {
    title: "We halen je thuis op",
    body: "Op de afgesproken dag word je opgehaald door een instructeur. Tijdens de proefles maak je rustig kennis met de bediening en basisvaardigheden zoals sturen, remmen en (bij schakel) koppelen. Daarna zetten we je weer thuis af.",
  },
  {
    title: "Persoonlijk lesadvies",
    body: "Na afloop krijg je een eerlijk, persoonlijk advies over het aantal lessen dat waarschijnlijk bij jouw tempo past. Zo weet je precies waar je aan toe bent en werk je gericht toe naar je praktijkexamen.",
  },
] as const;

export default async function TarievenPage() {
  const site = await getSiteConfig();
  const { packages, extras, lessonPriceLabel } = site;

  return (
    <>
      <Section className="pt-12 pb-14 md:pt-16 md:pb-20">
        <FadeIn>
          <div className="border-border/80 from-muted/50 via-background to-background relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-sm sm:p-8 md:rounded-3xl md:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-[min(28rem,70vw)] rounded-full bg-primary/[0.06] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-16 size-[min(22rem,55vw)] rounded-full bg-primary/[0.04] blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
              <div className="lg:col-span-7">
                <span className="text-primary mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                  Tarieven
                </span>
                <h1 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:max-w-[18ch]">
                  Betaalbare rijlessen in Utrecht
                </h1>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
                  Je wilt niet te veel betalen voor het halen van je rijbewijs. Daarom bieden wij
                  scherpe tarieven voor losse rijlessen en pakketten — duidelijk en zonder
                  inschrijfgeld.
                </p>
                <ul className="mt-8 max-w-xl space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                  {HERO_TRUST_POINTS.map((t) => (
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
              </div>

              <div className="flex lg:col-span-5 lg:justify-end">
                <div className="bg-card border-primary/25 h-full w-full max-w-md rounded-2xl border p-6 shadow-md ring-1 ring-primary/10 sm:p-8 lg:sticky lg:top-28 lg:max-w-none lg:self-start xl:p-9">
                  <p className="text-primary text-sm font-semibold tracking-wide uppercase">
                    Losse rijles
                  </p>
                  <p className="font-heading text-foreground mt-3 text-4xl font-semibold tabular-nums tracking-tight md:text-[2.75rem]">
                    {lessonPriceLabel}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm font-medium">
                    per les · 60 minuten
                  </p>
                  <p className="text-muted-foreground mt-5 text-sm leading-relaxed md:text-base">
                    Neem een vrijblijvende intake / proefles. Daarna geven we je een eerlijk
                    advies over de voortzetting van je rijles en een schema dat je nodig zult hebben
                    voor het behalen van je rijbewijs.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row xl:flex-wrap">
                    <Button size="lg" className="w-full sm:w-auto lg:w-full xl:w-auto xl:min-w-[12rem]" asChild>
                      <Link href="/contact">Vrijblijvende proefles aanvragen</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto lg:w-full xl:w-auto xl:min-w-[12rem]"
                      asChild
                    >
                      <Link href="/contact">Vraag een adviesgesprek</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-muted/40 pt-12 pb-16 md:pt-14 md:pb-24">
        <SectionHeading
          eyebrow="Pakketten"
          title="Rijlespakketten"
          description="Je kunt bij ons losse rijlessen in Utrecht én rijlespakketten aanschaffen. Alle pakketten zijn voor schakel en automaat rijlessen."
        />

        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((p, idx) => (
            <FadeIn key={p.name} delay={idx * 0.05}>
              <article
                className={
                  p.highlight
                    ? "border-primary bg-card relative flex h-full flex-col rounded-2xl border-2 p-6 shadow-md ring-1 ring-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-7"
                    : "bg-card border-border flex h-full flex-col rounded-2xl border p-6 shadow-sm ring-1 ring-black/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md dark:ring-white/[0.05] sm:p-7"
                }
              >
                {p.highlight ? (
                  <span className="bg-primary text-primary-foreground absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold shadow-sm sm:left-6 sm:translate-x-0">
                    Meest gekozen
                  </span>
                ) : null}

                <div className="flex flex-1 flex-col pt-1">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{p.hours} lesuren</p>

                  <p className="mt-6">
                    <span className="font-heading text-foreground text-3xl font-semibold tabular-nums">
                      € {p.price}
                    </span>
                  </p>

                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    <li className="flex gap-2">
                      <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                      <span>{p.hours} lesuren</span>
                    </li>
                    {packageFeatures.map((line) => (
                      <li key={line} className="flex gap-2">
                        <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="mt-7 w-full" asChild>
                    <Link href="/contact">Start met proefles</Link>
                  </Button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10">
          <div className="bg-card border-border flex flex-col gap-4 rounded-2xl border p-6 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.05] sm:flex-row sm:items-start sm:gap-5 sm:p-7">
            <div className="bg-primary/12 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
              <Clock className="size-5 shrink-0" aria-hidden />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <strong className="text-foreground font-semibold">Lestijden:</strong> bij ons duurt één
              rijles 60 minuten. Het is ook mogelijk om te vermeerderen voor 90 of 120 minuten, maar
              dat moet dan wel overlegd worden.
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section className="border-border/60 border-y bg-muted/40 pt-12 pb-16 md:pt-16 md:pb-24">
        <FadeIn className="mx-auto max-w-3xl lg:max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card px-6 py-8 shadow-md ring-1 ring-black/[0.04] sm:px-8 sm:py-10 md:px-10 md:py-11 dark:ring-white/[0.06]">
            <div
              className="pointer-events-none absolute -top-28 right-[-4rem] size-[18rem] rounded-full bg-primary/[0.055] blur-3xl md:size-[22rem]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-20 size-[14rem] rounded-full bg-muted-foreground/[0.06] blur-3xl"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl text-center lg:max-w-3xl">
              <p className="text-primary mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="size-3.5 shrink-0" aria-hidden strokeWidth={2.5} />
                Proefles
              </p>
              <h2 className="text-foreground text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Proefles? Zo werkt het
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-base leading-relaxed md:text-lg">
                In vier stappen van aanvraag naar een helder plan. Laagdrempelig, persoonlijk en
                zonder gedoe.
              </p>
            </div>

            <div className="relative mx-auto mt-10 max-w-2xl md:mt-12 lg:max-w-none lg:pb-3">
              <ol className="space-y-0">
                {trialLessonSteps.map((step, idx) => {
                  const isLast = idx === trialLessonSteps.length - 1;
                  return (
                    <li key={step.title} className="flex gap-5 md:gap-7">
                      <div className="flex w-[3.25rem] shrink-0 flex-col items-center self-stretch sm:w-[3.75rem]">
                        <div
                          className="bg-primary text-primary-foreground relative z-[1] flex size-11 items-center justify-center rounded-2xl text-sm font-bold shadow-md ring-[5px] ring-card sm:size-12 sm:text-base"
                          aria-hidden
                        >
                          {idx + 1}
                        </div>
                        {!isLast ? (
                          <div
                            className="from-primary/50 via-primary/15 to-muted-foreground/40 mt-3 flex min-h-[1.75rem] w-[3px] flex-1 rounded-full bg-gradient-to-b md:mt-4"
                            aria-hidden
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1 pt-1 sm:pt-1.5">
                        <div className="border-border/80 bg-muted/35 rounded-2xl border px-5 py-5 shadow-[0_1px_0_rgb(255_255_255/0.04)_inset] transition-[box-shadow,transform] hover:shadow-md sm:px-6 sm:py-6 md:rounded-3xl dark:shadow-[0_1px_0_rgb(255_255_255/0.04)_inset]">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <h3 className="text-foreground text-base font-semibold leading-snug sm:text-lg">
                              {step.title}
                            </h3>
                            {!isLast ? (
                              <span className="text-muted-foreground inline-flex shrink-0 items-center gap-0.5 text-[11px] font-medium uppercase tracking-wider opacity-75 max-sm:hidden">
                                <ArrowRight className="size-3" aria-hidden />
                                Stap {idx + 2}
                              </span>
                            ) : null}
                          </div>
                          <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:mt-3 sm:text-[0.9375rem]">
                            {step.body}
                          </p>
                        </div>
                        {!isLast ? (
                          <div className="h-7 shrink-0 sm:h-9" aria-hidden />
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="border-border relative mt-4 flex flex-col items-stretch gap-3 border-t border-dashed pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 md:mt-6 md:pt-10">
              <Button size="lg" className="w-full min-w-[12rem] sm:w-auto sm:min-w-0" asChild>
                <Link href="/contact">Proefles aanvragen</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full min-w-[12rem] sm:w-auto sm:min-w-0"
                asChild
              >
                <Link href="/veelgestelde-vragen">Bekijk veelgestelde vragen</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="py-14 md:py-24">
        <SectionHeading
          title="Losse diensten en examens"
          description="Handig als aanvulling op je rijopleiding, of als je iets los wilt afnemen."
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">
          {extras.map((item, idx) => (
            <FadeIn key={item.title} delay={idx * 0.03} className="h-full">
              <article className="bg-card border-border flex h-full flex-col rounded-2xl border p-6 shadow-sm ring-1 ring-black/[0.03] transition-shadow hover:shadow-md dark:ring-white/[0.05] sm:p-7">
                <div className="border-border flex flex-wrap items-start justify-between gap-3 border-b pb-4">
                  <h3 className="text-foreground min-w-0 flex-1 text-base font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1 text-xs font-semibold tabular-nums">
                    {item.priceLabel}
                  </span>
                </div>
                <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                  {item.description}
                </p>
                {item.title === "Examengarantie" ? (
                  <Button variant="outline" className="mt-6 w-full" asChild>
                    <Link href="/contact">Contact opnemen</Link>
                  </Button>
                ) : null}
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-border/60 border-y bg-muted/40 py-14 md:py-24">
        <SectionHeading
          eyebrow="Belangrijk"
          title="Voorwaarden & prijsinformatie"
          description="We houden het graag helder. Hieronder de belangrijkste punten."
        />

        <FadeIn className="mx-auto mt-12 max-w-5xl">
          <div className="bg-card border-border overflow-hidden rounded-2xl border shadow-md ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
            <div className="border-border flex flex-col gap-2 border-b bg-muted/30 px-6 py-5 sm:flex-row sm:items-center sm:gap-3 sm:px-8">
              <div className="bg-primary/12 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                <ShieldCheck className="size-5" aria-hidden />
              </div>
              <div>
                <p className="text-foreground font-semibold">Prijsafspraken in het kort</p>
                <p className="text-muted-foreground text-sm">
                  Zo weet je waar je aan toe bent vóór je start.
                </p>
              </div>
            </div>
            <ul className="grid gap-x-10 gap-y-3 p-6 text-sm leading-relaxed sm:grid-cols-2 sm:p-8">
              <li className="flex gap-2">
                <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                <span>Prijswijzigingen en drukfouten voorbehouden.</span>
              </li>
              <li className="flex gap-2">
                <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                <span>Alle pakketten zijn inclusief 21% BTW.</span>
              </li>
              <li className="flex gap-2">
                <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                <span>Alle prijzen zijn voor schakel en automaat rijlessen.</span>
              </li>
              <li className="flex gap-2">
                <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                <span>Door inflatie kunnen prijzen tussentijds worden aangepast.</span>
              </li>
              <li className="flex gap-2 sm:col-span-2">
                <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  Op al onze prijzen en diensten zijn onze{" "}
                  <Link
                    href="/algemene-voorwaarden"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Algemene voorwaarden
                  </Link>{" "}
                  van toepassing.
                </span>
              </li>
              <li className="flex gap-2 sm:col-span-2">
                <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  Indien je niet {CANCELLATION_HOURS} uur van tevoren afbelt wordt de les in rekening
                  gebracht.
                </span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </Section>

      <Section className="py-14 md:py-20">
        <FadeIn>
          <div className="border-border/80 from-muted/40 via-background to-background relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-sm sm:p-8 md:rounded-3xl md:p-10 lg:p-11">
            <div
              className="pointer-events-none absolute top-1/2 right-0 size-[min(20rem,50vw)] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/[0.07] blur-3xl"
              aria-hidden
            />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
              <div className="lg:col-span-5">
                <span className="text-primary mb-3 inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide uppercase">
                  <Zap className="size-4 shrink-0" aria-hidden />
                  Snel afrijden?
                </span>
                <p className="font-heading text-foreground text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl">
                  2–3{" "}
                  <span className="text-muted-foreground text-[0.42em] font-medium tracking-normal">
                    weken
                  </span>
                </p>
                <p className="text-muted-foreground mt-3 text-base font-medium leading-snug">
                  Gemiddelde doorlooptijd richting CBR-praktijkexamen
                </p>
              </div>
              <div className="lg:col-span-7">
                <h2 className="text-foreground text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                  Praktijkexamen meestal binnen twee tot drie weken
                </h2>
                <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                  Bij Rijschool Vlam krijg je de mogelijkheid om snel je rijbewijs te halen. De
                  wachttijd voor een praktijkexamen voor de personenauto bedraagt ca. 2–3 weken. Als je
                  geschikt bent bevonden voor een spoedopleiding of onverhoopt een herexamen moet doen,
                  hoef je dus niet lang te wachten.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button size="lg" asChild>
                    <Link href="/contact">Plan je proefles</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/spoedcursus">Bekijk spoedcursus</Link>
                  </Button>
                </div>
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
