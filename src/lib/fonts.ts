import { Inter, Newsreader } from "next/font/google";

/**
 * Accent serif: Newsreader — a transitional text serif with an optical-size
 * axis. It appears only as the italic accent word inside a headline and in
 * the product name pill, so the page reads as a sans-led clinical brand.
 */
export const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
  axes: ["opsz"],
});

/**
 * Headlines, body and interface: Inter — a neo-grotesque with a large
 * x-height that stays crisp at small sizes. Headlines use weight 600, body
 * 400, buttons and eyebrows 500 to 600. Variable weights.
 */
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
