import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Site imagery is local (IMAGE_PLACEHOLDER blocks until brand photography
    // exists). Remote images are the community feed's Instagram media.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      // A local Graph API mock in development (see README, Community feed).
      ...(process.env.NODE_ENV === "development"
        ? [{ protocol: "http" as const, hostname: "localhost" }]
        : []),
    ],
    // The optimizer refuses private IPs (SSRF guard). Development only, for the mock above.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
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
