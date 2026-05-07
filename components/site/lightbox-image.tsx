"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

export function LightboxImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
  wrapperClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  wrapperClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          wrapperClassName,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={className}
        />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-[1px]"
          onMouseDown={close}
        >
          <div className="sr-only" id={titleId}>
            {alt}
          </div>
          <div
            className="relative h-[min(86vh,900px)] w-[min(92vw,1200px)] overflow-hidden rounded-2xl bg-black/20 shadow-2xl ring-1 ring-white/10"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

