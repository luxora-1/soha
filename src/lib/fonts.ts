import { Fraunces, Instrument_Sans } from "next/font/google";

/**
 * Headings: Fraunces — a warm, editorial serif with an optical-size axis so it
 * gets more refined as it scales up. Loaded as a variable font; headings use
 * weight 400, and the SOFT axis gives a gentler cut.
 */
export const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
  axes: ["opsz", "SOFT"],
});

/**
 * Body and interface: Instrument Sans — a humanist sans with open apertures
 * and a slightly narrow, contemporary proportion. Chosen over a neo-grotesque
 * so the body text shares Fraunces' warmth instead of fighting it. Variable
 * weights 400 to 700.
 */
export const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
