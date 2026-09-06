# Offline reference for the shadcn skill

Copied from <https://github.com/shadcn-ui/ui> at commit `7c9eaba` (CLI
`shadcn` 4.21.0, MIT licence in the repository's `LICENSE.md`) on 2026-09-06.
Not part of the upstream skill; added so the skill still has component
documentation and source when the registry host is unreachable.

| Path | From upstream | What |
| ---- | ------------- | ---- |
| `docs/components/base/*.mdx` | `apps/v4/content/docs/components/base/` | Component docs, Base UI base |
| `docs/components/radix/*.mdx` | `apps/v4/content/docs/components/radix/` | Component docs, Radix base |
| `docs/guides/*.mdx` | `apps/v4/content/docs/(root)/` | CLI, components.json, theming, Tailwind v4, React 19, MCP, skills, monorepo, JavaScript, legacy, package imports, directory |
| `docs/installation/*.mdx` | `apps/v4/content/docs/installation/` | Per-framework installation |
| `docs/dark-mode/*.mdx` | `apps/v4/content/docs/dark-mode/` | Dark mode per framework |
| `docs/forms/*.mdx` | `apps/v4/content/docs/forms/` | Form guides |
| `ui/base/*.tsx` | `apps/v4/registry/bases/base/ui/` | Component source, Base UI base |
| `ui/radix/*.tsx` | `apps/v4/registry/bases/radix/ui/` | Component source, Radix base |

The MDX pages keep their site components (`<ComponentPreview>`,
`<ComponentSource>`, `<CodeTabs>`); read past them. `<ComponentSource name="x">`
refers to `ui/<base>/x.tsx` here. The React Aria base and the example and
block sources were not copied.

To refresh: clone the upstream repository and re-copy the paths above, then
update the commit and version in this file and in `SKILL.md`.
