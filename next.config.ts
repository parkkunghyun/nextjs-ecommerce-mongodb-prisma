import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{hostname: "images.unsplash.com"}]
  },
  experimental: {
    serverActions: true
  }
};

export default nextConfig;
