# Project skills

Skills in this folder load automatically in Claude Code sessions on this
repository (project scope). Each lives in its own directory with a `SKILL.md`.

| Skill | What it is for | Source |
| ----- | -------------- | ------ |
| `frontend-design` | Distinctive visual direction for new UI; avoids templated defaults. | anthropics/claude-code, `plugins/frontend-design` v1.1.0 (checked identical to upstream at commit `ab9b2cf`, 2026-09-06) |
| `ui-ux-pro-max` | Searchable design intelligence: 79 UI styles, 192 product palettes and reasoning profiles, 74 font pairings, 119 UX guidelines, icons, GSAP presets, chart types, and per-stack guidance (Next.js, React, Tailwind, …). Drives a `--design-system` recommendation for a new page or product. | nextlevelbuilder/ui-ux-pro-max-skill |
| `design-system` | Three-layer design tokens (primitive → semantic → component), component specs, Tailwind integration, plus HTML slide generation. | nextlevelbuilder/ui-ux-pro-max-skill |
| `brand` | Brand voice, visual identity, messaging framework, asset rules and consistency checks. | nextlevelbuilder/ui-ux-pro-max-skill |
| `ui-styling` | shadcn/ui and Tailwind references: components, theming, dark mode, responsive utilities. | nextlevelbuilder/ui-ux-pro-max-skill |
| `claude-opus-4-5-migration` | Migrate prompts and code from Claude Sonnet 4.0, Sonnet 4.5, or Opus 4.1 to Opus 4.5. Use when the user wants to update their codebase, prompts, or API calls to use… | anthropics/claude-code, `plugins/claude-opus-4-5-migration` |
| `writing-rules` | This skill should be used when the user asks to "create a hookify rule", "write a hook rule", "configure hookify", "add a hookify rule", or needs guidance on hookify… | anthropics/claude-code, `plugins/hookify` |
| `agent-development` | This skill should be used when the user asks to "create an agent", "add an agent", "write a subagent", "agent frontmatter", "when to use description", "agent… | anthropics/claude-code, `plugins/plugin-dev` |
| `command-development` | This skill should be used when the user asks to "create a slash command", "add a command", "write a custom command", "define command arguments", "use command… | anthropics/claude-code, `plugins/plugin-dev` |
| `hook-development` | This skill should be used when the user asks to "create a hook", "add a PreToolUse/PostToolUse/Stop hook", "validate tool use", "implement prompt-based hooks", "use… | anthropics/claude-code, `plugins/plugin-dev` |
| `mcp-integration` | This skill should be used when the user asks to "add MCP server", "integrate MCP", "configure MCP in plugin", "use .mcp.json", "set up Model Context Protocol",… | anthropics/claude-code, `plugins/plugin-dev` |
| `plugin-settings` | This skill should be used when the user asks about "plugin settings", "store plugin configuration", "user-configurable plugin", ".local.md files", "plugin state… | anthropics/claude-code, `plugins/plugin-dev` |
| `plugin-structure` | This skill should be used when the user asks to "create a plugin", "scaffold a plugin", "understand plugin structure", "organize plugin components", "set up… | anthropics/claude-code, `plugins/plugin-dev` |
| `skill-development` | This skill should be used when the user wants to "create a skill", "add a skill to plugin", "write a new skill", "improve skill description", "organize skill… | anthropics/claude-code, `plugins/plugin-dev` |
| `shadcn` | shadcn/ui's official skill: project context via `npx shadcn@latest info`, composition and styling rules, CLI, presets, registries, MCP server. Extended here with an offline copy of component docs and source (`references/`). | shadcn-ui/ui, `skills/shadcn` |
| `migrate-radix-to-base` | shadcn/ui's official migration skill from Radix UI to Base UI, component by component. | shadcn-ui/ui, `skills/migrate-radix-to-base` |

## Skills from shadcn-ui/ui

Installed 2026-09-06 from <https://github.com/shadcn-ui/ui> at commit
`7c9eaba` (CLI 4.21.0, MIT). The upstream install command is
`npx skills add shadcn/ui`, which copies the same `skills/shadcn` folder; the
two skills here are unchanged copies except for one section appended to
`shadcn/SKILL.md` that points at `shadcn/references/`, an offline snapshot of
the component documentation and source for the Base UI and Radix bases (see
`shadcn/references/README.md`). The skill's own commands need the shadcn
registry at `ui.shadcn.com`, which this hosted build environment blocks; the
snapshot exists for that case. On a machine with normal network access the
live CLI is preferred.

The shadcn skill runs `npx shadcn@latest info --json` when it loads, to read
the project's `components.json`. This repository has no `components.json`:
the marketing site uses its own token system (`src/config/design-tokens.ts`),
not shadcn components. Adding shadcn to this site would mean mapping its
semantic colour variables onto that palette, a separate decision.

Optional, on your own machine: `npx shadcn@latest mcp init --client claude`
writes a `.mcp.json` for the shadcn MCP server (registry search, view and
install as tools). It was not committed here because the registry is
unreachable from the hosted environment.

## Skills from anthropics/claude-code

Installed 2026-09-06 from <https://github.com/anthropics/claude-code> at
commit `ab9b2cf` (the repository's `plugins/` marketplace, MIT licence in its
`LICENSE.md`). Every skill that marketplace ships is here: `frontend-design`
(v1.1.0, the one used for website work), `claude-opus-4-5-migration`,
hookify's `writing-rules` (its `examples/` folder was copied into the skill
and the one reference to `${CLAUDE_PLUGIN_ROOT}` in it points there now), and
the seven `plugin-dev` skills for writing Claude Code plugins. The
`plugin-dev` and `mcp-integration` texts mention `${CLAUDE_PLUGIN_ROOT}` as
subject matter, which is correct and was left alone.

Not installed from that repository: its slash commands, agents and hooks
(code-review, pr-review-toolkit, feature-dev, commit-commands, agent-sdk-dev,
security-guidance, ralph-wiggum and the two output styles). Those are plugins
rather than skills and are best added on a machine with `/plugin marketplace
add anthropics/claude-code`.

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
