import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { MotionRoot } from "@/components/motion/MotionRoot";
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
 * Root layout: document, fonts, colour palette, motion, analytics.
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
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
      style={{ ["--header-h" as string]: siteConfig.announcement ? "7.25rem" : "4.5rem" }}
      suppressHydrationWarning
    >
      <head>
        {/*
          Stamps html[data-motion="js"] before first paint. Only with that
          attribute does globals.css hide the blocks the motion script will
          reveal, so pages never flash or stay hidden without JavaScript.
        */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.setAttribute("data-motion","js")' }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <MotionRoot />
        {children}
        {/* Vercel Analytics: no cookies, stays inside the Vercel account. Off until launch. */}
        {process.env.NEXT_PUBLIC_ANALYTICS === "on" && <Analytics />}
      </body>
    </html>
  );
}
