/**
 * Pricing configuration — the ONLY place a price may live.
 *
 * PRICING_PLACEHOLDER: pricing is blocked on the pharmacy partner. Every
 * `price` is `null` until finalized, and `formatPrice` renders null as "$—".
 * No sample numbers anywhere: placeholder figures get screenshotted and
 * quoted back.
 */

export type CycleDays = 28 | 84;

export type CycleOption = {
  days: CycleDays;
  /** Toggle label. */
  label: string;
  /** Shown next to the price, e.g. "per 28 days". */
  per: string;
  /** Short framing line under the toggle / on the card. */
  framing: string;
  /** Optional badge on the card. */
  badge?: string;
  /** Whole-currency price, or null while unfinalized. */
  price: number | null;
};

export const pricingConfig = {
  currency: "USD",
  defaultCycle: 84 as CycleDays,
  cycles: [
    {
      days: 28,
      label: "28 days",
      per: "per 28 days",
      framing: "A new box every four weeks.",
      price: null, // PRICING_PLACEHOLDER
    },
    {
      days: 84,
      label: "84 days",
      per: "per 84 days",
      framing: "Fewer shipments, better price.",
      badge: "Fewer shipments, better price",
      price: null, // PRICING_PLACEHOLDER
    },
  ] satisfies CycleOption[],

  /** What every plan includes, in display order. */
  includes: [
    "Your consult",
    "Your regimen, shipped",
    "Clinician messaging between visits",
    "Cancel or pause anytime",
  ],

  footnote:
    "Your price is your price. It includes the visit, the medication, and shipping — nothing gets added at checkout.",
} as const;

export function getCycle(days: CycleDays): CycleOption {
  const found = pricingConfig.cycles.find((c) => c.days === days);
  if (!found) throw new Error(`Unknown cycle: ${days}`);
  return found;
}

/** Renders a whole-currency price; `null` (unfinalized) renders as "$—". */
export function formatPrice(price: number | null, currency: string = pricingConfig.currency): string {
  if (price === null) return "$—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
