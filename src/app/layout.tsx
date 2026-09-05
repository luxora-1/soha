import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { DevTools } from "@/components/dev/DevTools";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { defaultPalette, palettes } from "@/config/design-tokens";
import { siteConfig } from "@/config/site";
import { sans, serif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  // When unset, Next infers the URL from Vercel's environment automatically.
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: {
    default: `${siteConfig.name} — Menopause care, simplified`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  /*
   * PRE-LAUNCH: keep the site out of search indexes while it carries
   * placeholder content. Flip to `index: true` at launch.
   */
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: palettes[defaultPalette].tokens.bg,
};

/**
 * Root layout: document, fonts, colour palette, motion defaults, analytics.
 * Page chrome lives one level down — (site) wraps the marketing pages in the
 * full navbar and footer, (landing) gives ad landing pages a stripped shell.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-palette={defaultPalette}
      // The development palette switcher changes data-palette before hydration.
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
      style={{ ["--header-h" as string]: siteConfig.announcement ? "7.25rem" : "4.5rem" }}
    >
      <body className="flex min-h-screen flex-col">
        {/* Development only: palette switcher + ?palette= reader. Renders nothing in production builds. */}
        <DevTools />
        <noscript>
          {/* Without JS the FadeUp wrappers never animate in; show them. */}
          <style>{`[data-fade-up]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
        {/* Vercel Analytics: no cookies, stays inside the Vercel account. Off until launch. */}
        {process.env.NEXT_PUBLIC_ANALYTICS === "on" && <Analytics />}
      </body>
    </html>
  );
}
