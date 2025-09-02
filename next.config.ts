import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/robots",
      },
    ];
  },
};

export default nextConfig;
