@AGENTS.md

## Design skills

Project skills for UI work live in `.claude/skills/`; `.claude/skills/README.md` lists them, including the `ui-ux-pro-max` design-intelligence search (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`). Palette and type for this site are fixed in `src/config/design-tokens.ts`; treat the skill's colour and font suggestions as reference only.

Motion on this site is GSAP: one orchestrator in `src/lib/motion/orchestrate.ts`, mounted once per route by `src/components/motion/MotionRoot.tsx`, reads data attributes (`data-reveal`, `data-split`, `data-count`, `data-timeline`, …) declared in the server components; CSS keyframes in `tailwind.config.ts` cover the marquee, dialogs and small loops. Read the `gsap-*` skills before touching it, keep new effects in the orchestrator rather than in components, and do not add a second animation library.
