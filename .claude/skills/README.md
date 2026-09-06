# Project skills

Skills in this folder load automatically in Claude Code sessions on this
repository (project scope). Each lives in its own directory with a `SKILL.md`.

| Skill | What it is for | Source |
| ----- | -------------- | ------ |
| `frontend-design` | Distinctive visual direction for new UI; avoids templated defaults. | Anthropic |
| `ui-ux-pro-max` | Searchable design intelligence: 79 UI styles, 192 product palettes and reasoning profiles, 74 font pairings, 119 UX guidelines, icons, GSAP presets, chart types, and per-stack guidance (Next.js, React, Tailwind, …). Drives a `--design-system` recommendation for a new page or product. | nextlevelbuilder/ui-ux-pro-max-skill |
| `design-system` | Three-layer design tokens (primitive → semantic → component), component specs, Tailwind integration, plus HTML slide generation. | nextlevelbuilder/ui-ux-pro-max-skill |
| `brand` | Brand voice, visual identity, messaging framework, asset rules and consistency checks. | nextlevelbuilder/ui-ux-pro-max-skill |
| `ui-styling` | shadcn/ui and Tailwind references: components, theming, dark mode, responsive utilities. | nextlevelbuilder/ui-ux-pro-max-skill |

## ui-ux-pro-max and companions

Installed 2026-09-06 from
<https://github.com/nextlevelbuilder/ui-ux-pro-max-skill> at version 2.13.0
(commit `f3ac195`), MIT licence (see `ui-styling/LICENSE.txt`; the upstream
`LICENSE` applies to the rest). Files were copied from the upstream
`.claude/skills/` folder, which is the plugin's installable payload.

What was changed or left out:

- `ui-ux-pro-max/SKILL.md`: the search-script path was rewritten from the
  plugin form (`${CLAUDE_PLUGIN_ROOT}/…`) to the project-relative
  `.claude/skills/ui-ux-pro-max/scripts/search.py`, which is what the
  upstream `uipro init --ai claude` installer generates. Run it from the
  project root. Nothing else in the skill was edited.
- `ui-styling/canvas-fonts/` (5.5 MB of TTF files used only for generating
  poster images) and two test-coverage artifacts were not copied. The
  Tailwind and shadcn references are complete.
- Three upstream skills were not installed because they are not about
  building websites: `design` (logo, icon and corporate-identity image
  generation through third-party AI APIs that need keys), `slides` and
  `banner-design`. Copy them from the same upstream folder if wanted.

Requirements: Python 3 for the `ui-ux-pro-max` and `design-system` search
scripts (standard library only, no network access) and Node for the `brand`
and `design-system` token scripts. The scripts read bundled CSV files; they
install nothing.

Typical use on this repository:

```bash
# Direction for a new page or product (pattern, style, palette, type, effects, anti-patterns)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "women's health telehealth wellness premium" --design-system -p "Soha"

# One focused concern
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "carousel pause controls reduced motion" --domain ux

# Stack-specific guidance for this codebase
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "image priority lcp" --stack nextjs
```

The results are recommendations from a keyword database, not decisions: this
site's palette and type are fixed in `src/config/design-tokens.ts` and
`tailwind.config.ts`, and `PALETTES.md` records the choice. Use the skill for
patterns, UX rules, motion and stack checks, and weigh any palette or font
suggestion against those files.

To update: clone the upstream repository, compare its `.claude/skills/`
folder with this one, re-apply the path rewrite above, and record the new
version and commit here.
