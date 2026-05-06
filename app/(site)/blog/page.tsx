import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FadeIn } from "@/components/site/fade-in";
import { GraduatePhotosSection } from "@/components/site/graduate-photos-section";
import { Section, SectionHeading } from "@/components/site/section";
import { BLOG_POSTS, blogCoverImageAnchorClass } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — Rijschool Vlam",
  description:
    "Tips, uitleg en updates over rijlessen in Utrecht, het praktijkexamen en slim plannen richting je rijbewijs.",
};

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

const PAGE_SIZE = 9;

function formatPublishedAt(isoDate: string) {
  const d = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default async function BlogPage(props: PageProps) {
  const { page } = await props.searchParams;
  const requestedPage = Number.parseInt(page ?? "1", 10);

  const postsSorted = [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const totalPages = Math.max(1, Math.ceil(postsSorted.length / PAGE_SIZE));
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = postsSorted.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <>
      <Section className="pt-12 md:pt-16">
        <SectionHeading
          eyebrow="Blog"
          title="Tips & artikelen"
          description="Praktische uitleg over rijlessen, automaat of schakel, en het CBR-praktijkexamen in Utrecht."
        />

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post, idx) => (
              <FadeIn key={post.slug} delay={idx * 0.03} className="h-full">
                <article className="bg-card border-border flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-2 hover:ring-orange-500/15">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="bg-muted relative aspect-[16/10] w-full overflow-hidden"
                    aria-label={post.title}
                  >
                    <Image
                      src={post.imageSrc}
                      alt={post.title}
                      fill
                      className={`object-cover ${blogCoverImageAnchorClass(post.coverImageAnchor)}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={currentPage === 1 && idx < 3}
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span>{formatPublishedAt(post.publishedAt)}</span>
                      <span aria-hidden>•</span>
                      <span>{post.readTimeMinutes} min</span>
                    </div>

                    <h3 className="mt-2 text-balance text-lg font-semibold tracking-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline underline-offset-4"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    {post.tags?.length ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <li
                            key={tag}
                            className="bg-muted text-foreground rounded-full px-2.5 py-1 text-xs font-semibold"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-5">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/blog/${post.slug}`}>
                          Lees artikel
                          <ArrowRight data-icon="inline-end" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Button
                variant="outline"
                disabled={currentPage <= 1}
                className="w-full sm:w-auto"
                asChild={currentPage > 1}
              >
                {currentPage > 1 ? (
                  <Link href={{ pathname: "/blog", query: { page: String(currentPage - 1) } }}>
                    <ArrowLeft data-icon="inline-start" />
                    Vorige
                  </Link>
                ) : (
                  <span>
                    <ArrowLeft data-icon="inline-start" />
                    Vorige
                  </span>
                )}
              </Button>

              <p className="text-muted-foreground text-sm">
                {currentPage} van {totalPages}
              </p>

              <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                className="w-full sm:w-auto"
                asChild={currentPage < totalPages}
              >
                {currentPage < totalPages ? (
                  <Link href={{ pathname: "/blog", query: { page: String(currentPage + 1) } }}>
                    Volgende
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                ) : (
                  <span>
                    Volgende
                    <ArrowRight data-icon="inline-end" />
                  </span>
                )}
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      <GraduatePhotosSection size="compact" />
      <CtaBand />
    </>
  );
}

