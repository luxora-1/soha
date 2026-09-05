/**
 * Image slots for the ad landing page (/combination-cream).
 *
 * Every slot resolves to public/images/landing/{id}.{ext} by convention. To
 * replace a placeholder, drop a file at that path with that name and nothing
 * else changes. public/images/landing/README.md is the shot list generated
 * from this manifest — keep the two in step.
 *
 * `width` × `height` fix the aspect ratio the slot is displayed at; supply
 * files at least that large (they are cropped to the ratio, never stretched).
 */

export type LandingSlot = {
  width: number;
  height: number;
  /** Human-readable ratio, for the shot list. */
  ratio: string;
  /** Accessible description of the image. */
  alt: string;
  /** One line for the photographer / art director. */
  description: string;
};

export const landingSlots = {
  "hero-product": {
    width: 1200,
    height: 1200,
    ratio: "1:1",
    alt: "The Estrada pump dispenser on a clean, light background.",
    description: "Product in its pump dispenser, clean background.",
  },
  "hero-lifestyle": {
    width: 1200,
    height: 1500,
    ratio: "4:5",
    alt: "A woman in her fifties at home in natural light, calm and unposed.",
    description: "Woman, 45–60, natural light, calm and unstaged.",
  },
  "comparison-patchwork": {
    width: 1500,
    height: 1000,
    ratio: "3:2",
    alt: "Scattered pills, a hormone patch, and separate tubes on a plain surface.",
    description: "The competing approach: scattered pills, a patch, separate tubes.",
  },
  "comparison-single": {
    width: 1500,
    height: 1000,
    ratio: "3:2",
    alt: "One Estrada dispenser alone on a clean surface.",
    description: "One dispenser, alone, on a clean surface.",
  },
  "ingredient-estradiol": {
    width: 1200,
    height: 1200,
    ratio: "1:1",
    alt: "Abstract macro texture representing estradiol.",
    description: "Abstract or macro texture (estradiol).",
  },
  "ingredient-progesterone": {
    width: 1200,
    height: 1200,
    ratio: "1:1",
    alt: "Abstract macro texture representing progesterone.",
    description: "Same treatment as estradiol (progesterone).",
  },
  "ingredient-base": {
    width: 1200,
    height: 1200,
    ratio: "1:1",
    alt: "Abstract macro texture of the cream base.",
    description: "Same treatment as estradiol (the cream base).",
  },
  "founder-portrait": {
    width: 1200,
    height: 1500,
    ratio: "4:5",
    alt: "Portrait of Soha's medical director, looking directly at the camera.",
    description: "Portrait, warm, direct to camera.",
  },
  "testimonial-1": {
    width: 800,
    height: 800,
    ratio: "1:1",
    alt: "Portrait of a Soha patient.",
    description: "Patient portrait 1.",
  },
  "testimonial-2": {
    width: 800,
    height: 800,
    ratio: "1:1",
    alt: "Portrait of a Soha patient.",
    description: "Patient portrait 2.",
  },
  "testimonial-3": {
    width: 800,
    height: 800,
    ratio: "1:1",
    alt: "Portrait of a Soha patient.",
    description: "Patient portrait 3.",
  },
  "packaging-detail": {
    width: 1500,
    height: 1000,
    ratio: "3:2",
    alt: "Close crop of Estrada packaging showing its texture and finish.",
    description: "Close crop, packaging texture and finish.",
  },
  "certification-01": {
    width: 480,
    height: 320,
    ratio: "3:2",
    alt: "Certification mark 1 of the pharmacy that compounds Estrada.",
    description: "Certification mark (e.g. PCAB), transparent or matching background.",
  },
  "certification-02": {
    width: 480,
    height: 320,
    ratio: "3:2",
    alt: "Certification mark 2 of the pharmacy that compounds Estrada.",
    description: "Certification mark (e.g. NABP), same treatment.",
  },
  "certification-03": {
    width: 480,
    height: 320,
    ratio: "3:2",
    alt: "Certification mark 3 of the pharmacy that compounds Estrada.",
    description: "Certification mark (e.g. LegitScript), same treatment.",
  },
  "certification-04": {
    width: 480,
    height: 320,
    ratio: "3:2",
    alt: "Certification mark 4 of the pharmacy that compounds Estrada.",
    description: "Certification mark (e.g. state board of pharmacy), same treatment.",
  },
  "certification-05": {
    width: 480,
    height: 320,
    ratio: "3:2",
    alt: "Certification mark 5 of the pharmacy that compounds Estrada.",
    description: "Certification mark (e.g. 503A registration), same treatment.",
  },
} as const satisfies Record<string, LandingSlot>;

export type LandingSlotId = keyof typeof landingSlots;

/** Props for <ImageSlot> from the manifest: `<ImageSlot {...slot("hero-product")} priority />`. */
export function slot(id: LandingSlotId) {
  const { width, height, alt } = landingSlots[id];
  return { id, width, height, alt };
}
