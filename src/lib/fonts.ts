import { Fraunces, Inter } from "next/font/google";

/**
 * Headings: Fraunces — a warm, editorial serif with an optical-size axis so it
 * gets more refined as it scales up. Loaded as a variable font; we only ever
 * use weight 400 for headings, but the SOFT axis gives us a gentler cut.
 */
export const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
  axes: ["opsz", "SOFT"],
});

/**
 * Body: Inter — a clean geometric sans, loaded as a variable font.
 */
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
