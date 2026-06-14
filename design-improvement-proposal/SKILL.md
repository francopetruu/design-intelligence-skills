---
name: design-improvement-proposal
description: Compares a brandbook against design trend benchmarks and produces prioritized improvement recommendations with impact-effort scoring. Use after a web brand audit when proposing UI redesigns, modernization plans, or design gap analysis.
---

# Design Improvement Proposal

Generate an actionable proposal from brandbook + trend benchmark. Every recommendation must cite a trend rationale and state what brand identity is preserved.

## Inputs

- `brandbook.json` (required)
- `trend-benchmark.md` (required)
- User constraints (optional): budget, timeline, must-keep elements

## Scoring dimensions

Score current state 0–100 per dimension:

| Dimension | What to evaluate |
|-----------|------------------|
| Typography | Distinctiveness, hierarchy, scale consistency |
| Color | Token system, contrast, dark mode, accent discipline |
| Motion | Purpose, performance, reduced-motion support |
| Spatial composition | Layout intentionality, rhythm, differentiation |
| Performance | Perceived speed, asset weight, CWV signals |
| Accessibility | Contrast, landmarks, keyboard, touch targets |
| Differentiation | Memorable hook vs generic template |

Document scoring rationale in 1–2 sentences per dimension.

## Impact × effort matrix

Classify each recommendation:

| Priority | Impact | Effort | Examples |
|--------|--------|--------|----------|
| P0 | High | Low | Token fix, font swap, contrast patch, focus rings |
| P1 | High | Medium | Hero redesign, motion orchestration, component system |
| P2 | High | High | 3D layer, framework migration, full design system |

Each item must include:

- **Title** — actionable verb phrase
- **Current state** — from brandbook
- **Proposed change** — specific
- **Trend justification** — reference file or case
- **Preserve** — brand elements kept
- **Effort** — S / M / L
- **Dependencies** — stack, assets, approvals
- **Preview** — `slice-hero` | `slice-nav` | `slice-section` | `component` | `compare-tokens` | `skip` (see `design-proposal-preview`)

## Output

Use [templates/proposal-template.md](templates/proposal-template.md). Fill all sections.

For standalone deliverables, prefer a **Canvas** with:

- Score radar or bar chart per dimension
- Impact×effort 2×2 matrix
- Prioritized recommendation cards

Save as `design-intelligence/<site-slug>/proposal.md` or equivalent.

## Rules

1. Minimum **3 recommendations** across P0–P2
2. At least **1 P0 quick win**
3. No recommendation without **Preserve** line
4. Flag anti-patterns using format from `references/anti-patterns.md`
5. Do not propose implementation until user approves (orchestrator gate)

## Handoff

| Next step | Skill |
|-----------|-------|
| Visual preview | `design-proposal-preview` (lite tier default) |
| Stack decision | `frontend-stack-advisor` |
| Figma / tokens | `design-asset-workflow` |
| Code changes | `design-to-implementation` |

## Example recommendation

```markdown
### P0 — Replace generic body font with brand-aligned pairing

- **Current:** Inter 16px throughout (anti-pattern)
- **Proposed:** Display: {BrandDisplay}; Body: {BrandText}; load via `next/font`
- **Trend:** market-leaders — distinctive typography as differentiation
- **Preserve:** Existing primary blue (#0066FF) and logo lockup
- **Effort:** S
```
