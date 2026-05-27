import type { NextConfig } from "next";

/** Headless WordPress origin (HTTP only on Hosting2Go). Proxied via rewrites on the main domain. */
const WORDPRESS_ORIGIN = "http://cms.rijschoolvlam.nl";

const wordpressBeforeFileRewrites = [
  // Prefixed CMS entry: /cms/* → WordPress root paths on the origin
  { source: "/cms/:path*", destination: `${WORDPRESS_ORIGIN}/:path*` },
  // WordPress assets and admin at site root (linked from proxied admin pages)
  { source: "/wp-admin", destination: `${WORDPRESS_ORIGIN}/wp-admin` },
  { source: "/wp-admin/:path*", destination: `${WORDPRESS_ORIGIN}/wp-admin/:path*` },
  { source: "/wp-login.php", destination: `${WORDPRESS_ORIGIN}/wp-login.php` },
  { source: "/wp-content/:path*", destination: `${WORDPRESS_ORIGIN}/wp-content/:path*` },
  { source: "/wp-includes/:path*", destination: `${WORDPRESS_ORIGIN}/wp-includes/:path*` },
  { source: "/wp-json/:path*", destination: `${WORDPRESS_ORIGIN}/wp-json/:path*` },
  { source: "/graphql", destination: `${WORDPRESS_ORIGIN}/graphql` },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.rijschoolvlam.nl",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "cms.rijschoolvlam.nl",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: wordpressBeforeFileRewrites,
    };
  },
  async redirects() {
    return [
      {
        source: "/cms",
        destination: "/cms/wp-admin/",
        permanent: false,
      },
      {
        source: "/spoedcursus-bij-autorijschool-vlam",
        destination: "/spoedcursus",
        permanent: true,
      },
      {
        source: "/blog-rijschool-vlam",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/veelgestelde-vragen",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
