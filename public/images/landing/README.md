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

## Reference stills standing in (temporary, 2026-09-05)

REFERENCE_PHOTO_PLACEHOLDER: seven files in this folder are photographs taken
from the two competitor pages supplied as design references, re-graded to the
site palette (cool and neutral since the 2026-09-06 Periwinkle change) so the
layout can be judged with real photography in place.
They were put here on the client's instruction ("use the reference pictures,
I'll replace later"). They are not Soha's to publish: replace every one of
them before launch. The launch gate (`npm run launch-check`) fails while this
marker remains.

No photograph of an identifiable person is used as Soha's clinician or as a
patient; the two people shown are lifestyle stand-ins only.

| File                          | Source page | What it shows                                  | Treatment                                   |
| ----------------------------- | ----------- | ---------------------------------------------- | ------------------------------------------- |
| `hero-03.jpg`                 | Elsie       | Applying cream to the shoulder                 | 4:5 crop, cool grade                        |
| `supports-lifestyle.jpg`      | Oestra      | Arms raised in the sun (cut-out)               | Set on a pale periwinkle ground, cool grade |
| `comparison-patchwork.jpg`    | Elsie       | Patch, pill and a smear of cream (cut-out)     | Set on a pale periwinkle ground, soft shadow |
| `ingredient-estradiol.jpg`    | Elsie       | Macro crystals                                 | Blue tritone (navy → periwinkle → pale)     |
| `ingredient-progesterone.jpg` | Elsie       | Macro crystals                                 | Blue tritone                                |
| `ingredient-base.jpg`         | Elsie       | Cream swoosh                                   | Blue tritone                                |
| `how-03.jpg`                  | Elsie       | Parcel on a conveyor (small; shown at 96px)    | Cool grade                                  |

The grading is reproducible: the same script (a short Pillow routine) can be
applied to the Higgsfield renders above once they are downloaded, so every
photograph on the page shares one cool, neutral cast.

## Generated stand-ins waiting in Higgsfield (2026-09-05)

Nineteen placeholder photographs were generated in the Soha Higgsfield
account so the layout can be judged before real photography exists. They
could not be downloaded from the build environment (the image host is not on
its network allow-list), so they are in the account's gallery. To use them:
open each in Higgsfield, download it, name it exactly as below, and drop it
into this folder. Every slot falls back to the labelled block if its file is
missing. These are stand-ins, not brand photography; replace them.

No people who could be mistaken for the medical director, patients, or press
were generated: `founder-portrait`, `testimonial-*`, `qa-*`, `press-*`,
`certification-*` and `how-*` stay as labelled blocks until real assets exist.

| File name to use              | Higgsfield job                          | Model                   | What it shows                                              |
| ----------------------------- | --------------------------------------- | ----------------------- | ---------------------------------------------------------- |
| `hero-product.jpg`            | `8a39ec30-d7f2-4776-b476-c0c321b19129`  | marketing_studio_image  | Frosted pump dispenser, gold band, cream travertine        |
| `product-hotspots.jpg`        | `f8948445-3781-4266-bada-c8671707ae37`  | marketing_studio_image  | Dispenser centred on clay backdrop, space for hotspots     |
| `comparison-single.jpg`       | `507074e4-9930-400a-85c8-e351a128649c`  | marketing_studio_image  | One dispenser on linen                                     |
| `comparison-patchwork.jpg`    | `3d06149c-8a38-438f-8294-fddaf72bd172`  | marketing_studio_image  | Scattered tablets, patch, tubes, pill bottle               |
| `packaging-detail.jpg`        | `5e78a8be-a875-492b-95aa-f45905bc62ff`  | marketing_studio_image  | Embossed cream box close-up                                |
| `hero-04.jpg`                 | `bc1b0c6c-e707-4317-922a-cf5073150882`  | marketing_studio_image  | Dispenser and box on a bathroom shelf                      |
| `ingredient-estradiol.jpg`    | `d30cc948-bdcf-432e-8d57-21bbfcf65da6`  | marketing_studio_image  | Macro cream swirl, terracotta light                        |
| `ingredient-progesterone.jpg` | `b0651d76-ade1-4e30-86b3-93b265dfd86d`  | marketing_studio_image  | Macro powder and wax droplet                               |
| `ingredient-base.jpg`         | `46942914-77d9-4b8b-9066-cfb7324ce362`  | marketing_studio_image  | Macro matte cream with fingertip sweep                     |
| `hero-lifestyle.jpg`          | `24b4700b-cf81-4308-afb0-b47adf4b521e`  | soul_2                  | Woman in her fifties by a window, linen shirt              |
| `hero-03.jpg`                 | `2266c532-7523-42bc-b034-b909f0bc18ab`  | soul_2                  | Hands pressing one pump onto a forearm                     |
| `supports-lifestyle.jpg`      | `ee42071f-6cd8-436b-8af9-493f4ae57717`  | soul_2                  | Two women laughing over coffee                             |
| `timeline-week-2.jpg`         | `fee3ca1e-3807-4475-a112-db36d3d81868`  | soul_2                  | Asleep in linen bedding, dawn light                        |
| `timeline-week-4.jpg`         | `698c7602-9607-4ca9-bef5-0187bf3d01c2`  | soul_2                  | Walking outdoors in a camel jacket                         |
| `timeline-week-6.jpg`         | `c4ae9fd5-17fd-4885-aace-77a108fe22cd`  | soul_2                  | Working at a wooden table                                  |
| `timeline-week-8.jpg`         | `902628d3-6a68-4dd8-93c9-8d29fb0e67c0`  | soul_2                  | Stretching after a walk, golden light                      |
| `care-01.jpg`                 | `c9656821-b41f-4e4d-9b32-4dad05cd0f79`  | soul_2                  | Reading a message at a kitchen table                       |
| `care-02.jpg`                 | `c2dfd74a-d0d1-4ad5-a105-8220e6b47247`  | soul_2                  | Clinician's hands writing notes, no face                   |
| `care-03.jpg`                 | `3936df73-5f21-43ea-a481-e30aaf30bf80`  | soul_2                  | Clinician on a video call, seen from the side              |
