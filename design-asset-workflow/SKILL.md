---
name: design-asset-workflow
description: Generates design deliverables from a brandbook — Figma frames when MCP is available, or design tokens, Canvas previews, HTML prototypes, and SVG assets as fallback. Use when creating design system assets, Figma mockups, token files, or visual prototypes before or alongside code implementation.
---

# Design Asset Workflow

Produce design artifacts from brandbook and approved proposal. Auto-detect Figma MCP; fall back to code-native assets when unavailable.

## Path detection

```
1. List MCP servers for Figma tools (figma, generate-design, code-connect)
2. If available → Path A
3. Else → Path B (default)
```

Tell the user which path is active.

## Path A — Figma (MCP available)

### Setup (one-time)

Install [Figma Cursor Plugin](https://cursor.com/marketplace/figma) from Cursor Settings → Plugins.

Capabilities typically include: `generate-design`, `code-connect-components`.

### Workflow

1. Import brandbook colors as **Figma variables** (OKLCH or hex)
2. Create text styles from `typography` scale
3. Build component frames for P0 UI: buttons, inputs, cards, nav
4. Layout key screens from proposal (hero, dashboard shell, etc.)
5. Link components to code via Code Connect when repo exists
6. Export handoff notes: spacing, motion specs, asset list

### Handoff to code

Pass variable names → CSS custom properties mapping in `design-tokens.json`.

## Path B — Fallback (no Figma)

### B1 — Design tokens file

Generate `design-tokens.json` + `tokens.css`:

```json
{
  "color": {
    "primary": { "value": "oklch(...)", "hex": "#..." }
  },
  "font": {
    "display": { "family": "...", "weight": "700" }
  },
  "spacing": { "unit": 8, "scale": [4, 8, 16, 24, 32, 48, 64] }
}
```

CSS export uses OKLCH with fallbacks:

```css
:root {
  --color-primary: oklch(0.55 0.22 264);
  --font-display: "Brand Display", system-ui;
}
```

Template: [templates/design-tokens.template.json](templates/design-tokens.template.json)

### B2 — Canvas deliverable

Use `canvas` skill for interactive brandbook visualization:

- Color palette swatches with hex/OKLCH
- Typography specimens
- Impact×effort matrix from proposal
- Dimension score bars

Write to workspace `canvases/<site-slug>-design-review.canvas.tsx`.

### B3 — HTML/CSS prototype

For **proposal-specific before/after previews**, use `design-proposal-preview` (tiered, manifest, compare view).

For generic stakeholder prototypes:

- Standalone `prototype/index.html` + `tokens.css`
- No build step required
- Responsive at 375/768/1280
- One key page from proposal

### B4 — SVG assets

Simple icons, logos placeholders, decorative shapes as SVG when:

- Icon set is small (< 10 icons)
- No Figma available
- User needs importable assets for code

### B5 — PNG export

Use `exporting-to-png` pattern: headless browser screenshot of prototype or live page for decks.

## Asset checklist

```
Assets Progress:
- [ ] design-tokens.json
- [ ] tokens.css (OKLCH)
- [ ] Component spec (markdown table: name, states, spacing)
- [ ] Proposal preview (`design-proposal-preview`) OR generic prototype OR Figma link
- [ ] Canvas review (optional)
- [ ] Motion spec (durations, easing from brandbook.motion)
```

## Motion spec template

```markdown
| Element | Trigger | Duration | Easing | Reduced motion |
|---------|---------|----------|--------|----------------|
| Hero reveal | load | 400ms | ease-out | opacity only |
```

## Integration with implementation

1. `design-to-implementation` imports `tokens.css` into project `globals.css`
2. shadcn theme maps to same CSS variables
3. Re-audit with `web-brand-audit` after implementation

## Do not

- Block on Figma when Path B satisfies the user request
- Generate tokens that contradict brandbook without proposal approval
- Create Canvas with placeholder/lorem-only sections — omit empty blocks
