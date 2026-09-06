---
name: design-styles
description: Catalog of 67 named design-system presets (terracotta, editorial, bento, brutalism, glassmorphism, neumorphism, claymorphism, minimal, premium, refined, retro, neon, cosmic, paper, riso, sketch and more), each with colour, typography and spacing tokens plus a guideline prompt. Use when the user names a visual style, asks to pick or compare visual directions for a site or app, wants a starting token set for a look, or says "make it look like <style>". Read catalog.md first, then the chosen style's folder.
license: MIT
metadata:
  source: https://github.com/bergside/awesome-design-skills (typeui.sh presets), commit f631a09, installed 2026-09-06
---

# Design styles

Sixty-seven design-system presets from typeui.sh, collected in
bergside/awesome-design-skills. Upstream expects one style to be pulled into
a project (`npx typeui.sh pull <style>`); here the whole catalog is kept as
reference so a direction can be chosen and its tokens applied in one step.

Each style lives in `styles/<name>/` as two files:

- `SKILL.md`: the agent guideline. The useful part is **Brand** and **Style
  Foundations**: colour tokens, font families, type scale and spacing scale.
  The rest of the file is a shared template about how to write design-system
  guidance and is the same in every style.
- `DESIGN.md`: the same tokens as YAML front matter (colours, typography,
  radius, spacing) with a short rationale. Easiest source for values.

## Workflow

1. **Pick.** Read [catalog.md](./catalog.md): one row per style with its
   description, primary and secondary colours and fonts. Shortlist two or
   three that fit the product and audience. A rendered marketing page for
   each exists at `https://typeui.sh/design-skills/<name>`; describe the
   candidates to the user and let them choose unless the direction is
   already fixed.
2. **Read** `styles/<name>/DESIGN.md` for the tokens and
   `styles/<name>/SKILL.md` for the brand paragraph and any do/don't rules.
3. **Apply** the tokens where the project keeps them, never inline:
   - Tailwind v3: `theme.colors`, `fontFamily`, `spacing`, `borderRadius` in
     `tailwind.config.*`, or CSS custom properties that the config reads.
   - Tailwind v4: an `@theme` block in the global CSS.
   - Fonts: load with `next/font` (Next.js) or a `<link>` to Google Fonts,
     and give every family a real fallback stack.
4. **Check** before delivering: body text 16px or larger, text contrast at
   least 4.5:1 against its surface (several presets pair a mid-tone accent
   with white, which fails for small text), visible focus states, and
   `prefers-reduced-motion` respected. Where a preset conflicts with
   accessibility, accessibility wins.

## What these presets are, and are not

- They are starting points: a palette of five to seven values, two or three
  font families and a scale. They are not brand guidelines and they carry no
  component code. Some front matter is loose (a "Visual style" line such as
  "modern, clean, high-contrast, playful" appears on several styles; a few
  Brand sections are empty). Take the tokens, judge the adjectives.
- Names such as `claude`, `codex`, `shadcn`, `material`, `ant`, `roku`,
  `sega`, `pacman`, `tetris`, `lingo` and `minimax` are looks inspired by
  those products, not their official design systems.
- A style here is unrelated to the `shadcn` skill installed alongside this
  one; that skill manages shadcn/ui components.

## On this repository

The Soha marketing site's palette and type are fixed in
`src/config/design-tokens.ts` and `tailwind.config.ts` (Warm Clay: cream,
clay, burgundy, ink, Fraunces and Inter; see `PALETTES.md`). Do not swap them
for a preset. The closest presets, `terracotta`, `cafe`, `paper` and
`refined`, are useful as comparison points when discussing direction or when
building a different site.

## Promoting one style to its own skill

If a project settles on a style and wants it to load automatically, copy
`styles/<name>/` to `.claude/skills/style-<name>/` and change its front
matter `name:` to `style-<name>` so it cannot collide with other skills.
Keep this catalog as it is.
