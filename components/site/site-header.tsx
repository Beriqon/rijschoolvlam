"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE_LOGO,
  SITE_NAME,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  phoneDisplay?: string;
  phoneE164?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
};

export function SiteHeader({
  phoneDisplay = PHONE_DISPLAY,
  phoneE164 = PHONE_E164,
  primaryCtaText = "Gratis proefles",
  primaryCtaHref = "/contact",
}: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="bg-background/85 border-border sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto grid h-20 w-full max-w-7xl grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 px-4 sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-4 lg:gap-x-6 lg:px-8">
        <Link
          href="/"
          className="relative flex shrink-0 items-center justify-self-start py-0.5"
          aria-label={`${SITE_NAME} — home`}
        >
          <Image
            src={SITE_LOGO.src}
            alt=""
            width={SITE_LOGO.width}
            height={SITE_LOGO.height}
            className="h-11 w-auto max-w-[14rem] object-contain object-left sm:h-12 sm:max-w-[17rem]"
            priority
            sizes="(max-width: 640px) 224px, 272px"
            unoptimized={SITE_LOGO.src.endsWith(".svg")}
          />
        </Link>

        <nav
          className="hidden min-w-0 w-full items-center justify-center justify-self-center md:flex"
          aria-label="Hoofdmenu"
        >
          <ul className="m-0 flex list-none flex-nowrap items-center justify-center gap-0.5 p-0 lg:gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-md px-2.5 py-2.5 text-[0.9375rem] font-medium transition-colors lg:px-3.5",
                    pathname === link.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center justify-end gap-2 md:flex md:justify-self-end lg:gap-2.5">
          <Button size="default" className="shrink-0 text-[0.9375rem]" asChild>
            <Link href={primaryCtaHref}>{primaryCtaText}</Link>
          </Button>
          <Button size="default" variant="outline" className="shrink-0 text-[0.9375rem]" asChild>
            <a href={`tel:${phoneE164}`}>
              <Phone data-icon="inline-start" />
              {phoneDisplay}
            </a>
          </Button>
        </div>

        <div className="flex shrink-0 items-center justify-end justify-self-end gap-2 md:hidden">
          <Button size="default" className="px-3 text-sm sm:px-3.5" asChild>
            <Link href={primaryCtaHref}>{primaryCtaText}</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Menu openen"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-2 pb-4" aria-label="Mobiel menu">
                <SheetClose asChild>
                  <Link
                    href={primaryCtaHref}
                    className={cn(
                      buttonVariants({ variant: "default", size: "default" }),
                      "mb-2 justify-center"
                    )}
                  >
                    {primaryCtaText}
                  </Link>
                </SheetClose>
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-sm font-medium",
                        pathname === link.href
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a
                    href={`tel:${phoneE164}`}
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "mt-4 inline-flex w-full items-center justify-center gap-1.5"
                    )}
                  >
                    <Phone className="size-4 shrink-0" aria-hidden />
                    Bel {phoneDisplay}
                  </a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
