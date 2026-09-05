import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { palette } from "@/config/design-tokens";
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
  themeColor: palette.base,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        <noscript>
          {/* Without JS the FadeUp wrappers never animate in; show them. */}
          <style>{`[data-fade-up]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        {/* Vercel Analytics: no cookies, stays inside the Vercel account. Off until launch. */}
        {process.env.NEXT_PUBLIC_ANALYTICS === "on" && <Analytics />}
      </body>
    </html>
  );
}
