import type { NextConfig } from "next";

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
  async redirects() {
    return [
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
