"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";
import { ImageIcon } from "lucide-react";

import type { GraduatePhotoSlide } from "@/lib/graduate-photos-data";

const GAP_PX = 24;
/** Tijd tussen automatische slides (ms) */
const AUTO_ADVANCE_MS = 3000;

type GraduatePhotosCarouselProps = {
  slides: GraduatePhotoSlide[];
  size?: "default" | "compact";
};

function getFlexGapPx(listEl: HTMLElement | null) {
  if (!listEl) return GAP_PX;
  const cs = window.getComputedStyle(listEl);
  const raw = cs.columnGap || cs.gap || "0px";
  const px = Number.parseFloat(raw);
  return Number.isFinite(px) && px > 0 ? px : GAP_PX;
}

export function GraduatePhotosCarousel({
  slides,
  size = "default",
}: GraduatePhotosCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hoverPausedRef = useRef(false);
  const focusWithinPausedRef = useRef(false);

  const getStep = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const slide = el.querySelector<HTMLElement>("[data-graduate-slide]");
    const list = el.querySelector<HTMLElement>("[data-graduate-list]");
    const gapPx = getFlexGapPx(list);
    return slide
      ? slide.getBoundingClientRect().width + gapPx
      : el.clientWidth * 0.85;
  }, []);

  const advanceAuto = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || hoverPausedRef.current || focusWithinPausedRef.current) return;
    if (document.visibilityState === "hidden") return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 8) return;

    const step = getStep();
    if (!step) return;

    if (scrollLeft >= maxScroll - 8) {
      el.scrollTo({ left: 0, behavior: "auto" });
    } else {
      el.scrollBy({ left: step, behavior: "smooth" });
    }
  }, [getStep]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(advanceAuto, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [advanceAuto, slides.length]);

  const scrollByOne = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = getStep();
    if (!step) return;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, [getStep]);

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
      ref={scrollerRef}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Foto’s van geslaagde leerlingen, wisselen automatisch. Gebruik pijltjestoetsen om handmatig te scrollen."
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => {
        hoverPausedRef.current = true;
      }}
      onMouseLeave={() => {
        hoverPausedRef.current = false;
      }}
      onFocus={() => {
        focusWithinPausedRef.current = true;
      }}
      onBlur={() => {
        focusWithinPausedRef.current = false;
      }}
      className={
        size === "compact"
          ? "border-border/60 bg-muted/20 mt-8 w-full snap-x snap-mandatory overflow-x-auto scroll-smooth border-y border-x-0 py-1.5 sm:mt-10 sm:py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "border-border/60 bg-muted/20 mt-10 w-full snap-x snap-mandatory overflow-x-auto scroll-smooth border-y border-x-0 py-2 sm:mt-12 sm:py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      }
    >
      <ul
        className={
          size === "compact"
            ? "flex w-max gap-3 px-4 py-1 sm:px-6 sm:py-1.5 md:gap-4 md:px-10 lg:gap-6 lg:px-14"
            : "flex w-max gap-3 px-4 py-1 sm:px-6 sm:py-2 md:gap-4 md:px-10 lg:gap-8 lg:px-14"
        }
        role="list"
        data-graduate-list
      >
        {slides.map((slide) => (
          <li
            key={slide.id}
            data-graduate-slide
            className={
              size === "compact"
                ? "w-[clamp(5.25rem,26vw,8.5rem)] shrink-0 snap-start lg:w-52"
                : "w-[clamp(5.75rem,28vw,9.5rem)] shrink-0 snap-start lg:w-60"
            }
          >
            <figure className="flex flex-col gap-2">
              <div className="border-border bg-muted/50 relative aspect-[3/4] w-full overflow-hidden rounded-2xl border shadow-sm">
                {slide.imageSrc ? (
                  <Image
                    src={slide.imageSrc}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes={
                      size === "compact"
                        ? "(max-width: 1024px) 34vw, 240px"
                        : "(max-width: 1024px) 34vw, 280px"
                    }
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-muted to-muted/70 p-4 text-center">
                    <ImageIcon
                      className="text-muted-foreground size-10"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <p className="text-muted-foreground text-xs leading-snug">
                      Placeholder — vervang door je foto in{" "}
                      <span className="text-foreground font-mono text-[0.65rem]">
                        public/geslaagden/
                      </span>
                    </p>
                  </div>
                )}
              </div>
              {slide.caption ? (
                <figcaption className="text-muted-foreground px-0.5 text-center text-xs">
                  {slide.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
