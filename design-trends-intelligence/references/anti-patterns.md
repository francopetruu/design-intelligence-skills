# Anti-Patterns — Generic AI UI

Last reviewed: 2026-06

Derived from Anthropic [frontend-design](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) and field observations. Use to flag issues in audits and block lazy recommendations.

## Typography anti-patterns

| Avoid | Why | Instead |
|-------|-----|---------|
| Inter, Roboto, Arial as default pairing | Signals template/AI output | Distinctive display + refined body font matched to brand voice |
| Space Grotesk on every project | Overused in AI-generated UIs | Choose context-specific families |
| Same font scale on every page | No hierarchy intent | Editorial scale with clear display/body/mono roles |

## Color anti-patterns

| Avoid | Why | Instead |
|-------|-----|---------|
| Purple gradient on white hero | Clichéd "AI startup" look | Brand-derived palette; dominant neutral + one sharp accent |
| Evenly distributed rainbow palette | No visual hierarchy | 60-30-10 rule (see `using-ui-stack`) |
| Pure `#000` dark backgrounds | Harsh, flat | Rich neutrals (slate-950, custom OKLCH dark) |
| Random hex without tokens | Unmaintainable | CSS variables / design tokens |

## Layout anti-patterns

| Avoid | Why | Instead |
|-------|-----|---------|
| Centered hero + 3 feature cards + CTA | Cookie-cutter SaaS landing | Asymmetry, overlap, or editorial grid |
| Identical section rhythm | Monotonous scroll | Vary density and composition |
| Floating cards with identical shadows | Generic depth | Contextual depth: borders, subtle layers, or bold flat |

## Motion anti-patterns

| Avoid | Why | Instead |
|-------|-----|---------|
| Micro-interactions on everything | Noise, perf cost | One orchestrated load or scroll moment |
| Animation without reduced-motion fallback | a11y failure | `prefers-reduced-motion` media query |
| 500ms+ transitions on hover | Sluggish UI | 150–300ms for micro; longer only for narrative |

## Component anti-patterns

| Avoid | Why | Instead |
|-------|-----|---------|
| `div` buttons | a11y | Semantic `<button>`, `<a>` |
| Missing focus rings | Keyboard users blocked | Visible focus (`ring-2 ring-offset-2`) |
| Icon-only buttons without labels | Screen reader gap | `aria-label` or visible text |
| Placeholder as only label | Form a11y | Persistent labels |

## Implementation anti-patterns

| Avoid | Why | Instead |
|-------|-----|---------|
| Adding Three.js for "wow" | Payload + maintenance | Match complexity to brand need |
| shadcn defaults uncustomized | Every app looks identical | Theme tokens + custom variants |
| Client-fetch waterfalls | Slow TTI | Parallel fetch, RSC, suspense boundaries |

## Audit flag format

When found in brandbook or live site, record in proposal as:

```
[ANTI-PATTERN] {name} — observed in {location} — severity: {low|medium|high}
Suggested fix: {one line}
Trend reference: {link to positive pattern}
```

## Preservation rule

Flag anti-patterns **without** erasing brand identity. Replace generic defaults; keep intentional brand choices even if unconventional.
