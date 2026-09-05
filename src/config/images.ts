/**
 * Image manifest — every photographic slot on the site, numbered in page
 * order. The placeholder block for each slot displays its number, so
 * "this photo goes to 03" is all anyone needs to say.
 *
 * TO ADD A PHOTO: put a file named by the slot number into public/images/
 * (01.jpg, 02.jpg, … — .jpg, .jpeg, .png or .webp all work) and rebuild or
 * redeploy. No code change. The matching <SiteImage> then renders the photo
 * with next/image instead of the IMAGE_PLACEHOLDER block.
 *
 * `alt` is the accessible description (empty = decorative).
 * `brief` is the art-direction note for whoever sources the photo.
 */

export type ImageSlot = {
  number: string;
  alt: string;
  brief: string;
  /** Aspect ratio the slot is displayed at (large screens). */
  ratio: "portrait" | "landscape" | "wide" | "square";
};

export const imageManifest = {
  "home-hero": {
    number: "01",
    ratio: "portrait",
    alt: "A woman in her mid-forties seated by a window in warm morning light, smiling softly.",
    brief: "Homepage hero. Mid-40s, warm natural light at home, cream top, quietly confident. Candidate: cream-top portrait (Higgsfield job f50c0ed1).",
  },
  "how-step-01": {
    number: "02",
    ratio: "landscape",
    alt: "A woman at a wooden kitchen table typing on a laptop in soft morning light.",
    brief: "How it works, step 01. Kitchen table, laptop, morning light. Candidate: job 56b0966f.",
  },
  "how-step-02": {
    number: "03",
    ratio: "landscape",
    alt: "A clinician's hands writing notes beside a laptop on a warm oak desk.",
    brief: "How it works, step 02. Hands writing notes beside a laptop, no logos. Candidate: job a1fb91a9.",
  },
  "how-step-03": {
    number: "04",
    ratio: "landscape",
    alt: "Hands lifting the lid of a plain cream box on a linen-covered table.",
    brief: "How it works, step 03. Hands opening a plain cream box. Candidate: job b2a46441; alternate: box on console, job c133b43a.",
  },
  "product-hero": {
    number: "05",
    ratio: "portrait",
    alt: "The Estrada pump bottle, frosted with a gold band, standing on warm stone in morning light.",
    brief: "The Product page hero. Real Estrada packaging shot (client-supplied).",
  },
  "start-aside": {
    number: "06",
    ratio: "portrait",
    alt: "",
    brief: "Start your consult, right column on large screens. Woman on a sofa with her phone, relaxed. Candidate: job 95693959.",
  },
  "how-cycle": {
    number: "07",
    ratio: "wide",
    alt: "",
    brief: "How it works, wide band above the cycle section. Woman walking a garden path in golden light. Candidates: jobs f98ece6c, 062fdee1.",
  },
  "product-detail": {
    number: "08",
    ratio: "landscape",
    alt: "The Estrada bottle with cream swirled around it.",
    brief: "The Product page, beside \"How it's dosed\". Second Estrada render (client-supplied).",
  },
  "home-closing": {
    number: "09",
    ratio: "wide",
    alt: "",
    brief: "Homepage closing panel, full-bleed behind the headline. Woman with a mug in her kitchen, or a garden walk. Candidates: jobs 53205941, f98ece6c.",
  },
} as const satisfies Record<string, ImageSlot>;

/**
 * Optional ambient video for the hero. Drop public/video/01.mp4 (H.264, muted,
 * a few seconds, loops cleanly) and the hero plays it behind the still, which
 * remains the poster. Skipped for reduced-motion users and data-saver.
 */
export const heroVideo = { number: "01", extensions: ["mp4", "webm"] as const };

export type ImageSlotName = keyof typeof imageManifest;

/** Accepted extensions, checked in this order. */
export const imageExtensions = ["jpg", "jpeg", "png", "webp"] as const;
