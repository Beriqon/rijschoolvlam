import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FadeIn } from "@/components/site/fade-in";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section } from "@/components/site/section";
import {
  BLOG_CMS_CONTENT_CLASS,
  prepareBlogHtmlForRender,
  type BlogTocItem,
} from "@/lib/cms/blog-html";
import type { BlogContentNode } from "@/lib/blog-data";
import {
  blogCoverImageAnchorClass,
  getBlogPostBySlugWithFallback,
} from "@/lib/blog-data";
import { withCanonical } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function BlogTocAside({ toc }: { toc: BlogTocItem[] }) {
  if (!toc.length) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="bg-card border-border rounded-2xl border p-6 shadow-sm">
        <p className="text-sm font-semibold">Inhoudsopgave</p>
        <nav className="mt-4">
          <ul className="space-y-2 text-sm">
            {toc.map((item) => (
              <li key={item.id} className={item.level === "h3" ? "pl-4" : ""}>
                <a
                  href={`#${item.id}`}
                  className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function formatPublishedAt(isoDate: string) {
  const d = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

function slugifyHeading(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPostBySlugWithFallback(slug);
  if (!post) return { title: "Blog — Rijschool Vlam" };

  return withCanonical(`/blog/${slug}`, {
    title: `${post.title} — Rijschool Vlam`,
    description: post.excerpt,
  });
}

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;
  const post = await getBlogPostBySlugWithFallback(slug);
  if (!post) notFound();

  const cmsPrepared = post.htmlContent
    ? prepareBlogHtmlForRender(post.htmlContent)
    : null;

  const renderParts = (parts: readonly (string | { type: "a"; text: string; href: string })[]) =>
    parts.map((part, partIdx) =>
      typeof part === "string" ? (
        <span key={partIdx}>{part}</span>
      ) : (
        <a
          key={partIdx}
          href={part.href}
          target="_blank"
          rel="noreferrer"
          className="text-foreground font-medium underline underline-offset-4"
        >
          {part.text}
        </a>
      ),
    );

  const renderNode = (node: BlogContentNode, idx: number) => {
    switch (node.type) {
      case "h2":
        {
          const id = slugifyHeading(node.text);
          return (
            <h2
              key={idx}
              id={id}
              className="group mt-12 scroll-mt-28 text-balance text-2xl font-semibold tracking-tight text-foreground first:mt-0 md:text-3xl"
            >
              <a
                href={`#${id}`}
                className="decoration-border/0 hover:decoration-border/60 underline underline-offset-8"
              >
                {node.text}
              </a>
            </h2>
          );
        }
      case "h3":
        {
          const id = slugifyHeading(node.text);
          return (
            <h3
              key={idx}
              id={id}
              className="mt-7 scroll-mt-28 text-lg font-semibold tracking-tight text-foreground md:text-xl"
            >
              {node.text}
            </h3>
          );
        }
      case "p":
        return (
          <p
            key={idx}
            className="text-foreground/80 text-base leading-7 md:text-[1.05rem]"
          >
            {"text" in node ? node.text : renderParts(node.parts)}
          </p>
        );
      case "ul":
        return (
          <ul
            key={idx}
            className="text-foreground/80 list-disc space-y-2 pl-5 leading-7 md:text-[1.05rem]"
          >
            {node.items.map((item, itemIdx) => (
              <li key={itemIdx} className="text-foreground/80">
                {typeof item === "string" ? item : renderParts(item)}
              </li>
            ))}
          </ul>
        );
      case "cta":
        return (
          <div key={idx} className="pt-2">
            <Button asChild>
              <Link href={node.href}>{node.text}</Link>
            </Button>
          </div>
        );
    }
  };

  const structuredToc: BlogTocItem[] =
    post.content
      ?.map((n) => {
        if (n.type !== "h2" && n.type !== "h3") return null;
        return {
          id: slugifyHeading(n.text),
          text: n.text,
          level: n.type,
        };
      })
      .filter((x): x is BlogTocItem => x !== null) ?? [];

  return (
    <>
      <Section className="pt-0">
        <FadeIn className="mx-auto max-w-6xl px-4 pb-4 pt-10 sm:px-6 md:pb-6 md:pt-14">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_520px]">
            <div className="min-w-0">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft data-icon="inline-start" />
                  Alle blogs
                </Link>
              </Button>

              <div className="mt-8 max-w-3xl">
                {post.tags?.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="bg-muted text-foreground rounded-full px-2.5 py-1 text-xs font-semibold"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  {post.title}
                </h1>
                <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                  {post.publishedAt ? (
                    <>
                      <span>{formatPublishedAt(post.publishedAt)}</span>
                      <span aria-hidden>•</span>
                    </>
                  ) : null}
                  <span>{post.readTimeMinutes} min lezen</span>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="bg-muted/40 border-border relative aspect-[16/10] overflow-hidden rounded-2xl border">
              <Image
                src={post.imageSrc}
                alt={post.title}
                fill
                className={`object-contain ${blogCoverImageAnchorClass(post.coverImageAnchor)}`}
                sizes="(max-width: 1024px) 100vw, 520px"
                priority
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 md:pb-16">
          {cmsPrepared?.html ? (
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
              <article className="min-w-0">
                <div
                  className={BLOG_CMS_CONTENT_CLASS}
                  dangerouslySetInnerHTML={{ __html: cmsPrepared.html }}
                />
              </article>
              <BlogTocAside toc={cmsPrepared.toc} />
            </div>
          ) : post.content?.length ? (
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
              <article className="min-w-0">
                <div className="space-y-5">{post.content.map((node, idx) => renderNode(node, idx))}</div>
              </article>

              <BlogTocAside toc={structuredToc} />

            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-muted-foreground text-base leading-relaxed">{post.excerpt}</p>
              <div className="bg-muted/40 border-border rounded-2xl border p-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  De volledige tekst (met informatie, tips en uitleg) komt nog. Stuur de
                  inhoud wanneer je klaar bent, dan vul ik deze pagina per blog verder
                  aan.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button asChild>
                    <Link href="/contact">Stel je vraag</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:info@rijschoolvlam.nl">Mail ons</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </FadeIn>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}

