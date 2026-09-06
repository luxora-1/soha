# Palette

**B · Periwinkle** is the site's palette from 2026-09-06, when the client asked
for the brand identity of innerbalance.com (the Oestra pages, one of the two
design references) to be taken over. Its values were sampled from that site:
the periwinkle of its buttons, pills, stars and wordmark; the royal blue of its
running text; the navy of its dark modules; the pale periwinkle of its
alternating sections. **A · Warm Clay**, chosen on 2026-09-05 from five
candidates (Warm Clay, Clinical Calm, Sage Apothecary, Ink & Amber, Plum &
Blush), stays in the code so the change can be undone by pointing
`defaultPalette` at `"a"` in `src/config/design-tokens.ts`. The other three
candidates are in the git history of this file.

The palette is defined once in `src/config/design-tokens.ts` and emitted as
CSS custom properties on `:root` by the palette plugin in
`tailwind.config.ts`. Every colour utility reads those variables, so no
component carries a raw hex value.

**To trial another scheme:** add an entry to `palettes` and `paletteOrder`
in `src/config/design-tokens.ts`, then point `defaultPalette` at it. Nothing
else changes.

## B · Periwinkle (default)

Cool, clinical, confident. White ground, pale periwinkle sections, periwinkle
actions, royal-blue text, navy panels.

| Token           | Value     | Role                                                        | Tailwind utilities                                                       |
| --------------- | --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| `--bg`          | `#FFFFFF` | Page ground                                                 | `bg-base`, `text-on-ink`, `text-on-primary`, `text-on-panel`, `border-base` |
| `--surface`     | `#E9EDF7` | Alternating sections, cards, form fields                    | `bg-alt`, `bg-surface`                                                   |
| `--accent-soft` | `#C6CFEA` | Tints, dividers, image placeholder blocks                   | `bg-accent-soft`, `border-accent-soft`                                   |
| `--accent`      | `#5471CC` | Small emphasis: stars, check marks, timeline dots           | `text-accent`, `bg-accent`                                               |
| `--primary`     | `#5471CC` | Buttons, pills, links, the wordmark, eyebrows               | `bg-primary` / `bg-brand`, `text-primary`, `outline-brand`               |
| `--panel`       | `#1E2949` | Dark modules: stat tiles, comparison column, guarantee, closing | `bg-panel`, `text-panel`                                              |
| `--ink`         | `#183590` | Text; the announcement bar                                  | `text-ink`, `bg-ink`                                                     |

## A · Warm Clay

Warm, earthy, apothecary.

| Token           | Value     | Role                                                        | Tailwind utilities                                                       |
| --------------- | --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| `--bg`          | `#F7F3EC` | Page ground                                                 | `bg-base`, `text-on-ink`, `text-on-primary`, `text-on-panel`, `border-base` |
| `--surface`     | `#EFE7DA` | Alternating sections, cards, form fields                    | `bg-alt`, `bg-surface`                                                   |
| `--accent-soft` | `#C9A896` | Tints, dividers, image placeholder blocks                   | `bg-accent-soft`, `border-accent-soft`                                   |
| `--accent`      | `#B5643F` | Small emphasis: stars, check marks, timeline dots           | `text-accent`, `bg-accent`                                               |
| `--primary`     | `#6E2639` | Buttons, pills, links, the wordmark, eyebrows               | `bg-primary` / `bg-brand`, `text-primary`, `outline-brand`               |
| `--panel`       | `#6E2639` | Dark modules                                                | `bg-panel`, `text-panel`                                                 |
| `--ink`         | `#2E2320` | Text; the announcement bar                                  | `text-ink`, `bg-ink`                                                     |

Two tokens are derived from these so they follow the palette automatically:
`--ink-muted` (secondary text: ink softened toward the ground as far as keeps
4.5:1 on `--bg`) and `--primary-hover` (primary darkened toward ink). Each
token is also emitted as an RGB triplet (`--ink-rgb`) so opacity modifiers
such as `text-ink/60` work.

## Type

From 2026-09-06 the type follows the same identity: **Inter** for headlines
(weight 600, tight tracking), body (400) and the uppercase, tracked button
and eyebrow labels; **Newsreader** only as the italic accent word inside a
headline (`<em>` in an `h1` or `h2`) and in the product name pill. Both are
loaded through `next/font/google` in `src/lib/fonts.ts`. Before that the site
set Fraunces headlines over Instrument Sans.
