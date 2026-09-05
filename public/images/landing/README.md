# Landing page imagery — shot list

Every image on `/combination-cream` is an `<ImageSlot>` that resolves to a
file in this folder by convention:

    public/images/landing/{id}.{ext}      ext: jpg, jpeg, png, webp, avif, svg

Until the file exists the slot renders a neutral block at the right aspect
ratio with its id printed in the centre. To fill a slot, drop a file with that
exact name here and reload (rebuild or redeploy in production). Nothing else
changes. Files are cropped to the slot's ratio, never stretched, so shoot a
little loose. The dimensions below are the minimum; larger is fine.

**Video.** Slots marked as accepting a video are also posters: drop
`public/video/landing/{id}.mp4` (or `.webm`) and a play button appears over
the image, opening the video in a dialog. Keep clips under a minute and a few
megabytes; H.264 MP4 plays everywhere.

Alt text lives in `src/config/landing-images.ts` next to each id. That
manifest is the source of the table below; regenerate it with
`node scripts/landing-shot-list.mjs`.

<!-- BEGIN GENERATED: node scripts/landing-shot-list.mjs -->

| Slot id | Dimensions | Ratio | Where | What the image should show |
| --- | --- | --- | --- | --- |
| `hero-product` | 1200 × 1200 | 1:1 | Hero carousel | Slide 1. Product in its pump dispenser, clean background. |
| `hero-lifestyle` | 1200 × 1500 | 4:5 | Hero carousel | Slide 2. Woman, 45–60, natural light, calm and unstaged. |
| `hero-03` | 1200 × 1500 | 4:5 | Hero carousel | Slide 3. One pump being applied to the skin, close and warm. |
| `hero-04` | 1200 × 1500 | 4:5 | Hero carousel | Slide 4. Packaging and dispenser at home, morning light. |
| `certification-01` | 480 × 320 | 3:2 | Certification strip | Certification mark (e.g. PCAB), transparent or matching background. |
| `certification-02` | 480 × 320 | 3:2 | Certification strip | Certification mark (e.g. NABP), same treatment. |
| `certification-03` | 480 × 320 | 3:2 | Certification strip | Certification mark (e.g. LegitScript), same treatment. |
| `certification-04` | 480 × 320 | 3:2 | Certification strip | Certification mark (e.g. state board of pharmacy), same treatment. |
| `certification-05` | 480 × 320 | 3:2 | Certification strip | Certification mark (e.g. 503A registration), same treatment. |
| `supports-lifestyle` | 1200 × 1500 | 4:5 | Estrada supports | Warm, candid, mid-fifties; the feeling of having yourself back. |
| `comparison-patchwork` | 1500 × 1000 | 3:2 | The problem | The competing approach: scattered pills, a patch, separate tubes. |
| `comparison-single` | 1500 × 1000 | 3:2 | The problem | One dispenser, alone, on a clean surface. |
| `product-hotspots` | 1200 × 1500 | 4:5 | Estrada vs other methods | Product shot centred with generous space around it; hotspot labels overlay it. |
| `ingredient-estradiol` | 1200 × 1200 | 1:1 | Ingredient cards | Abstract or macro texture (estradiol). |
| `ingredient-progesterone` | 1200 × 1200 | 1:1 | Ingredient cards | Same treatment as estradiol (progesterone). |
| `ingredient-base` | 1200 × 1200 | 1:1 | Ingredient cards | Same treatment as estradiol (the cream base). |
| `timeline-week-2` | 1600 × 1200 | 4:3 | Timeline | Week 2: sleep. Bedroom, morning light, calm. |
| `timeline-week-4` | 1600 × 1200 | 4:3 | Timeline | Week 4: fewer hot flashes. Outdoors, cool light. |
| `timeline-week-6` | 1600 × 1200 | 4:3 | Timeline | Week 6: steadier days. Focused work, natural light. |
| `timeline-week-8` | 1600 × 1200 | 4:3 | Timeline | Week 8: more like yourself. Movement, open air. |
| `testimonial-1` | 800 × 800 | 1:1 | Testimonials | Patient portrait 1; also the poster for testimonial-1.mp4. Also accepts a video of the same name. |
| `testimonial-2` | 800 × 800 | 1:1 | Testimonials | Patient portrait 2; also the poster for testimonial-2.mp4. Also accepts a video of the same name. |
| `testimonial-3` | 800 × 800 | 1:1 | Testimonials | Patient portrait 3; also the poster for testimonial-3.mp4. Also accepts a video of the same name. |
| `founder-portrait` | 1200 × 1500 | 4:5 | Medical credibility | Portrait, warm, direct to camera; also the poster for founder-portrait.mp4. Also accepts a video of the same name. |
| `press-01` | 600 × 200 | 3:1 | Featured in | Press logo 1, single colour, transparent background. |
| `press-02` | 600 × 200 | 3:1 | Featured in | Press logo 2, same treatment. |
| `press-03` | 600 × 200 | 3:1 | Featured in | Press logo 3, same treatment. |
| `press-04` | 600 × 200 | 3:1 | Featured in | Press logo 4, same treatment. |
| `press-05` | 600 × 200 | 3:1 | Featured in | Press logo 5, same treatment. |
| `qa-01` | 1200 × 1500 | 4:5 | Doctor Q&A | Q&A video poster 1; also the poster for qa-01.mp4. Also accepts a video of the same name. |
| `qa-02` | 1200 × 1500 | 4:5 | Doctor Q&A | Q&A video poster 2; also the poster for qa-02.mp4. Also accepts a video of the same name. |
| `qa-03` | 1200 × 1500 | 4:5 | Doctor Q&A | Q&A video poster 3; also the poster for qa-03.mp4. Also accepts a video of the same name. |
| `qa-04` | 1200 × 1500 | 4:5 | Doctor Q&A | Q&A video poster 4; also the poster for qa-04.mp4. Also accepts a video of the same name. |
| `how-01` | 800 × 800 | 1:1 | How it works | Step 1 illustration: the quiz on a phone. |
| `how-02` | 800 × 800 | 1:1 | How it works | Step 2 illustration: an OB/GYN reviewing answers. |
| `how-03` | 800 × 800 | 1:1 | How it works | Step 3 illustration: the parcel arriving. |
| `how-04` | 800 × 800 | 1:1 | How it works | Step 4 illustration: messaging and adjustments. |
| `care-01` | 1600 × 1200 | 4:3 | Care features | Secure messaging with the clinician. |
| `care-02` | 1600 × 1200 | 4:3 | Care features | Dose adjustments over time. |
| `care-03` | 1600 × 1200 | 4:3 | Care features | A clinician who knows your history. |
| `packaging-detail` | 1500 × 1000 | 3:2 | Quality and sourcing | Close crop, packaging texture and finish. |

<!-- END GENERATED -->

Notes by section:

- **Hero carousel** — four 4:5 slides that auto-advance. `hero-product` is shown uncropped on a tinted surface, so a square shot is fine; the other three fill the frame.
- **Certification strip** — the five marks glide in cards, shown with `object-fit: contain`; transparent PNGs or SVGs work best.
- **Estrada vs other methods** — `product-hotspots` sits under three "+" markers at fixed positions (progesterone upper right, estradiol left of centre, base lower right). Leave space around the dispenser.
- **Featured in** — press logos, single colour on transparent, roughly 3:1.
- **How it works** — small illustrations; simple line art in the accent colour reads best at 96px.
