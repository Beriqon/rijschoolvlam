"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ZoomableImageProps = Omit<ImageProps, "onClick"> & {
  triggerClassName?: string;
  dialogContentClassName?: string;
};

export function ZoomableImage({
  triggerClassName,
  dialogContentClassName,
  className,
  ...imageProps
}: ZoomableImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            triggerClassName
          )}
          aria-label="Vergroot afbeelding"
        >
          <Image
            {...imageProps}
            className={cn("h-auto w-full", className)}
          />
        </button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-[calc(100%-1.5rem)] bg-transparent p-0 ring-0 sm:max-w-5xl md:max-w-6xl",
          dialogContentClassName
        )}
      >
        <div className="border-border overflow-hidden rounded-2xl border bg-card shadow-sm">
          <Image
            {...imageProps}
            className={cn("h-auto w-full cursor-zoom-out", className)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

