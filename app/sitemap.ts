import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

const paths = [
  "/",
  "/tarieven",
  "/spoedcursus",
  "/theorieles",
  "/bijzondere-verrichtingen",
  "/blog",
  "/faq",
  "/veelgestelde-vragen",
  "/contact",
  "/algemene-voorwaarden",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
