"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Review } from "@/lib/reviews-data";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} van 5 sterren`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4 shrink-0",
            i < rating
              ? "fill-primary text-primary"
              : "fill-transparent text-muted-foreground/35"
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

const GAP_PX = 24; // gap-6

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    const ro = new ResizeObserver(updateScrollButtons);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      ro.disconnect();
    };
  }, [updateScrollButtons, reviews.length]);

  const scrollByOne = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-review-slide]");
    const step = slide ? slide.getBoundingClientRect().width + GAP_PX : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByOne(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByOne(1);
    }
  };

  return (
    <div
      className="mt-12 flex items-center gap-2 sm:gap-3 md:gap-4"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Recensies van leerlingen"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        className="hidden shrink-0 rounded-full sm:inline-flex"
        aria-label="Vorige recensies"
        disabled={!canPrev}
        onClick={() => scrollByOne(-1)}
      >
        <ChevronLeft className="size-5" aria-hidden />
      </Button>

      <div
        ref={scrollerRef}
        className="border-border/60 bg-muted/20 min-h-0 min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl border px-1 py-1 sm:px-2 sm:py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul
          className="flex w-max gap-6 px-2 py-2 sm:px-3 sm:py-3 md:px-4"
          role="list"
        >
          {reviews.map((review) => (
            <li
              key={review.id}
              data-review-slide
              className="w-[min(22rem,calc(100vw-3rem))] shrink-0 snap-start sm:w-80 md:w-[22rem]"
            >
              <figure className="bg-card border-border flex h-full flex-col rounded-xl border p-5 shadow-sm sm:p-6">
                <StarRating rating={review.rating} />
                <blockquote className="mt-4 flex-1">
                  <p className="text-foreground text-sm leading-relaxed sm:text-[0.9375rem]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="border-border mt-5 border-t pt-5">
                  <p className="text-foreground text-sm font-semibold">
                    {review.author}
                  </p>
                  {review.context ? (
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {review.context}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        className="hidden shrink-0 rounded-full sm:inline-flex"
        aria-label="Volgende recensies"
        disabled={!canNext}
        onClick={() => scrollByOne(1)}
      >
        <ChevronRight className="size-5" aria-hidden />
      </Button>
    </div>
  );
}
