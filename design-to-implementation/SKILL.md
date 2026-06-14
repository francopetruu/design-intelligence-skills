---
name: design-to-implementation
description: Implements approved design improvements in code using brandbook constraints, shadcn/ui patterns, and distinctive frontend aesthetics. Use when applying a design proposal, building redesigned UI components, or migrating visual styles in a codebase.
---

# Design to Implementation

Execute approved items from the design proposal. Extends Anthropic `frontend-design` with brandbook-first constraints — do not pick a random aesthetic direction.

## Prerequisites

- Approved proposal (P0 minimum)
- Brandbook JSON for token preservation
- ADR if stack was decided
- Repo access or greenfield scaffold path

## Design thinking (mandatory)

Before coding, answer from **brandbook + proposal**, not generic taste:

1. **Purpose** — What problem does this UI solve? Who uses it?
2. **Tone** — From brand `voice` tags; pick one clear direction aligned with proposal
3. **Constraints** — Framework, ADR, existing tokens, a11y level
4. **Differentiation** — One memorable element from proposal P1+; do not add unrelated flair
5. **Preserve** — List brand elements that must not change (logo, primary color, copy tone)

Then read Anthropic `frontend-design` skill for execution quality (typography, motion, spatial composition, backgrounds).

## shadcn-aware workflow

If `components.json` exists:

```bash
npx shadcn info --json
```

- Respect `aliases`, `tailwind`, `iconLibrary`, installed components
- Add components via `npx shadcn add <name>` — do not paste raw Radix copies
- Customize via CSS variables in `globals.css`, not inline hex overrides
- Follow shadcn skill: `FieldGroup` for forms, semantic colors, base-specific APIs

If no shadcn: match project component patterns from codebase search.

## Implementation workflow

```
Implementation Progress:
- [ ] Map P0/P1 items → files/routes
- [ ] Extract or define design tokens (CSS variables OKLCH)
- [ ] Implement vertical slice 1 (highest-impact page/component)
- [ ] Screenshot before state (if migrating)
- [ ] Apply changes
- [ ] Screenshot after at 375, 768, 1280
- [ ] Verify dark mode if applicable
- [ ] Verify focus rings and reduced motion
- [ ] Document delta vs original brandbook
- [ ] Repeat for next slice
```

## Token preservation rule

1. Prefer existing `--*` variables from brandbook `colors.cssVariables`
2. Extend token scale; do not replace entire palette unless P0/P1 explicitly requires
3. Document every token change in `design-intelligence/<slug>/token-delta.md`

## using-ui-stack defaults

When project has no design system:

- 8px spacing grid
- 60-30-10 color rule
- 5 interaction states on interactive elements
- Typography scale ratio 1.25
- `prefers-reduced-motion` respected

## Vertical slices

Implement one coherent unit per iteration:

- Single page (landing hero + below fold)
- Single flow (login, settings section)
- Single component group (nav + footer)

Do not refactor entire app in one pass unless user explicitly requests.

## Verification gate (required)

Before claiming done, use `control-ui` or cursor-ide-browser:

1. Full-page screenshots at 3 breakpoints
2. Console: zero new errors
3. Tab through interactive elements — visible focus
4. Toggle dark mode — no broken tokens
5. Run `verification-before-completion` skill

Optional: `visual-qa-testing`, `responsive-testing`, `accessibility-auditing` from awesome-cursor-skills.

## Performance

After React/Next changes, apply `vercel-react-best-practices`:

- Eliminate fetch waterfalls
- Prefer RSC for static regions
- Dynamic import heavy motion/3D

## Output artifacts

- Code changes in repo
- `token-delta.md` if tokens changed
- Before/after screenshots in `design-intelligence/<slug>/`
- Updated brandbook snapshot (optional post-implementation audit)

## Anti-patterns

- Implementing before user approval
- Ignoring proposal **Preserve** lines
- Default Inter + purple gradient (see anti-patterns reference)
- shadcn defaults with zero theming on marketing sites
