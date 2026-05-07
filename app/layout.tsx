import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";

import { JsonLd } from "@/components/site/json-ld";
import { SITE_LOGO, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Rijschool Vlam Utrecht: gratis proefles, scherpe tarieven, persoonlijke rijlessen en begeleiding tot je CBR-praktijkexamen.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Rijschool Utrecht: professionele rijlessen, duidelijke tarieven en flexibele lestijden.",
    url: SITE_URL,
    images: [
      {
        url: SITE_LOGO.src,
        width: SITE_LOGO.width,
        height: SITE_LOGO.height,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Rijschool Utrecht: professionele rijlessen, duidelijke tarieven en flexibele lestijden.",
    images: [SITE_LOGO.src],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
