import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { getSiteConfig } from "@/lib/site-config";

export async function SiteShell({ children }: { children: ReactNode }) {
  const site = await getSiteConfig();

  return (
    <>
      <SiteHeader
        phoneDisplay={site.phoneDisplay}
        phoneE164={site.phoneE164}
        primaryCtaText={site.primaryCta.text}
        primaryCtaHref={site.primaryCta.href}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter
        phoneDisplay={site.phoneDisplay}
        phoneE164={site.phoneE164}
        contactEmail={site.contactEmail}
      />
      <WhatsAppFloat phoneDisplay={site.phoneDisplay} whatsappUrl={site.whatsappUrl} />
    </>
  );
}
