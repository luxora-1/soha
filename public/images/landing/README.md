# Landing page imagery — shot list

Every image on `/combination-cream` is an `<ImageSlot>` that resolves to a
file in this folder by convention:

    public/images/landing/{id}.{ext}      ext: jpg, jpeg, png, webp, avif, svg

Until the file exists the slot renders a neutral block at the right aspect
ratio with its id printed in the centre. To fill a slot, drop a file with that
exact name here and reload (rebuild or redeploy in production). Nothing else
changes. Files are cropped to the slot's ratio, never stretched, so shoot a
little loose. The dimensions below are the minimum; larger is fine.

Alt text lives in `src/config/landing-images.ts` next to each id, and that
manifest is the source of this table.

| Slot id                   | Dimensions   | Ratio               | What the image should show                                          |
| ------------------------- | ------------ | ------------------- | -------------------------------------------------------------------- |
| `hero-product`            | 1200 × 1200  | 1:1                 | Product in its pump dispenser, clean background.                     |
| `hero-lifestyle`          | 1200 × 1500  | 4:5                 | Woman, 45–60, natural light, calm and unstaged.                      |
| `comparison-patchwork`    | 1500 × 1000  | 3:2                 | The competing approach: scattered pills, a patch, separate tubes.    |
| `comparison-single`       | 1500 × 1000  | 3:2                 | One dispenser, alone, on a clean surface.                            |
| `ingredient-estradiol`    | 1200 × 1200  | 1:1                 | Abstract or macro texture (estradiol).                               |
| `ingredient-progesterone` | 1200 × 1200  | 1:1                 | Same treatment as estradiol (progesterone).                          |
| `ingredient-base`         | 1200 × 1200  | 1:1                 | Same treatment as estradiol (the cream base).                        |
| `founder-portrait`        | 1200 × 1500  | 4:5                 | Portrait, warm, direct to camera.                                    |
| `testimonial-1`           | 800 × 800    | 1:1                 | Patient portrait 1.                                                  |
| `testimonial-2`           | 800 × 800    | 1:1                 | Patient portrait 2.                                                  |
| `testimonial-3`           | 800 × 800    | 1:1                 | Patient portrait 3.                                                  |
| `packaging-detail`        | 1500 × 1000  | 3:2                 | Close crop, packaging texture and finish.                            |
| `trust-badges`            | 1600 × 320   | 5:1 (wide strip)    | Certification marks in a row, transparent or matching background.    |

Where each appears:

- **Hero** — `hero-product` large, `hero-lifestyle` tucked over its lower-right corner.
- **Credential strip** — `trust-badges`, shown with `object-fit: contain` so a transparent PNG or SVG works best.
- **The problem** — `comparison-patchwork` (left card), `comparison-single` (right, dark card).
- **Ingredients** — the three `ingredient-*` slots, one per card; 96px thumbnails on phones, full tiles from tablet up.
- **Medical credibility** — `founder-portrait`.
- **Quality and sourcing** — `packaging-detail`.
- **Testimonials** — `testimonial-1` … `testimonial-3`.
