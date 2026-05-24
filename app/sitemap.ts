import type { MetadataRoute } from "next";

import { BIJZONDERE_VERRICHTING_ITEMS } from "@/lib/bijzondere-verrichtingen-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/constants";

const STATIC_PATHS = [
  "/",
  "/tarieven",
  "/spoedcursus",
  "/theorieles",
  "/bijzondere-verrichtingen",
  "/blog",
  "/veelgestelde-vragen",
  "/contact",
  "/algemene-voorwaarden",
] as const;

const PAGE_SIZE = 9;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const blogListPages = Math.max(1, Math.ceil(BLOG_POSTS.length / PAGE_SIZE));
  const blogEntries: MetadataRoute.Sitemap = [
    ...Array.from({ length: blogListPages }, (_, i) => {
      const page = i + 1;
      const path = page === 1 ? "/blog" : `/blog?page=${page}`;
      return {
        url: new URL(path, SITE_URL).toString(),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    }),
    ...BLOG_POSTS.map((post) => ({
      url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
      lastModified: new Date(`${post.publishedAt}T00:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  const verrichtingenEntries: MetadataRoute.Sitemap =
    BIJZONDERE_VERRICHTING_ITEMS.map((item) => ({
      url: new URL(`/bijzondere-verrichtingen/${item.id}`, SITE_URL).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries, ...verrichtingenEntries];
}
