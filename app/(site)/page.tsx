import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Car,
  Check,
  Gauge,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FaqJsonLd } from "@/components/site/faq-json-ld";
import { FadeIn } from "@/components/site/fade-in";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { ReviewsSection } from "@/components/site/reviews-section";
import { ZoomableImage } from "@/components/site/zoomable-image";
import { Section, SectionHeading } from "@/components/site/section";
import {
  CANCELLATION_HOURS,
  CBR_UTRECHT,
  UTRECHT_AREAS,
} from "@/lib/constants";
import { getSiteConfig } from "@/lib/site-config";
import { HOME_FAQ_ITEMS } from "@/lib/home-faq-data";
import { withCanonical } from "@/lib/metadata";

export const metadata: Metadata = withCanonical("/", {
  title: {
    absolute: "Rijschool Utrecht | Haal snel en goedkoop je rijbewijs",
  },
  description:
    "Rijschool Vlam Utrecht: snel en betaalbaar je rijbewijs halen met kwalitatieve rijlessen, scherpe tarieven, hoog slagingspercentage en gratis proefles.",
});

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2000&q=80";

function ProseSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <FadeIn className={className}>
      <h2 className="font-heading text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <div className="text-muted-foreground mt-5 space-y-4 text-base leading-relaxed">
        {children}
      </div>
    </FadeIn>
  );
}

