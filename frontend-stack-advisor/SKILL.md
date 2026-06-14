---
name: frontend-stack-advisor
description: Recommends end-to-end frontend architecture and technology stack based on product type, visual ambition, team constraints, and design proposals. Use for greenfield projects, redesigns with framework changes, or when the user asks what stack to use for a web app.
---

# Frontend Stack Advisor

Produce an Architecture Decision Record (ADR) for frontend stack selection. Tie every choice to product requirements and the approved design proposal.

## Inputs

- Product type and user scale
- Design proposal priorities (P0–P2)
- Brandbook `techSignals` if migrating
- Team skills and timeline
- Hosting/deployment constraints

## Decision tree

```
Start
├── Marketing / landing (high visual impact)?
│   YES → Next.js + Tailwind v4 + Motion or View Transitions
│         3D optional: R3F + performance budget (basement patterns)
│   NO ↓
├── SaaS dashboard / internal tool?
│   YES → Next.js + shadcn/ui + TanStack Query + RSC
│   NO ↓
├── E-commerce?
│   YES → Next.js + Shopify Hydrogen/custom + edge caching + CDN media
│   NO ↓
├── Mobile-first app?
│   YES → Expo/React Native (see react-native-patterns)
│   NO ↓
└── Static content / docs?
    YES → Next.js/Astro + MDX + minimal client JS
```

## Stack presets

### Preset A — High-impact marketing

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15+ App Router | SSR/ISR, OG, edge |
| Styling | Tailwind v4 + CSS variables (OKLCH) | Token pipeline, dark mode |
| Components | Custom + optional shadcn primitives | Avoid generic dashboard look |
| Motion | Motion library + View Transitions | Orchestrated load, native nav |
| 3D | React Three Fiber (if P2 approved) | Device tiers required |
| Hosting | Vercel | Edge, previews, analytics |
| Testing | Playwright visual + Lighthouse CI | Perf regression guard |

**Skills:** `frontend-design`, `vercel-web-design-guidelines`, `design-to-implementation`

### Preset B — SaaS product

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js App Router | RSC for data-heavy UI |
| UI | shadcn/ui (Radix base) | Accessible primitives |
| Data | TanStack Query + server actions | Cache, mutations |
| Styling | Tailwind + semantic tokens | 8px grid, 5 states |
| Auth | Clerk / Auth.js per project | Marketplace patterns |
| Hosting | Vercel | Fluid compute |
| Testing | Vitest + Playwright | Unit + e2e |

**Skills:** `npx skills add shadcn/ui`, `vercel-react-best-practices`

### Preset C — Design system greenfield

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Tokens | Style Dictionary → CSS + JSON | Single source of truth |
| Components | shadcn registry (custom) | Code-owned components |
| Docs | Storybook or Ladle | Visual regression |
| Distribution | npm package or monorepo `@repo/ui` | Multi-app reuse |

**Skills:** `design-asset-workflow`, `using-ui-stack`

### Preset D — Experimental 3D / motion studio

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js | Hybrid 2D/3D pages |
| 3D | Three.js / R3F | basement.studio patterns |
| Assets | glTF + KTX compression | Payload control |
| Rendering | Offscreen canvas, workers | Main thread protection |
| Fallback | Static hero image + reduced scene | Device tiers |
| Perf | `@react-three/drei` perf monitor | Dev budget enforcement |

**Skills:** `profiling-performance`, basement reference

## ADR output

Fill [templates/adr-template.md](templates/adr-template.md). Include:

- Context and decision drivers
- Options considered (min 2)
- Chosen stack with trade-offs
- Consequences (positive, negative, neutral)
- Implementation phases mapped to proposal P0–P2

## Complementary skills (install if missing)

```bash
npx skills add shadcn/ui
npx skills add vercel-labs/agent-skills
```

From awesome-cursor-skills: `using-ui-stack`, `vercel-web-design-guidelines`, `visual-qa-testing`.

## Handoff

- **Assets first:** `design-asset-workflow` when designers need Figma/tokens before code
- **Implement:** `design-to-implementation` with ADR as constraint doc

## Do not

- Recommend stack changes without mapping to proposal items
- Default to Next.js without stating why alternatives were rejected
- Omit testing, a11y, and perf tooling from the ADR
