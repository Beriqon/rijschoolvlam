import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CalendarRange, Check, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FadeIn } from "@/components/site/fade-in";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section } from "@/components/site/section";
import { withCanonical } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/site-config";

const THEORY_PACKAGE_FALLBACK_LABEL = "€160,-";

function formatTheoryTotalPrice(priceLabel: string): string {
  return priceLabel.startsWith("€") ? priceLabel.replace(/^€\s*/, "€ ") : priceLabel;
}

export const metadata: Metadata = withCanonical("/theorieles", {
  title: "Theoriecursus Utrecht — CBR-theorie-examen",
  description:
    "Theoriecursus Utrecht bij Rijschool Vlam: klassikaal of online, duidelijke uitleg en voorbereiding op het CBR-theorie-examen.",
});

const OEFENLINKS = [
  {
    label: "CBR: theorie-examen auto",
    href: "https://www.cbr.nl/nl/rijbewijs-halen/auto/theorie-examen-auto",
  },
  {
    label: "TheorieExamenOefenen.nl",
    href: "https://www.theorieexamenoefenen.nl/",
  },
  { label: "iTheorie", href: "https://itheorie.nl/auto/theorie-examen" },
  { label: "NuTheorie", href: "https://www.nutheorie.nl/" },
] as const;

export default async function TheorielesPage() {
  const site = await getSiteConfig();
  const theoryPriceLabel =
    site.extras.find((item) => item.title === "Theorie pakket")?.priceLabel ??
    THEORY_PACKAGE_FALLBACK_LABEL;
  const theoryPriceDisplay = formatTheoryTotalPrice(theoryPriceLabel);

  return (
    <>
      <Section className="pt-12 pb-16 md:pt-16 md:pb-24">
        <FadeIn className="grid gap-12 lg:grid-cols-[1fr,min(100%,20rem)] lg:gap-14 lg:items-start">
          <div>
            <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
              Theoriecursus Utrecht
            </p>
            <h1 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Theoriecursus + CBR-theorie-examen
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
              Twee lesdagen in één week: intensieve begeleiding, ezelsbruggetjes die blijven
              hangen — en aansluitend je officiële examen bij het CBR.
            </p>
            <ul className="text-muted-foreground mt-8 max-w-xl space-y-3 text-sm leading-relaxed md:text-base">
              {[
                "Volledige voorbereiding op het CBR-theorie-examen",
                "Heldere structuur, zodat je niet alleen leert voor het examen maar ook voor in de auto",
                "Examen zit bij de cursus inbegrepen",
              ].map((t) => (
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

          <aside className="bg-card border-primary/25 relative overflow-hidden rounded-2xl border-2 p-6 shadow-md md:p-7">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
              aria-hidden
            />
            <div className="relative">
              <p className="text-muted-foreground text-sm font-medium">Totaal voor cursus + examen</p>
              <p className="text-foreground mt-1 text-4xl font-semibold tracking-tight">
                {theoryPriceDisplay}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Twee lesdagen zoals hieronder beschreven. Geen verrassingen achteraf — het
                examen is inbegrepen.
              </p>
              <Button className="mt-6 w-full sm:w-auto" size="lg" asChild>
                <Link href="/contact">Vraag planning &amp; info aan</Link>
              </Button>
              <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
                Zie ook{" "}
                <Link
                  href="/tarieven"
                  className="text-primary font-medium underline underline-offset-4 hover:no-underline"
                >
                  tarieven
                </Link>{" "}
                voor het volledige overzicht.
              </p>
            </div>
          </aside>
        </FadeIn>

        <FadeIn className="mt-16 md:mt-20">
          <h2 className="text-foreground text-center text-xl font-semibold tracking-tight md:text-2xl">
            Zo ziet jouw week eruit
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed md:text-base">
            Eén week, twee dagen les — daarna meteen examen. Overzichtelijk en voorspelbaar.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            <div className="bg-card border-border relative rounded-2xl border p-6 shadow-sm md:p-8">
              <div className="text-primary mb-4 inline-flex items-center gap-2 text-sm font-semibold">
                <span className="bg-primary/15 text-primary flex size-9 items-center justify-center rounded-full">
                  <CalendarRange className="size-4" aria-hidden />
                </span>
                Dag 1
              </div>
              <h3 className="text-foreground text-lg font-semibold">8 uur theorie, compact en interactief</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                We nemen de stof in één volle dag door: verkeersregels, borden, voorrang en
                voorbeelden die aansluiten op wat je straks in de lesauto ziet.
              </p>
            </div>

            <div className="bg-card border-border relative rounded-2xl border p-6 shadow-sm md:p-8">
              <div className="text-primary mb-4 inline-flex items-center gap-2 text-sm font-semibold">
                <span className="bg-primary/15 text-primary flex size-9 items-center justify-center rounded-full">
                  <GraduationCap className="size-4" aria-hidden />
                </span>
                Dag 2
              </div>
              <h3 className="text-foreground text-lg font-semibold">4 uur herhaling — daarna examen</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                We herhalen de lastigste onderdelen en doen examengerichte oefeningen.{" "}
                <strong className="text-foreground font-medium">
                  Vervolgens ga je direct naar het CBR voor je theorie-examen.
                </strong>
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-12 md:mt-14">
          <div className="bg-muted/40 border-border flex flex-col gap-6 rounded-2xl border px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:py-8">
            <div className="flex gap-4">
              <span className="bg-background text-primary flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm">
                <BookOpen className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-foreground text-lg font-semibold">Wanneer start de volgende cursus?</h2>
                <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed md:text-[0.9375rem]">
                  We plannen cursussen op basis van aanmeldingen. Mail of bel ons voor de actuele
                  data — we reageren snel met de eerstvolgende mogelijkheden.
                </p>
              </div>
            </div>
            <Button size="lg" variant="outline" className="shrink-0 self-start sm:self-center" asChild>
              <Link href="/contact">Vraag de planning op</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn className="mt-14 md:mt-16">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-foreground text-lg font-semibold md:text-xl">
                Theorie en rijles combineren
              </h2>
              <div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed md:text-[0.9375rem]">
                <p>
                  Regels uit het boek krijgen pas echte kleur als je ze op straat tegenkomt —
                  bij kruispunten, borden en voorrang. Daarom helpen rijlessen parallel aan of
                  vlak ná je cursus enorm.
                </p>
                <p>
                  Zo koppel je ezelsbruggetjes uit de klas aan wat je onderweg ziet en blijft
                  het beter hangen tot na je rijbewijs.
                </p>
              </div>
            </div>
            <div className="border-border bg-card/80 lg:col-span-2 rounded-xl border p-6 shadow-sm">
              <h2 className="text-foreground text-lg font-semibold">Zelfstandig oefenen</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Handige plekken om alvast te oefenen (externe websites):
              </p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {OEFENLINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium underline underline-offset-4 transition-colors hover:text-foreground hover:no-underline"
                    >
                      {l.label}
                      <span className="sr-only"> (opent in nieuw tabblad)</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-12 flex justify-center md:mt-14">
          <Button size="lg" asChild>
            <Link href="/contact">Benieuwd? Neem contact op</Link>
          </Button>
        </FadeIn>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}