function ProseBody({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`text-muted-foreground space-y-4 text-base leading-relaxed ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export default async function HomePage() {
  const site = await getSiteConfig();

  return (
    <>
      <FaqJsonLd items={HOME_FAQ_ITEMS} />

      <section className="relative min-h-[min(100vh,52rem)] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Rijles Utrecht bij Rijschool Vlam"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/20" />
        <div className="relative mx-auto flex min-h-[min(100vh,52rem)] max-w-7xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
          <FadeIn className="max-w-3xl">
            <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
              Gratis proefles! {site.phoneDisplay}
            </p>
            <h1 className="font-sans text-foreground text-balance text-[clamp(2.1875rem,1.45rem+2.6vw,3.75rem)] font-semibold leading-[1.07] tracking-[-0.022em] sm:leading-[1.06] lg:tracking-[-0.028em]">
              Rijschool Utrecht Vlam
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
              Wil je snel en betaalbaar rijles volgen bij de beste rijschool in Utrecht? Dan is
              rijschool Vlam dé beste rijopleider voor jou! Bij Rijschool Vlam haal je jouw
              rijbewijs via een doelgerichte methode die bewezen effectief is.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild>
                <Link href={site.primaryCta.href}>{site.primaryCta.text}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${site.phoneE164}`}>Bel {site.phoneDisplay}</a>
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
              title: "Betrouwbaar en Professioneel",
              text: "De beste rijschool van Utrecht",
            },
            {
              icon: Gauge,
              title: "Hoog Slagingspercentage",
              text: "De beste rijschool van Utrecht",
            },
            {
              icon: Users,
              title: "Persoonlijke Aandacht",
              text: "Goedkoopste rijschool Utrecht",
            },
            {
              icon: Car,
              title: "Schakel, automaat of elektrisch",
              text: "Rijlessen in schakel, automaat of elektrische lesauto — je oefent in het type auto dat bij jou past.",
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
        <div className="mx-auto max-w-4xl">
          <ProseBody>
            <p>
              Daarom combineren wij kwalitatieve rijlessen met zeer scherpe tarieven, zodat je
              verantwoord én voordelig de weg op gaat. Bovendien is autorijschool Vlam al jarenlang
              een vertrouwde naam voor professionele rijlessen in Utrecht en omgeving. Onze
              rijopleiding rust op drie sterke pijlers: een hoog slagingspercentage, jarenlange
              expertise en volledige transparantie in kosten. Hierdoor maken wij kwalitatief
              rijonderwijs toegankelijk voor iedereen. Heb je persoonlijk advies nodig? Neem dan
              gerust contact met ons op, want wij vertellen je graag meer over onze werkwijze als
              erkende autorijschool in Utrecht. Daarnaast kun je bij ons terecht voor diverse
              lespakketten, duidelijke tarieven en de geduldige, deskundige aanpak van onze
              instructeurs.
            </p>
          </ProseBody>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <ProseSection title="Rijlessen op maat in Utrecht">
            <p>
              Jouw weg naar het rijbewijs is uniek. Daarom biedt autorijschool Vlam in Utrecht
              rijlessen die volledig meebewegen met jouw leerproces. Of je nu kiest voor individueel
              afgestemde autorijlessen, een resultaatgerichte spoedcursus of uitgebreide
              theoriebegeleiding: wij zorgen altijd voor een veilige en prettige leeromgeving.
              Doordat onze methode wordt afgestemd op jouw persoonlijke vaardigheden, garanderen
              wij een efficiënte rijopleiding van de hoogste kwaliteit. Zo haal je het maximale uit
              iedere rijles.
            </p>
          </ProseSection>
          <ProseSection title="Geduldige begeleiding en jarenlange ervaren rijinstructeurs">
            <p>
              Bij rijschool Utrecht stap je in de auto bij een team van gecertificeerde
              professionals met een passie voor verkeersveiligheid. Onze instructeurs combineren
              niet alleen jarenlange ervaring, maar ook een empathische en rustige didactiek. Omdat
              leren autorijden spannend kan zijn, bieden wij een veilige leeromgeving waarin geduld
              centraal staat. Hierdoor bouwen we tijdens jouw rijlessen in Utrecht stap voor stap aan
              jouw zelfvertrouwen op de weg.
            </p>
          </ProseSection>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.45fr] lg:gap-16">
          <FadeIn>
            <p className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
              RIJSCHOOL IN HEEL UTRECHT
            </p>
            <h2 className="text-foreground text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              <span className="block">Waar je ook woont</span>
              <span className="block">in Utrecht,</span>
              <span className="text-primary block">wij halen je op.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="border-border overflow-hidden rounded-2xl border bg-card shadow-sm">
              <ZoomableImage
                src="/site/utrechtmappins.png"
                alt="Kaart: Rijschool Vlam in heel Utrecht — wij halen je op in alle wijken."
                width={1536}
                height={1024}
                className="h-auto w-full"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-muted/40 py-14 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-heading text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
              Rijschool in heel Utrecht
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Wij geven rijles in o.a.:
            </p>
            <ul className="text-muted-foreground mt-4 grid gap-2 sm:grid-cols-2">
              {UTRECHT_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm">
                  <Check className="text-primary size-4 shrink-0" aria-hidden />
                  {area}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 text-base leading-relaxed">
              Waar je ook woont in Utrecht, wij halen je gewoon op.
            </p>
          </FadeIn>
          <ProseSection title="Lessen op de momenten dat het jou uitkomt">
            <p>
              Bij Rijschool Utrecht Vlam staat jouw gemak voorop. Daarom halen en brengen wij je op
              elke gewenste locatie in Utrecht. Of het nu het Centraal Station, je school, je werk
              of gewoon thuis is: wij regelen het. Daarnaast bieden wij flexibele lestijden, zodat
              rijlessen perfect passen in een druk leven. Of je nu overdag, &apos;s avonds of in het
              weekend wilt lessen, samen stellen we een efficiënt lesrooster op maat samen.
            </p>
          </ProseSection>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <ProseSection title="Bewezen succes met hoog slagingspercentage en tevreden leerlingen">
            <p>
              Bij Autorijschool Utrecht geloven we in eerlijkheid vanaf de eerste dag. Daarom
              hanteren wij duidelijke tarieven zonder verborgen kosten. Bovendien bieden wij diverse
              rijlespakketten aan die aansluiten bij verschillende budgetten en leerbehoeften.
              Dankzij onze uitstekende prijs-kwaliteitverhouding combineren wij hoogwaardige
              begeleiding met goedkope prijzen. Bekijk daarom ons actuele{" "}
              <Link
                href="/tarieven"
                className="text-primary font-medium underline underline-offset-4 hover:no-underline"
              >
                tarieven overzicht
              </Link>{" "}
              en kies het pakket dat het beste bij jou past.
            </p>
          </ProseSection>
          <ProseSection title="Duidelijke tarieven en rijlespakketten zonder verrassingen">
            <p>
              Vertrouwen is de basis van elke geslaagde rijopleiding. Dankzij de deskundige
              begeleiding van onze ervaren instructeurs behalen leerlingen bij onze autorijschool
              sneller hun rijbewijs, wat terug te zien is in ons hoge slagingspercentage. Onze
              voormalige leerlingen waarderen vooral de geduldige en professionele aanpak. Benieuwd
              naar hun ervaringen? Bekijk de vele positieve reviews en aanbevelingen van
              oud-leerlingen bevestigen de kwaliteit van onze rijopleiding.
            </p>
            <p className="text-foreground font-medium">Rijschool Utrecht Vlam</p>
          </ProseSection>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="bg-card border-border flex h-full flex-col rounded-xl border p-8 shadow-sm">
              <BookOpen className="text-primary size-9" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold">Theoriecursus</h3>
              <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                Klassikaal of online: verkeersregels begrijpelijk en efficiënt uitgelegd voor het
                CBR-theorie-examen.
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
                Snel je rijbewijs? Na de proefles stellen we een intensief schema op waarbij je
                meerdere keren per week lest.
              </p>
              <Button variant="outline" className="mt-6 w-fit" asChild>
                <Link href="/spoedcursus">Meer over spoedcursus</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      <ReviewsSection />

      <GraduatePhotosSection />

      <Section className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProseSection title="Theoriecursussen voor maximale slagingskans">
            <p>
              Een sterke theoretische basis is essentieel voor veilig rijden. Daarom bieden wij
              zowel klassikale als online theoriecursussen aan. Onze aanpak is erop gericht om
              verkeersregels begrijpelijk en efficiënt uit te leggen. Hierdoor ga je zelfverzekerd
              het CBR-examen in én vergroot je direct je kans om in één keer te slagen.
            </p>
            <Button variant="outline" className="mt-6 w-fit" asChild>
              <Link href="/theorieles">Meer over theorieles</Link>
            </Button>
          </ProseSection>
          <ProseSection title="Volledige begeleiding tot het rijexamen">
            <p>
              Een geslaagd rijexamen begint met een goede voorbereiding. Daarom begeleiden wij je
              stap voor stap door het volledige traject. Wij regelen de examenaanvraag en stellen een
              persoonlijk trainingsplan op dat aansluit bij de exameneisen. Zo ga je goed voorbereid
              en zonder onnodige spanning het praktijkexamen tegemoet.
            </p>
            <Button variant="outline" className="mt-6 w-fit" asChild>
              <Link href="/spoedcursus">Meer over spoedcursus</Link>
            </Button>
          </ProseSection>
        </div>
      </Section>

      <Section className="bg-muted/40 py-14 md:py-20">
        <FadeIn>
          <h2 className="font-heading text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
            Voordelen Rijschool Utrecht
          </h2>
          <ProseBody className="mt-5 max-w-3xl">
            <p>
              Wil je een rijles of theoriecursus volgen, dan kies je bij ons bewust voor zekerheid
              en expertise. Allereerst werken wij uitsluitend met ervaren instructeurs, waardoor
              onze lessen standaard voldoen aan de hoogste kwaliteitsnormen. Bovendien geloven wij
              dat een professionele rijopleiding voor iedereen toegankelijk moet zijn. Daarom betaal
              je bij ons slechts {site.lessonPriceLabel} voor een volledig lesuur van 60 minuten.
              Hiermee behoren wij tot de goedkoopste rijscholen in Utrecht, terwijl wij geen
              concessies doen aan de kwaliteit van jouw opleiding.
            </p>
          </ProseBody>
          <ul className="text-muted-foreground mt-8 max-w-2xl space-y-3 text-base leading-relaxed">
            <li className="flex gap-3">
              <Check className="text-primary mt-1 size-5 shrink-0" aria-hidden />
              <span>
                <strong className="text-foreground font-medium">Scherpe tarieven</strong>: Hoogwaardige
                rijlessen tegen een eerlijke prijs.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="text-primary mt-1 size-5 shrink-0" aria-hidden />
              <span>
                <strong className="text-foreground font-medium">Kosteloos inschrijven</strong>: Start
                direct zonder extra administratieve kosten.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="text-primary mt-1 size-5 shrink-0" aria-hidden />
              <span>
                <strong className="text-foreground font-medium">Bewezen succes</strong>: Een hoog
                CBR-slagingspercentage door onze doelgerichte methode.
              </span>
            </li>
          </ul>
          <ProseBody className="mt-8 max-w-3xl">
            <p>
              Bij Rijschool Utrecht bouw je bovendien een vertrouwensband op met je vaste
              rij-instructeur, waardoor je leert in een veilige en vertrouwde omgeving. Naast losse
              rijlessen bieden wij een breed scala aan zorgvuldig samengestelde lespakketten aan.
              Deze pakketten zijn zo opgebouwd dat je stap voor stap wordt voorbereid op het
              praktijkexamen. Heb je weinig tijd? Dan kies je bijvoorbeeld voor onze intensieve
              spoedcursus, zodat je snel, verantwoord en zelfverzekerd je rijbewijs kunt behalen.
            </p>
            <p>
              <strong className="text-foreground font-medium">Kortom</strong>: bij Rijschool Vlam
              kies je voor kwaliteit, duidelijkheid en resultaat.
            </p>
          </ProseBody>
        </FadeIn>
      </Section>

      <Section className="bg-muted/40">
        <SectionHeading
          eyebrow="Examen"
          title="Praktijkexamen in Utrecht"
          description={`We vragen je examen aan bij het CBR (${CBR_UTRECHT.street}). Je oefent de routes die relevant zijn voor je examen.`}
        />
        <FadeIn className="mx-auto mt-8 max-w-4xl text-center">
          <p className="text-muted-foreground mx-auto text-sm leading-relaxed">
            Tip: machtig ons tijdig via Mijn CBR met ons rijschoolnummer, zodat we je examen kunnen
            plannen en begeleiden. Lessen tot {CANCELLATION_HOURS} uur van tevoren kosteloos
            verplaatsen of annuleren.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
            Gratis proefles of persoonlijk advies?
          </h2>
          <p className="text-muted-foreground mt-5 text-base leading-relaxed">
            Wil je direct starten of eerst meer informatie? Neem dan vrijblijvend contact op met
            autorijschool Vlam Utrecht voor een gratis proefles of persoonlijk advies. Je bereikt ons
            eenvoudig via het contactformulier of telefonisch op {site.phoneDisplay}.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/contact">Neem contact op</Link>
          </Button>
        </FadeIn>
      </Section>

      <Section className="bg-muted/40">
        <SectionHeading
          eyebrow="FAQ"
          title="Veelgestelde vragen over rijschool Utrecht"
          description="Antwoorden op de meest gestelde vragen. Bekijk alle vragen op de FAQ-pagina."
        />
        <FadeIn className="mt-10">
          <FaqAccordion items={HOME_FAQ_ITEMS} />
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
