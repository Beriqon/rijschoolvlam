import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FadeIn } from "@/components/site/fade-in";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section, SectionHeading } from "@/components/site/section";
import { BIJZONDERE_VERRICHTING_ITEMS } from "@/lib/bijzondere-verrichtingen-data";
import { withCanonical } from "@/lib/metadata";

const HERO_POINTS = [
  "Twee afgebakende manoeuvres tijdens je CBR-praktijkexamen",
  "In de les rustig opbouwen — afgestemd op jouw tempo",
  "Met een tussentijdse toets kans op vrijstelling voor wat je al voldoende beheerst",
] as const;

export const metadata: Metadata = withCanonical("/bijzondere-verrichtingen", {
  title: "Bijzondere verrichtingen — Rijschool Vlam Utrecht",
  description:
    "Twee bijzondere verrichtingen op het CBR-praktijkexamen: parkeren, keren, helling, voertuigcontrole en routes zoals de Turbo-rotonde. Uitleg per onderdeel — met ruimte voor illustraties.",
});

export default function BijzondereVerrichtingenPage() {
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
                  Praktijkexamen
                </span>
                <h1 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:max-w-[20ch]">
                  Bijzondere verrichtingen
                </h1>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
                  Tijdens het praktijkexamen voer je twee bijzondere verrichtingen uit. Op deze
                  pagina zetten we de manoeuvres en controles op een rij — straks met tekeningen
                  en foto’s per onderdeel.
                </p>
                <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed">
                  Bijzondere verrichtingen zijn de korte, afgebakende oefeningen waarmee je laat
                  zien dat je de auto gecontroleerd kunt manoeuvreren en het voertuig kent. Je
                  instructeur bouwt ze stap voor stap in je lessen in, afgestemd op jouw tempo en
                  op wat het CBR tijdens jouw examen kan vragen.
                </p>
                <ul className="mt-8 max-w-xl space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                  {HERO_POINTS.map((t) => (
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
                <div className="bg-card border-border h-full w-full max-w-md rounded-2xl border p-6 shadow-md sm:p-8 lg:sticky lg:top-28 lg:max-w-none lg:self-start xl:p-9">
                  <p className="text-primary mb-2 text-sm font-semibold tracking-wide uppercase">
                    Tussentijdse toets
                  </p>
                  <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
                    Oefenen onder examendruk — mét kans op vrijstelling
                  </h2>
                  <div className="text-muted-foreground mt-5 space-y-4 text-base leading-relaxed">
                    <p>
                      Als je voor je praktijkexamen een tussentijdse toets (TTT) bij het CBR doet,
                      kun je onder voorwaarden{" "}
                      <strong className="text-foreground font-medium">
                        vrijstelling krijgen voor bijzondere verrichtingen
                      </strong>{" "}
                      die je tijdens die toets voldoende goed hebt uitgevoerd. Zo hoef je die
                      onderdelen tijdens het echte afrijden niet opnieuw te tonen.
                    </p>
                    <p>
                      De TTT is een proefexamen: je gaat niet echt zakken of slagen voor je
                      rijbewijs, maar je merkt hoe het voelt om geëxamineerd te worden.{" "}
                      <strong className="text-foreground font-medium">
                        Het grootste voordeel
                      </strong>{" "}
                      is dat je ervaart of je voldoende klaarstaat en zelfverzekerd rijdt;
                      vrijstelling is dan een prettige extra.
                    </p>
                    <p className="text-foreground pt-1 text-sm">
                      <Link
                        href="/veelgestelde-vragen"
                        className="text-primary font-medium underline underline-offset-4 hover:no-underline"
                      >
                        FAQ over de tussentijdse toets
                      </Link>
                      <span className="text-muted-foreground"> · </span>
                      <Link
                        href="/tarieven"
                        className="text-primary font-medium underline underline-offset-4 hover:no-underline"
                      >
                        Tarieven
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Overzicht"
          title="Verrichtingen"
          description="Onderdelen die tijdens je opleiding en op het examen aan bod kunnen komen. Klik op een kaart voor uitleg, illustraties en vaak ook een instructievideo. Op het overzicht blijven anker-links werken voor diepe verwijzingen."
          className="max-w-4xl"
        />

        <FadeIn className="mx-auto mt-14 max-w-7xl md:mt-16">
          <ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {BIJZONDERE_VERRICHTING_ITEMS.map((item) => {
              const galleryFirst = item.imageGallery?.[0];
              const thumbSrc = item.cardImageSrc ?? item.imageSrc ?? galleryFirst?.src;
              const thumbAlt = item.imageAlt ?? galleryFirst?.alt ?? item.title;
              const cardFit = item.cardImageFit ?? "contain";
              return (
              <li key={item.id} id={item.id} className="scroll-mt-28 md:scroll-mt-32">
                <Link
                  href={`/bijzondere-verrichtingen/${item.id}`}
                  className="focus-visible:ring-ring group block h-full rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
                >
                  <article className="border-border bg-card ring-border/40 flex h-full flex-col overflow-hidden rounded-2xl border text-left shadow-sm ring-1 transition-[box-shadow,transform,border-color,ring-color] group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-lg group-hover:ring-primary/10">
                    <div className="relative">
                      {thumbSrc ? (
                        <div className="relative aspect-[4/3] bg-muted">
                          <Image
                            src={thumbSrc}
                            alt={thumbAlt}
                            fill
                            className={
                              cardFit === "cover"
                                ? "object-cover transition-opacity group-hover:opacity-95"
                                : "object-contain p-1.5 transition-opacity group-hover:opacity-95 sm:p-2"
                            }
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="text-muted-foreground flex aspect-[4/3] min-h-[7rem] flex-col items-center justify-center gap-2 border-b border-dashed bg-muted/35 px-3 text-center text-xs leading-snug transition-colors group-hover:bg-muted/45">
                          <span className="text-[11px] font-medium uppercase tracking-wide">
                            Illustratie
                          </span>
                          <span>Foto / tekening volgt</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h4 className="text-foreground group-hover:text-primary text-base font-semibold leading-snug transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                        {item.teaser}
                      </p>
                      <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                        Lees meer
                        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            );
            })}
          </ul>
        </FadeIn>

        <FadeIn className="mt-14 flex justify-center md:mt-16">
          <Button size="lg" asChild>
            <Link href="/contact">Vraag een proefles aan</Link>
          </Button>
        </FadeIn>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}
