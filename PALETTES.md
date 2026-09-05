# Palette

**A · Warm Clay** is the site's palette, chosen on 2026-09-05 from five
candidates (Warm Clay, Clinical Calm, Sage Apothecary, Ink & Amber, Plum &
Blush). The other four were removed from the code; their values are in the
git history of this file if they are ever needed again.

The palette is defined once in `src/config/design-tokens.ts` and emitted as
CSS custom properties on `:root` by the palette plugin in
`tailwind.config.ts`. Every colour utility reads those variables, so no
component carries a raw hex value.

**To trial another scheme:** add an entry to `palettes` and `paletteOrder`
in `src/config/design-tokens.ts`, then point `defaultPalette` at it. Nothing
else changes.

## A · Warm Clay

Warm, earthy, apothecary.

| Token           | Value     | Role                                                    | Tailwind utilities                                          |
| --------------- | --------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| `--bg`          | `#F7F3EC` | Page ground                                             | `bg-base`, `text-on-ink`, `text-on-primary`, `border-base`  |
| `--surface`     | `#EFE7DA` | Alternating sections, cards, form fields                | `bg-alt`, `bg-surface`                                      |
| `--accent-soft` | `#C9A896` | Tints, dividers, image placeholder blocks               | `bg-accent-soft`, `border-accent-soft`                      |
| `--accent`      | `#B5643F` | Small emphasis: stars, check marks, timeline dots       | `text-accent`, `bg-accent`                                  |
| `--primary`     | `#6E2639` | Buttons, dark panels, headline colour on tinted surfaces | `bg-primary` / `bg-brand`, `text-primary`, `outline-brand`  |
| `--ink`         | `#2E2320` | Text                                                    | `text-ink`, `bg-ink`                                        |

Two tokens are derived from these so they follow the palette automatically:
`--ink-muted` (secondary text, ink softened toward the ground; at or above
4.5:1 on `--bg`) and `--primary-hover` (primary darkened toward ink). Each
token is also emitted as an RGB triplet (`--ink-rgb`) so opacity modifiers
such as `text-ink/60` work.
