import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/lib/site-config";

export async function CtaBand() {
  const site = await getSiteConfig();

  return (
    <section className="bg-primary py-14 text-primary-foreground md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div className="max-w-2xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Gratis proefles of persoonlijk advies?
          </h2>
          <p className="mt-2 text-sm leading-relaxed opacity-95 md:text-base">
            Bel ons, vul het inschrijfformulier in of stuur een bericht via contact. We
            reageren snel en denken met je mee.
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <Link href={site.primaryCta.href}>{site.primaryCta.text}</Link>
          </Button>
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
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <Link href="/contact">Contactformulier</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
