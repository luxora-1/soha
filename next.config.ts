import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No remote images yet: all imagery is IMAGE_PLACEHOLDER blocks until brand
  // photography exists. Add `images.remotePatterns` here when a CDN is chosen.
};

export default nextConfig;
