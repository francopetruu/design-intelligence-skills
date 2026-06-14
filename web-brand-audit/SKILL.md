---
name: web-brand-audit
description: Audits a live web page or application and extracts a structured brandbook (colors, typography, spacing, motion, components, accessibility, tech signals). Use when analyzing a URL, extracting design tokens, auditing UI/branding, or preparing input for a design improvement proposal.
---

# Web Brand Audit

Produce a machine-readable brandbook from a live site or local dev URL.

## Prerequisites

- Target URL (https or local dev server)
- cursor-ide-browser MCP or `control-ui` skill for capture
- Optional: repo access for CSS source inspection

## Workflow

Copy this checklist and track progress:

```
Audit Progress:
- [ ] Navigate and wait for hydration (network idle or 3s)
- [ ] Capture desktop screenshot (1280×800)
- [ ] Capture tablet screenshot (768×1024)
- [ ] Capture mobile screenshot (375×812)
- [ ] Snapshot accessibility tree
- [ ] Extract CSS variables and computed styles
- [ ] Document component patterns (nav, buttons, cards, forms)
- [ ] Note motion and interaction behavior
- [ ] Record accessibility issues
- [ ] Infer tech stack signals
- [ ] Write brandbook.json
- [ ] Validate with scripts/validate-brandbook.js
```

## Step 1: Capture

Use cursor-ide-browser:

1. `browser_navigate` to URL
2. `browser_wait` 2–3s for SPA hydration
3. Resize viewport for each breakpoint; `browser_take_screenshot` full page
4. `browser_snapshot` for structure, headings, landmarks, button labels

For local apps, use `control-ui` or start dev server first (`finding-dev-server-url` pattern).

## Step 2: Extract design tokens

**From browser (preferred when repo unavailable):**

Inspect via snapshot + screenshot analysis:

- Dominant background and text colors (sample from hero, body, CTAs)
- Font families on h1, h2, body, button (note fallbacks)
- Border radius, shadow, spacing rhythm (estimate base unit: 4px vs 8px)
- Animation: scroll effects, hover transitions, page load motion

**From codebase (when repo available):**

- `:root` and `[data-theme]` CSS custom properties
- Tailwind config, `globals.css`, design token files
- `components.json` for shadcn setup

**Optional script:**

```bash
node scripts/extract-tokens.js <url> > extracted-styles.json
```

Requires Playwright (`npx playwright install chromium` if missing).

## Step 3: Voice and brand personality

Infer from:

- Headline copy tone (editorial, playful, corporate, technical)
- Visual density (minimal vs maximal)
- Imagery style (photography, 3D, illustration, flat)
- OG/meta description tags

Tag voice as an array: e.g. `["bold", "performance-focused", "editorial"]`.

## Step 4: Accessibility scan

From snapshot and screenshots, note:

- Contrast risks (light gray on white, low-opacity text)
- Missing or generic button/link labels
- Touch target size concerns on mobile capture
- Motion without reduced-motion alternative (if detectable)

## Step 5: Tech signals

Document observed or inferred:

- Framework (Next.js, React, Vue hints from `__NEXT_DATA__`, build artifacts)
- CSS approach (Tailwind utility classes, CSS modules, styled-components)
- Animation libraries (Framer Motion, GSAP, CSS only)
- 3D/WebGL presence
- Font loading (Google Fonts, self-hosted, variable fonts)

## Output

Write `brandbook.json` conforming to [templates/brandbook.schema.json](templates/brandbook.schema.json).

Use [templates/brandbook.example.json](templates/brandbook.example.json) as a reference.

Required top-level fields: `meta`, `brand`, `colors`, `typography`, `spacing`, `motion`, `components`, `accessibility`, `techSignals`, `screenshots`.

Save screenshots as paths or descriptions if files are stored alongside the JSON.

## Validation

```bash
node scripts/validate-brandbook.js path/to/brandbook.json
```

Fix all schema errors before handing off to `design-improvement-proposal`.

## Handoff

Pass `brandbook.json` to:

- `design-improvement-proposal` for gap analysis
- `design-asset-workflow` for token export
- `design-to-implementation` when applying changes

## Anti-patterns

- Do not guess hex values without evidence from capture or CSS
- Do not skip mobile capture
- Do not conflate one accent color with full palette — document primary, secondary, neutral scale
- Mark uncertain fields with `"confidence": "low"` in `meta`
