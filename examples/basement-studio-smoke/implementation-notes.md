# Phase 2 Smoke Test — P0 Implementation

**Proposal item:** P0 #1 reduced-motion fallback + P0 #3 focus rings  
**Date:** 2026-06-14

## Artifacts

| File | Purpose |
|------|---------|
| `prototype/before.html` | Baseline without reduced-motion fallback |
| `prototype/after.html` | P0 improvements applied |
| `prototype/tokens.css` | Brand tokens from brandbook |
| `design-tokens.json` | Machine-readable tokens |

## P0 changes implemented

1. **`prefers-reduced-motion: reduce`** — static SVG poster replaces live 3D label; optional "Enter full experience" button
2. **Focus-visible rings** — accent-colored outline on header buttons (`outline: 2px solid #E85D04`)
3. **ARIA labels** — homepage and menu buttons labeled for screen readers
4. **Global reduced-motion** — animation/transition durations collapsed in `tokens.css`

## Verification

Open `after.html` in browser:

- Tab through header buttons — focus ring visible
- Enable "Reduce motion" in OS settings — hero shows static poster + opt-in button
- Compare with `before.html` for delta

## Token delta

See `design-tokens.json` — derived from `brandbook.json` colors and motion spec.
