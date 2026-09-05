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
 *
 * Video: some slots double as video posters. Drop
 * public/video/landing/{id}.mp4 (or .webm) next to the image and a play
 * button appears over the poster (see <VideoSlot>).
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
  /** Where it appears, for the shot list. */
  section: string;
  /** This slot also accepts a video of the same name. */
  video?: true;
};

const square = (alt: string, description: string, section: string, size = 1200): LandingSlot => ({
  width: size, height: size, ratio: "1:1", alt, description, section,
});
const portrait = (alt: string, description: string, section: string): LandingSlot => ({
  width: 1200, height: 1500, ratio: "4:5", alt, description, section,
});
const landscape = (alt: string, description: string, section: string): LandingSlot => ({
  width: 1500, height: 1000, ratio: "3:2", alt, description, section,
});
const fourThree = (alt: string, description: string, section: string): LandingSlot => ({
  width: 1600, height: 1200, ratio: "4:3", alt, description, section,
});

export const landingSlots = {
  /* Hero carousel — four slides, all 4:5. The product shot is shown uncropped on a surface. */
  "hero-product": square("The Estrada pump dispenser on a clean, light background.", "Slide 1. Product in its pump dispenser, clean background.", "Hero carousel"),
  "hero-lifestyle": portrait("A woman in her fifties at home in natural light, calm and unposed.", "Slide 2. Woman, 45–60, natural light, calm and unstaged.", "Hero carousel"),
  "hero-03": portrait("A hand pressing one pump of Estrada onto the inside of a forearm.", "Slide 3. One pump being applied to the skin, close and warm.", "Hero carousel"),
  "hero-04": portrait("Estrada's box and dispenser together on a bathroom shelf in morning light.", "Slide 4. Packaging and dispenser at home, morning light.", "Hero carousel"),

  /* Certification strip */
  "certification-01": { width: 480, height: 320, ratio: "3:2", alt: "Certification mark 1 of the pharmacy that compounds Estrada.", description: "Certification mark (e.g. PCAB), transparent or matching background.", section: "Certification strip" },
  "certification-02": { width: 480, height: 320, ratio: "3:2", alt: "Certification mark 2 of the pharmacy that compounds Estrada.", description: "Certification mark (e.g. NABP), same treatment.", section: "Certification strip" },
  "certification-03": { width: 480, height: 320, ratio: "3:2", alt: "Certification mark 3 of the pharmacy that compounds Estrada.", description: "Certification mark (e.g. LegitScript), same treatment.", section: "Certification strip" },
  "certification-04": { width: 480, height: 320, ratio: "3:2", alt: "Certification mark 4 of the pharmacy that compounds Estrada.", description: "Certification mark (e.g. state board of pharmacy), same treatment.", section: "Certification strip" },
  "certification-05": { width: 480, height: 320, ratio: "3:2", alt: "Certification mark 5 of the pharmacy that compounds Estrada.", description: "Certification mark (e.g. 503A registration), same treatment.", section: "Certification strip" },

  /* Estrada supports */
  "supports-lifestyle": portrait("A woman laughing with a friend over coffee, relaxed and present.", "Warm, candid, mid-fifties; the feeling of having yourself back.", "Estrada supports"),

  /* The problem */
  "comparison-patchwork": landscape("Scattered pills, a hormone patch, and separate tubes on a plain surface.", "The competing approach: scattered pills, a patch, separate tubes.", "The problem"),
  "comparison-single": landscape("One Estrada dispenser alone on a clean surface.", "One dispenser, alone, on a clean surface.", "The problem"),

  /* Estrada vs the other methods */
  "product-hotspots": portrait("The Estrada dispenser, large and centred, with room around it for labels.", "Product shot centred with generous space around it; hotspot labels overlay it.", "Estrada vs other methods"),
  "ingredient-estradiol": square("Abstract macro texture representing estradiol.", "Abstract or macro texture (estradiol).", "Ingredient cards"),
  "ingredient-progesterone": square("Abstract macro texture representing progesterone.", "Same treatment as estradiol (progesterone).", "Ingredient cards"),
  "ingredient-base": square("Abstract macro texture of the cream base.", "Same treatment as estradiol (the cream base).", "Ingredient cards"),

  /* Timeline tabs */
  "timeline-week-2": fourThree("A woman asleep in soft morning light.", "Week 2: sleep. Bedroom, morning light, calm.", "Timeline"),
  "timeline-week-4": fourThree("A woman outdoors in a light jacket, comfortable in cooler air.", "Week 4: fewer hot flashes. Outdoors, cool light.", "Timeline"),
  "timeline-week-6": fourThree("A woman working at a table, focused and at ease.", "Week 6: steadier days. Focused work, natural light.", "Timeline"),
  "timeline-week-8": fourThree("A woman stretching after a walk, smiling.", "Week 8: more like yourself. Movement, open air.", "Timeline"),

  /* Testimonials — also video posters */
  "testimonial-1": { ...square("Portrait of a Soha patient.", "Patient portrait 1; also the poster for testimonial-1.mp4.", "Testimonials", 800), video: true },
  "testimonial-2": { ...square("Portrait of a Soha patient.", "Patient portrait 2; also the poster for testimonial-2.mp4.", "Testimonials", 800), video: true },
  "testimonial-3": { ...square("Portrait of a Soha patient.", "Patient portrait 3; also the poster for testimonial-3.mp4.", "Testimonials", 800), video: true },

  /* Medical credibility */
  "founder-portrait": { ...portrait("Portrait of Soha's medical director, looking directly at the camera.", "Portrait, warm, direct to camera; also the poster for founder-portrait.mp4.", "Medical credibility"), video: true },
  "press-01": { width: 600, height: 200, ratio: "3:1", alt: "Logo of a publication that has featured Soha.", description: "Press logo 1, single colour, transparent background.", section: "Featured in" },
  "press-02": { width: 600, height: 200, ratio: "3:1", alt: "Logo of a publication that has featured Soha.", description: "Press logo 2, same treatment.", section: "Featured in" },
  "press-03": { width: 600, height: 200, ratio: "3:1", alt: "Logo of a publication that has featured Soha.", description: "Press logo 3, same treatment.", section: "Featured in" },
  "press-04": { width: 600, height: 200, ratio: "3:1", alt: "Logo of a publication that has featured Soha.", description: "Press logo 4, same treatment.", section: "Featured in" },
  "press-05": { width: 600, height: 200, ratio: "3:1", alt: "Logo of a publication that has featured Soha.", description: "Press logo 5, same treatment.", section: "Featured in" },
  "qa-01": { ...portrait("The medical director speaking to camera.", "Q&A video poster 1; also the poster for qa-01.mp4.", "Doctor Q&A"), video: true },
  "qa-02": { ...portrait("The medical director speaking to camera.", "Q&A video poster 2; also the poster for qa-02.mp4.", "Doctor Q&A"), video: true },
  "qa-03": { ...portrait("The medical director speaking to camera.", "Q&A video poster 3; also the poster for qa-03.mp4.", "Doctor Q&A"), video: true },
  "qa-04": { ...portrait("The medical director speaking to camera.", "Q&A video poster 4; also the poster for qa-04.mp4.", "Doctor Q&A"), video: true },

  /* How it works */
  "how-01": square("Illustration of a short questionnaire on a phone.", "Step 1 illustration: the quiz on a phone.", "How it works", 800),
  "how-02": square("Illustration of a clinician reviewing notes.", "Step 2 illustration: an OB/GYN reviewing answers.", "How it works", 800),
  "how-03": square("Illustration of a small unbranded parcel.", "Step 3 illustration: the parcel arriving.", "How it works", 800),
  "how-04": square("Illustration of a message thread.", "Step 4 illustration: messaging and adjustments.", "How it works", 800),

  /* Care features */
  "care-01": fourThree("A woman messaging on her phone at a kitchen table.", "Secure messaging with the clinician.", "Care features"),
  "care-02": fourThree("A clinician's hands adjusting notes on a chart.", "Dose adjustments over time.", "Care features"),
  "care-03": fourThree("A clinician on a video call, listening.", "A clinician who knows your history.", "Care features"),

  /* Quality and sourcing */
  "packaging-detail": landscape("Close crop of Estrada packaging showing its texture and finish.", "Close crop, packaging texture and finish.", "Quality and sourcing"),
} as const satisfies Record<string, LandingSlot>;

export type LandingSlotId = keyof typeof landingSlots;

/** Props for <ImageSlot> from the manifest: `<ImageSlot {...slot("hero-product")} priority />`. */
export function slot(id: LandingSlotId) {
  const { width, height, alt } = landingSlots[id];
  return { id, width, height, alt };
}
