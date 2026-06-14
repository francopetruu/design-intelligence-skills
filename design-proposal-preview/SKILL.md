---
name: design-proposal-preview
description: Generates static HTML/CSS previews of design proposal improvements — before/after slices, side-by-side compare, and preview hub — without a build step. Use after a design improvement proposal when the user wants to see how recommendations would look, visual mockups, or stakeholder-ready previews.
---

# Design Proposal Preview

Turn proposal recommendations into **viewable HTML/CSS** fast. Previews are not production code — they validate direction before Phase 7 implementation.

## Inputs

- `brandbook.json` (required)
- `proposal.md` (required)
- `design-tokens.json` or `tokens.css` (generate if missing via `design-asset-workflow`)
- Optional: audit screenshot paths for before baseline

## When to run

| Trigger | Action |
|---------|--------|
| User asks "show me", "preview", "mockup", "how would it look" | Run this skill |
| After Phase 4 proposal, before implementation | Offer **lite** preview (orchestrator default) |
| User approves only P0 | Preview P0 slices only |

**Do not** run full page rebuilds or framework scaffolds here. Use `design-to-implementation` for real code.

## Preview tiers (cost / time / fidelity)

Pick one tier unless the user specifies otherwise. Default: **`lite`**.

| Tier | Scope | Files | Agent cost | Best for |
|------|-------|-------|------------|----------|
| **lite** | P0 only, 1 slice (hero OR top-impact section) | `after.html`, reuse `tokens.css` | Low | Quick validation |
| **standard** | P0 + up to 2 P1 slices | `before.html`, `after.html`, `compare.html` | Medium | Stakeholder review |
| **full** | P0–P1 + index hub linking all slices | `index.html` + `slices/*.html` | High | Workshop / exec demo |

### Cost controls (always apply)

1. **Static only** — HTML + CSS; no React/Next/Vite unless user explicitly needs framework-accurate preview
2. **No build step** — open files directly in browser or cursor-ide-browser
3. **One token file** — single `tokens.css` shared across all previews; do not duplicate hex values
4. **System font fallbacks** — avoid Google Fonts CDN unless brandbook requires a named webfont (reduces fetch + licensing noise)
5. **CSS motion only** — transitions/keyframes; no Three.js/GSAP unless previewing a P2 3D item and user approved **full** tier
6. **Slice, not site** — preview changed regions; use labels for unchanged areas ("Rest of page unchanged")
7. **Skip non-visual recs** — perf, analytics, backend: document in manifest as `"preview": "skipped"` with reason
8. **PNG export optional** — only when user needs deck embeds; use browser screenshot, not Playwright install by default
9. **Incremental** — generate one slice, show user, then expand tier if approved (saves tokens on rejected directions)

## Recommendation → preview mapping

For each proposal item, set in proposal or manifest:

| Preview type | When |
|--------------|------|
| `slice-hero` | Hero, headline, above-the-fold |
| `slice-nav` | Header, menu, focus states |
| `slice-section` | Feature grid, capabilities, footer block |
| `component` | Buttons, cards, forms in isolation |
| `compare-tokens` | Color/type token changes only — side-by-side swatches |
| `skip` | Non-visual or needs real app context |

Only render previews for items marked previewable in P0/P1 (and P2 only in **full** tier).

## Output structure

```
design-intelligence/<site-slug>/preview/
├── manifest.json          # maps rec IDs → files, tier, status
├── tokens.css             # shared (or symlink to parent)
├── before.html            # standard/full — baseline slice
├── after.html             # lite+ — proposed slice
├── compare.html           # standard/full — side-by-side
├── index.html             # full — hub with links + rec summaries
└── slices/                # full only
    ├── 01-hero-after.html
    └── 02-nav-after.html
```

Validate manifest against [templates/preview-manifest.schema.json](templates/preview-manifest.schema.json).

## Workflow

```
Preview Progress:
- [ ] Confirm tier (lite | standard | full)
- [ ] List previewable recommendations from proposal
- [ ] Ensure tokens.css exists (from brandbook or design-asset-workflow)
- [ ] Write before.html (baseline from brandbook voice, not live clone)
- [ ] Write after.html applying P0 (+ P1 if tier allows)
- [ ] Write compare.html if standard/full
- [ ] Write index.html if full
- [ ] Write manifest.json
- [ ] Open after.html or compare.html in browser; screenshot if user wants evidence
```

## HTML rules

- Use [templates/preview-slice.template.html](templates/preview-slice.template.html) as base
- Use [templates/compare.template.html](templates/compare.template.html) for side-by-side
- Include `<meta name="viewport">` and responsive layout (375+ readable)
- Banner: `Preview — not production — {tier} — {rec IDs covered}`
- Annotate each changed element with `data-preview-rec="P0-1"` for traceability
- Implement `prefers-reduced-motion` if proposal touches motion
- Implement `:focus-visible` if proposal touches a11y/nav

## Before baseline strategy

| Source available | Before content |
|------------------|----------------|
| Audit screenshot | Describe in banner; approximate layout in HTML — do not pixel-clone |
| brandbook only | Simplified "current state" from brandbook tokens + components |
| Live URL + browser | Optional screenshot embed as `<img>` in before panel only (standard tier) |

Do not scrape full site HTML (legal/perf/noise). Approximate structure from brandbook.

## Handoff

| Next step | Skill |
|-----------|-------|
| User approves direction | `design-to-implementation` — map `data-preview-rec` to code tasks |
| Needs Figma | `design-asset-workflow` Path A |
| Needs metrics only | `canvas` — scores/matrix, not visual mock |

## Verification

1. Open preview in browser — no console errors
2. Toggle reduced motion — preview still usable
3. Tab through interactive elements in after.html — focus visible if a11y rec included
4. manifest.json lists every generated file and skipped rec with reason

## Anti-patterns

- Rebuilding entire marketing site in preview
- Adding npm dependencies for preview folder
- Generating preview for every P2 item by default
- Replacing proposal.md with preview-only output — both artifacts required
