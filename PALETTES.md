# Palettes

Five candidate colour schemes for the site. All five are defined in
`src/config/design-tokens.ts` and emitted as CSS custom-property sets by the
palette plugin in `tailwind.config.ts`, selected by `data-palette` on `<html>`.
Every colour utility on the site reads from the six tokens, so no component
carries a raw hex value.

**To pick one:** set `defaultPalette` in `src/config/design-tokens.ts` to its
letter, then delete the other four entries from `palettes` (and from this
file). Nothing else changes.

**To compare them:** run `npm run dev` and use the floating switcher in the
bottom-right corner, or open any page with `?palette=a` … `?palette=e`. The
switcher and the query parameter exist only in development builds.

## Tokens

| Token           | Role                                                                    | Tailwind utilities                                        |
| --------------- | ----------------------------------------------------------------------- | --------------------------------------------------------- |
| `--bg`          | Page ground                                                             | `bg-base`, `text-on-ink`, `text-on-primary`, `border-base` |
| `--surface`     | Alternating sections, cards, form fields                                | `bg-alt`, `bg-surface`                                    |
| `--accent-soft` | Tints, dividers, image placeholder blocks                               | `bg-accent-soft`, `border-accent-soft`                    |
| `--accent`      | Small emphasis: stars, check marks, timeline dots                       | `text-accent`, `bg-accent`                                |
| `--primary`     | Buttons, dark panels, headline colour on tinted surfaces                | `bg-primary` / `bg-brand`, `text-primary`, `outline-brand` |
| `--ink`         | Text                                                                    | `text-ink`, `bg-ink`                                      |

Two tokens are derived from these so they follow whichever palette is active:
`--ink-muted` (secondary text, ink softened toward the ground; stays at or
above 4.5:1 on `--bg`) and `--primary-hover` (darkened toward ink, or lifted
toward the ground when primary is already near-black, as in D). Each token is
also emitted as an RGB triplet (`--ink-rgb`) so opacity modifiers such as
`text-ink/60` work.

## A · Warm Clay (default)

The current brand direction. Warm, earthy, apothecary.

| Token           | Value     |
| --------------- | --------- |
| `--bg`          | `#F7F3EC` |
| `--surface`     | `#EFE7DA` |
| `--accent-soft` | `#C9A896` |
| `--accent`      | `#B5643F` |
| `--primary`     | `#6E2639` |
| `--ink`         | `#2E2320` |

## B · Clinical Calm

Close to what the competitors use. Cool, soft, medical. Safe and proven in
this category, but it looks like everyone else.

| Token           | Value     |
| --------------- | --------- |
| `--bg`          | `#FBFBFD` |
| `--surface`     | `#F0F2F9` |
| `--accent-soft` | `#C7CDE8` |
| `--accent`      | `#6B76C4` |
| `--primary`     | `#3B3F80` |
| `--ink`         | `#1F2233` |

## C · Sage Apothecary

Muted green and deep ink. Calm and botanical without tipping into wellness
cliché. Reads less gendered than most of the category.

| Token           | Value     |
| --------------- | --------- |
| `--bg`          | `#F6F5F0` |
| `--surface`     | `#E8EAE1` |
| `--accent-soft` | `#B9C4B0` |
| `--accent`      | `#7A8B6F` |
| `--primary`     | `#2C3A34` |
| `--ink`         | `#23291F` |

## D · Ink & Amber

Near-black type on warm off-white, amber only as accent. High contrast and
editorial. The most differentiated of the five and the most dependent on good
photography. Primary and ink are the same colour, so buttons read as black.

| Token           | Value     |
| --------------- | --------- |
| `--bg`          | `#FAF8F5` |
| `--surface`     | `#F0EBE3` |
| `--accent-soft` | `#E0C9A0` |
| `--accent`      | `#C4873D` |
| `--primary`     | `#1C1A17` |
| `--ink`         | `#1C1A17` |

## E · Plum & Blush

Deep plum with dusty rose. Warmest and most traditionally feminine. Risks
looking like a supplement brand if the spacing isn't disciplined.

| Token           | Value     |
| --------------- | --------- |
| `--bg`          | `#FCF8F8` |
| `--surface`     | `#F5EBEC` |
| `--accent-soft` | `#DCC0C6` |
| `--accent`      | `#A85C72` |
| `--primary`     | `#4A2231` |
| `--ink`         | `#2B1A20` |
