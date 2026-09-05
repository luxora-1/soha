import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No remote images yet: all imagery is IMAGE_PLACEHOLDER blocks until brand
  // photography exists. Add `images.remotePatterns` here when a CDN is chosen.
  async redirects() {
    return [
      /*
       * Ad landing page. /estradiol is the short URL used in campaigns;
       * the page lives at /combination-cream. Temporary (307) while the
       * product name and URL are still settling, so browsers do not cache
       * it; switch to `permanent: true` once the URL is final. Query
       * strings (UTM parameters) are carried through automatically.
       */
      { source: "/estradiol", destination: "/combination-cream", permanent: false },
    ];
  },
};

export default nextConfig;
