---
name: design-trends-intelligence
description: Provides curated design trend intelligence from basement.studio, market-leading brands, motion patterns, and anti-patterns for AI-generated UI. Use when benchmarking a site against current market trends, researching frontend aesthetics, or justifying design recommendations.
disable-model-invocation: true
---

# Design Trends Intelligence

Reference knowledge for trend benchmarking. Read only the files relevant to the audit context — do not load all references every time.

## When to use

- After `web-brand-audit` produces a brandbook
- When user asks "what are current design trends" or "how does X compare to the market"
- When writing recommendations in `design-improvement-proposal`

## Reference index

| File | Load when |
|------|-----------|
| [references/basement-studio.md](references/basement-studio.md) | High-impact marketing, 3D, motion-heavy sites, creative studios |
| [references/market-leaders.md](references/market-leaders.md) | Conversion, scale, brand launches, e-commerce |
| [references/motion-2026.md](references/motion-2026.md) | Animation strategy, micro-interactions, View Transitions |
| [references/anti-patterns.md](references/anti-patterns.md) | Always — avoid generic AI aesthetics |

## Benchmark workflow

1. Identify product type from brandbook (marketing / SaaS / e-commerce / portfolio / experimental)
2. Load 1–2 trend references + anti-patterns
3. Extract 5–8 applicable trends as bullet list with:
   - Trend name
   - Why it fits this product type
   - Evidence (link to reference section or external case)
   - Risk if over-applied
4. Save as `trend-benchmark.md` alongside brandbook

## Trend categories (quick scan)

Use these dimensions when comparing brandbook to market:

| Dimension | Leading signal (2025–2026) |
|-----------|---------------------------|
| Typography | Distinctive display + refined body; avoid default Inter/system |
| Color | OKLCH tokens, dominant neutrals + sharp accent, dark mode as first-class |
| Motion | Coded/procedural motion, scroll orchestration, reduced-motion fallbacks |
| Spatial | Asymmetry, overlap, editorial grids, generous negative space OR intentional density |
| 3D / depth | Performance-budget 3D, light-maps, stylized low-poly (not heavy realism) |
| Performance | Core Web Vitals, edge delivery, texture compression, device-tier fallbacks |
| Craft | Hand-tactile textures vs generic AI gloss; animating-on-twos for character |
| Differentiation | One memorable hook per page — not template landing page #47 |

## Maintenance

References include `Last reviewed` dates. When trends shift:

1. Update the relevant `references/*.md` file
2. Add a one-line changelog at top of the file
3. Do not embed dates in agent decision logic — use qualitative trend names

## Output format

```markdown
# Trend Benchmark — {site name}

## Product context
{one sentence}

## Applicable trends
1. **{Trend}** — {fit rationale} — Source: {reference}
...

## Not recommended for this brand
- {trend that conflicts with brand voice}

## Competitive references
- {similar sites or case studies}
```

Hand off to `design-improvement-proposal`.
