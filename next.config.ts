import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    extensionAlias: {
      ".js": [".tsx", ".ts", ".jsx", ".js"],
    },
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/robots",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "toptiertravel.vip",
      },
    ],
  },
};

export default nextConfig;
