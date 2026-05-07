import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FadeIn } from "@/components/site/fade-in";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { LightboxImage } from "@/components/site/lightbox-image";
import { Section } from "@/components/site/section";
import {
  BIJZONDERE_VERRICHTING_ITEMS,
  getBijzondereVerrichtingBySlug,
  type BijzondereVerrichtingItem,
  type VerrichtingBodyBlock,
} from "@/lib/bijzondere-verrichtingen-data";
import { cn } from "@/lib/utils";

function VerrichtingBody({
  blocks,
  youtubeId,
  videoCaption,
}: {
  blocks: VerrichtingBodyBlock[];
  youtubeId?: string;
  videoCaption: string;
}) {
  return (
    <div className="space-y-5 md:space-y-6">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p
                key={i}
                className="text-muted-foreground max-w-prose text-[1.02rem] leading-[1.7] md:text-[1.0625rem] md:leading-relaxed"
              >
                {block.text}
              </p>
            );
          case "float-image":
            return (
              <figure
                key={i}
                className="not-prose my-3 md:clear-right md:float-right md:mt-0 md:ml-7 md:-mb-6 md:w-[min(21rem,40%)]"
              >
                <div className="border-border bg-muted/40 overflow-hidden rounded-2xl border shadow-sm ring-1 ring-black/[0.04] md:rounded-3xl">
                  <LightboxImage
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="(max-width: 768px) 94vw, 360px"
                    className="h-auto w-full"
                  />
                </div>
              </figure>
            );
          case "p-image":
            return (
              <div
                key={i}
                className="grid items-start gap-4 md:grid-cols-[1.6fr_1fr] md:gap-6"
              >
                <div className="max-w-prose space-y-4 text-[1.02rem] leading-[1.7] text-muted-foreground md:text-[1.0625rem] md:leading-relaxed">
                  {block.text
                    .split("\n\n")
                    .filter(Boolean)
                    .map((t, j) => (
                      <p key={j}>{t}</p>
                    ))}
                </div>
                <figure className="not-prose md:pt-6">
                  <div className="border-border bg-muted/40 w-full overflow-hidden rounded-2xl border shadow-sm ring-1 ring-black/[0.04] md:rounded-3xl">
                    <LightboxImage
                      src={block.src}
                      alt={block.alt}
                      width={block.width}
                      height={block.height}
                      sizes="(max-width: 768px) 94vw, 360px"
                      className="h-auto w-full"
                    />
                  </div>
                </figure>
              </div>
            );
          case "h2": {
            const isFirstHeading = !blocks.slice(0, i).some((x) => x.kind === "h2");
            return (
              <h2
                key={i}
                className={cn(
                  "font-heading text-foreground relative scroll-mt-28 text-[1.35rem] font-semibold tracking-tight md:text-2xl md:leading-snug",
                  "pl-4 md:pl-5",
                  "before:bg-primary before:absolute before:top-[0.3em] before:left-0 before:h-[1.15em] before:w-[3px] before:rounded-full",
                  isFirstHeading
                    ? "mt-10 pt-2 md:mt-12 md:pt-3"
                    : "border-border/65 mt-12 border-t pt-10 md:mt-14 md:pt-12",
                )}
              >
                {block.text}
              </h2>
            );
          }
          case "h3":
            return (
              <h3
                key={i}
                className="text-foreground max-w-prose text-lg font-semibold tracking-tight md:text-xl"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul className="max-w-prose space-y-3.5 text-[1.02rem] leading-relaxed md:text-[1.0625rem]">
                {block.items.map((li, j) => (
                  <li key={`${i}-${j}`} className="text-muted-foreground flex gap-3.5">
                    <span
                      className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full shadow-[0_0_0_3px_var(--accent)]"
                      aria-hidden
                    />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={i} className="not-prose my-3">
                <div className="border-border bg-muted/40 mx-auto w-full max-w-xl overflow-hidden rounded-2xl border shadow-sm ring-1 ring-black/[0.04] md:rounded-3xl">
                  <LightboxImage
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="(max-width: 896px) 94vw, 640px"
                    className="h-auto w-full"
                  />
                </div>
              </figure>
            );
          case "image-row":
            return (
              <div
                key={i}
                className="not-prose mx-auto grid w-full max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
              >
                {block.images.map((img) => (
                  <figure key={img.src} className="m-0">
                    <div className="border-border bg-muted/40 overflow-hidden rounded-2xl border shadow-sm ring-1 ring-black/[0.04] md:rounded-3xl">
                      <LightboxImage
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(max-width: 768px) 46vw, (max-width: 1280px) 22vw, 240px"
                        className="h-auto w-full"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            );
          case "embed-youtube":
            if (!youtubeId) return null;
            return (
              <figure key={i} className="not-prose clear-both my-2">
                <div
                  className="border-border bg-foreground/[0.03] relative aspect-video w-full overflow-hidden rounded-2xl border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] ring-1 ring-primary/15 md:rounded-3xl"
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                    title={`Video: ${videoCaption}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <figcaption className="text-muted-foreground mt-3 text-center text-sm">
                  Praktijk: {videoCaption}
                </figcaption>
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function DetailFooter({ item }: { item: BijzondereVerrichtingItem }) {
  return (
    <div
      className={cn(
        "border-border relative mt-12 overflow-hidden rounded-2xl border p-6 shadow-md md:mt-14 md:rounded-3xl md:p-8",
        item.body
          ? "from-primary/[0.06] via-muted/40 to-muted/25 bg-gradient-to-br"
          : "bg-muted/45",
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/[0.08] blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="flex gap-3">
          <div className="bg-primary/15 text-primary shrink-0 rounded-xl p-2.5 ring-1 ring-primary/20">
            <Sparkles className="size-5" strokeWidth={2.25} aria-hidden />
          </div>
          <div>
            <p className="text-foreground font-heading text-lg font-semibold tracking-tight">
              {item.body ? "Oefenen in Utrecht?" : "Meer uitleg volgt"}
            </p>
            {!item.body ? (
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed md:text-base">
                Hier komt nog uitgebreidere uitleg, tips voor het examen en eventueel beeldmateriaal
                voor deze verrichting. De route staat vast; de inhoud vullen we later verder aan.
              </p>
            ) : (
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed md:text-base">
                Meer oefenen in het echte verkeer in Utrecht? Plan een proefles — we nemen deze route
                en verrichting rustig met je door.
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:items-end">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/contact">Vraag een proefles aan</Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href={`/bijzondere-verrichtingen#${item.id}`}>Naar overzicht</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BIJZONDERE_VERRICHTING_ITEMS.map((item) => ({ slug: item.id }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getBijzondereVerrichtingBySlug(slug);
  if (!item) {
    return {
      title: "Bijzondere verrichtingen — Rijschool Vlam Utrecht",
    };
  }

  return {
    title: `${item.title} — Bijzondere verrichtingen | Rijschool Vlam`,
    description: item.teaser,
  };
}

export default async function BijzondereVerrichtingDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const item = getBijzondereVerrichtingBySlug(slug);
  if (!item) notFound();

  const hasRichContent = Boolean(item.body?.length);

  /** Brede landschapsfoto (zoals motorcompartiment) past slecht naast tekst — vol onder de kop i.p.v. smalle kolom. */
  const iw = item.imageWidth;
  const ih = item.imageHeight;
  const wideLandscapeHero = Boolean(item.imageSrc && iw && ih && iw / ih >= 1.3);

  return (
    <>
      <Section className="pt-10 pb-10 md:pt-14 md:pb-14">
        <FadeIn className="mx-auto max-w-4xl lg:max-w-5xl">
          <Link
            href="/bijzondere-verrichtingen"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden strokeWidth={2.25} />
            Alle bijzondere verrichtingen
          </Link>

          <div className="border-border/80 from-muted/40 via-background to-background relative mt-8 overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-sm sm:p-8 md:mt-10 md:rounded-3xl md:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-[min(24rem,65vw)] rounded-full bg-primary/[0.07] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-20 size-[min(20rem,55vw)] rounded-full bg-primary/[0.035] blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start xl:gap-12">
              <div
                className={
                  wideLandscapeHero && item.imageSrc ? "lg:col-span-12" : "lg:col-span-7"
                }
              >
                <span className="text-primary mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                  Bijzondere verrichting
                </span>
                <h1 className="font-heading text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  {item.title}
                </h1>
                <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed lg:max-w-none">
                  {item.teaser}
                </p>
              </div>

              {item.imageSrc && !wideLandscapeHero ? (
                <div className="flex justify-center lg:col-span-5 lg:justify-end lg:pt-2">
                  <figure className="border-border bg-muted/40 w-full max-w-[min(100%,420px)] overflow-hidden rounded-2xl border p-3 shadow-md ring-1 ring-black/[0.04] sm:max-w-[min(100%,460px)] sm:p-4 md:rounded-3xl lg:max-w-none lg:p-5">
                    <LightboxImage
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.title}
                      width={item.imageWidth ?? 1200}
                      height={item.imageHeight ?? 800}
                      sizes="(max-width: 1024px) min(420px, 100vw), (max-width: 1280px) 28vw, 360px"
                      className="h-auto w-full rounded-xl md:rounded-2xl"
                      priority
                    />
                  </figure>
                </div>
              ) : item.imageGallery?.length ? (
                <div className="flex w-full flex-col gap-6 lg:col-span-5 lg:max-w-none lg:items-end lg:pt-2">
                  {item.imageGallery.map((img) => (
                    <figure
                      key={img.src}
                      className="border-border bg-muted/40 mx-auto w-full max-w-[min(100%,420px)] overflow-hidden rounded-2xl border p-3 shadow-md ring-1 ring-black/[0.04] sm:p-4 md:max-w-[min(100%,460px)] md:rounded-3xl lg:mx-0 lg:ml-auto lg:max-w-full lg:p-5"
                    >
                      <LightboxImage
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(max-width: 1024px) min(420px, 100vw), (max-width: 1280px) 28vw, 380px"
                        className="h-auto w-full rounded-xl md:rounded-2xl"
                        priority={img.src.endsWith(".webp")}
                      />
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>

            {item.imageSrc && wideLandscapeHero ? (
              <figure className="border-border bg-muted/40 relative mx-auto mt-10 w-full max-w-4xl overflow-hidden rounded-2xl border p-4 shadow-md ring-1 ring-black/[0.04] sm:mt-11 sm:p-5 md:max-w-none md:rounded-3xl xl:max-w-[min(100%,58rem)]">
                <LightboxImage
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.title}
                  width={item.imageWidth ?? 1200}
                  height={item.imageHeight ?? 800}
                  sizes="(max-width: 896px) 94vw, (max-width: 1280px) 92vw, 1024px"
                  className={cn(
                    "w-full rounded-xl md:rounded-2xl",
                    item.heroImageFit === "contain"
                      ? "h-auto object-contain"
                      : "h-[320px] object-cover md:h-[360px] lg:h-[420px]",
                  )}
                  priority
                />
              </figure>
            ) : null}
          </div>

          {hasRichContent ? (
            <article className="mt-10 sm:mt-12">
              <VerrichtingBody
                blocks={item.body!}
                youtubeId={item.youtubeId}
                videoCaption={item.title}
              />
            </article>
          ) : null}

          <DetailFooter item={item} />
        </FadeIn>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}
