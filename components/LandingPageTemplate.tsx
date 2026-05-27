import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";

import { FadeIn } from "@/components/site/fade-in";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { BLOG_CMS_CONTENT_CLASS } from "@/lib/cms/blog-html";
import type { LandingPage } from "@/lib/landing-pages-data";
import type { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function ActionButton({
  href,
  children,
  variant = "default",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Button asChild variant={variant} size="lg" className={className}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size="lg" className={className}>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    </Button>
  );
}

function RichText({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        BLOG_CMS_CONTENT_CLASS,
        "[&_h2]:mt-8 [&_h2]:text-xl [&_h2]:md:text-2xl [&_h3]:mt-6 [&_p]:text-foreground/86 [&_ul]:text-foreground/86 [&_ol]:text-foreground/86 [&_li]:text-foreground/86",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function ContentSection({
  title,
  html,
  muted = false,
}: {
  title?: string;
  html?: string;
  muted?: boolean;
}) {
  if (!title && !html) {
    return null;
  }

  return (
    <Section className={muted ? "bg-muted/30 py-14 md:py-20" : "py-14 md:py-20"}>
      <FadeIn className="mx-auto max-w-5xl">
        <div className="border-border/70 bg-card/65 rounded-3xl border p-6 shadow-sm backdrop-blur sm:p-8 md:p-10">
          {title ? (
            <h2 className="font-heading text-foreground text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
          ) : null}
          {html ? (
            <RichText html={html} className={title ? "mt-5" : undefined} />
          ) : null}
        </div>
      </FadeIn>
    </Section>
  );
}

export function LandingPageTemplate({
  page,
  site,
}: {
  page: LandingPage;
  site: SiteConfig;
}) {
  const hasFaq = page.faqItems.length > 0;
  const hasBottomCta = Boolean(
    page.ctaTitle || page.ctaHtml || page.ctaButtonHref || page.ctaButtonText,
  );
  const hasHeroImage = Boolean(page.heroImage);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-white via-background to-secondary/60">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,0,0.14),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,122,0,0.08),transparent_34%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[-5rem] h-40 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_35%,rgba(255,255,255,0)_76%)] blur-3xl"
          aria-hidden
        />
        <div
          className={cn(
            "relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:gap-12 lg:px-8 lg:py-24",
            hasHeroImage
              ? "lg:grid-cols-[minmax(0,1fr)_minmax(18rem,30rem)]"
              : "lg:grid-cols-[minmax(0,1fr)_22rem]",
          )}
        >
          <FadeIn className="max-w-3xl">
            <p className="text-primary mb-4 text-sm font-semibold tracking-[0.18em] uppercase">
              Rijschool Vlam Utrecht
            </p>
            <h1 className="font-heading text-foreground text-balance text-[clamp(2.2rem,1.7rem+2vw,4.2rem)] font-semibold leading-[1.05] tracking-tight">
              {page.heroTitle}
            </h1>
            {page.heroHtml ? (
              <RichText
                html={page.heroHtml}
                className="mt-6 max-w-2xl [&_p]:text-base [&_p]:leading-relaxed sm:[&_p]:text-lg"
              />
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {page.ctaButtonHref && page.ctaButtonText ? (
                <ActionButton href={page.ctaButtonHref}>{page.ctaButtonText}</ActionButton>
              ) : null}
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${site.phoneE164}`}>
                  <Phone data-icon="inline-start" />
                  Bel {site.phoneDisplay}
                </a>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            {page.heroImage ? (
              <div className="border-border/70 bg-card/92 overflow-hidden rounded-3xl border p-3 shadow-[0_24px_80px_-34px_rgba(15,23,42,0.16)] ring-1 ring-primary/10 backdrop-blur sm:p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-muted/40">
                  <Image
                    src={page.heroImage.src}
                    alt={page.heroImage.alt}
                    fill
                    priority
                    className="object-cover brightness-105 saturate-[0.88]"
                    sizes="(max-width: 1023px) 100vw, 30rem"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/88 via-white/16 to-transparent"
                    aria-hidden
                  />
                </div>
              </div>
            ) : (
              <div className="border-border/70 from-card via-card to-secondary/65 rounded-3xl border bg-gradient-to-br p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.14)]">
                <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
                  Waarom leerlingen kiezen
                </p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Rustige, persoonlijke begeleiding op jouw tempo.",
                    "Rijlessen in Utrecht en omliggende regio’s.",
                    "Duidelijke aanpak richting proefles en examen.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2
                        className="text-primary mt-0.5 size-5 shrink-0"
                        aria-hidden
                      />
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <ContentSection title={page.introTitle} html={page.introHtml} />
      <ContentSection title={page.contentTitle} html={page.contentHtml} muted />

      {hasFaq ? (
        <Section className="py-14 md:py-20">
          <FadeIn className="mx-auto max-w-5xl">
            {page.faqTitle ? (
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="text-primary mb-3 text-sm font-semibold tracking-[0.18em] uppercase">
                  FAQ
                </p>
                <h2 className="font-heading text-foreground text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                  {page.faqTitle}
                </h2>
              </div>
            ) : null}
            <FaqAccordion items={page.faqItems} />
          </FadeIn>
        </Section>
      ) : null}

      {hasBottomCta ? (
        <Section className="pt-0 pb-14 md:pb-20">
          <FadeIn className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary px-6 py-8 text-primary-foreground shadow-[0_24px_70px_-30px_rgba(255,122,0,0.45)] sm:px-8 sm:py-10 md:px-10">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.16),transparent_34%)]"
                aria-hidden
              />
              <div className="relative">
                {page.ctaTitle ? (
                  <h2 className="font-heading max-w-3xl text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                    {page.ctaTitle}
                  </h2>
                ) : null}
                {page.ctaHtml ? (
                  <RichText
                    html={page.ctaHtml}
                    className={cn(
                      "max-w-3xl [&_a]:text-primary-foreground [&_a]:decoration-primary-foreground/80 [&_h2]:text-primary-foreground [&_h3]:text-primary-foreground [&_li]:text-primary-foreground/90 [&_ol]:text-primary-foreground/90 [&_p]:text-primary-foreground/90 [&_strong]:text-primary-foreground [&_ul]:text-primary-foreground/90",
                      page.ctaTitle ? "mt-5" : undefined,
                    )}
                  />
                ) : null}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {page.ctaButtonHref && page.ctaButtonText ? (
                    <ActionButton
                      href={page.ctaButtonHref}
                      className="bg-background text-foreground hover:bg-background/90"
                    >
                      {page.ctaButtonText}
                    </ActionButton>
                  ) : null}
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-background/90 text-foreground hover:bg-background"
                    asChild
                  >
                    <a href={`tel:${site.phoneE164}`}>
                      <Phone data-icon="inline-start" />
                      {site.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>
      ) : null}
    </>
  );
}
