---
name: design-orchestrator
description: Orchestrates the full design intelligence pipeline — web brand audit, trend benchmarking, improvement proposals, stack advice, asset generation, and code implementation. Use when the user asks for a brand audit, design review, redesign, brandbook extraction, UI modernization, design system analysis, or end-to-end frontend design work.
disable-model-invocation: true
---

# Design Orchestrator

Entry point for the Design Intelligence skill suite. Route the user request to the correct phase and child skill. Do not skip gates.

## Modes

| Mode | Trigger | Phases |
|------|---------|--------|
| `audit-only` | "audit", "analyze", "extract brandbook" | 1–2 |
| `audit+proposal` | "review", "improve", "recommendations" | 1–4 (offer preview lite) |
| `audit+proposal+preview` | "preview", "show me", "mockup", "how would it look" | 1–4 + 4b |
| `full-redesign` | "redesign", "modernize", "migrate UI" | 1–7 |
| `greenfield` | "new app", "from scratch", no existing URL | 3–7 (skip audit or use reference sites) |

Ask the user which mode if ambiguous. Default to `audit+proposal` when a URL is provided.

## Pipeline

```
Task Progress:
- [ ] Phase 1: Scope & constraints
- [ ] Phase 2: Brand audit (web-brand-audit)
- [ ] Phase 3: Trend benchmark (design-trends-intelligence)
- [ ] Phase 4: Improvement proposal (design-improvement-proposal)
- [ ] Phase 4b: Proposal preview (design-proposal-preview) — lite by default if user wants visual
- [ ] Phase 5: Stack & architecture (frontend-stack-advisor) — if building or migrating
- [ ] Phase 6: Design assets (design-asset-workflow) — if Figma/tokens/prototypes needed
- [ ] Phase 7: Implementation (design-to-implementation) — if user approves changes
- [ ] Phase 8: Verification (control-ui, canvas, visual-qa-testing)
```

## Phase 1: Scope & constraints

Capture before any audit:

- Target URL(s) or local dev URL
- Product type (marketing, SaaS, e-commerce, portfolio, app)
- Hard constraints (brand guidelines PDF, must keep logo/colors, accessibility level, performance budget)
- Deliverable expectation (report only, tokens, Figma, code)
- Repo path if local implementation is planned

**Gate:** Do not proceed to Phase 4 without a brandbook from Phase 2 (unless `greenfield`).

## Phase 2: Brand audit

Read and follow [web-brand-audit](../web-brand-audit/SKILL.md).

Output: `brandbook.json` validated against schema in `web-brand-audit/templates/brandbook.schema.json`.

Save artifacts under the project or a dated folder, e.g. `design-intelligence/<site-slug>/brandbook.json`.

## Phase 3: Trend benchmark

Read [design-trends-intelligence](../design-trends-intelligence/SKILL.md). Load only the reference files relevant to the product type:

- High-impact marketing / 3D → `references/basement-studio.md`, `references/motion-2026.md`
- SaaS / product UI → `references/market-leaders.md`, `references/anti-patterns.md`
- All audits → `references/anti-patterns.md`

Produce a short `trend-benchmark.md` listing 5–8 applicable trends with evidence links.

## Phase 4: Improvement proposal

Read [design-improvement-proposal](../design-improvement-proposal/SKILL.md).

Inputs: brandbook + trend benchmark + user constraints.

Output: proposal using `design-improvement-proposal/templates/proposal-template.md`. Prefer a Canvas for impact×effort matrix when the user wants a standalone artifact.

**Gate:** Get explicit user approval before Phase 7 implementation.

## Phase 4b: Proposal preview

Read [design-proposal-preview](../design-proposal-preview/SKILL.md) when the user wants to **see** proposed changes before coding.

Default tier: **lite** (P0, one slice, `after.html` + shared `tokens.css`).

After proposal, ask: "¿Genero preview HTML (lite / standard / full)?" Skip if user only wanted the written analysis.

Output: `design-intelligence/<site-slug>/preview/` with `manifest.json`.

Open `compare.html` or `after.html` in browser for review. Gate Phase 7 on preview approval when preview was generated.

## Phase 5: Stack & architecture

Read [frontend-stack-advisor](../frontend-stack-advisor/SKILL.md) when:

- Greenfield project
- Full redesign with framework change
- User asks "what stack should we use"

Output: ADR from `frontend-stack-advisor/templates/adr-template.md`.

## Phase 6: Design assets

Read [design-asset-workflow](../design-asset-workflow/SKILL.md) when:

- User wants Figma frames, design tokens file, or visual prototypes before code
- Brandbook needs to be shared with designers

Detect Figma MCP availability first; fall back to tokens + Canvas automatically.

## Phase 7: Implementation

Read [design-to-implementation](../design-to-implementation/SKILL.md).

Also invoke Anthropic `frontend-design` for aesthetic execution. Invoke `shadcn/ui` skill when `components.json` exists.

Implement in vertical slices (one screen or component group per iteration). Map each change to a P0/P1/P2 item from the proposal.

## Phase 8: Verification

Before claiming done:

1. Run `control-ui` or cursor-ide-browser: screenshots at 375px, 768px, 1280px
2. Check console errors and critical network failures
3. Confirm focus states, contrast, and `prefers-reduced-motion` respect
4. Use `verification-before-completion` skill

## Child skill map

| Skill | When |
|-------|------|
| `web-brand-audit` | URL or live app analysis |
| `design-trends-intelligence` | Benchmarking against market |
| `design-improvement-proposal` | Gap analysis and prioritized recs |
| `design-proposal-preview` | HTML/CSS before/after previews |
| `frontend-stack-advisor` | Architecture and tech stack |
| `design-asset-workflow` | Figma, tokens, prototypes |
| `design-to-implementation` | Code changes |
| `frontend-design` | Distinctive UI execution |
| `canvas` | Interactive audit/proposal deliverables |
| `control-ui` | Browser verification |
| `vercel-react-best-practices` | Performance after React/Next changes |

## Installation (sharing this suite)

Personal (default): skills live in `~/.cursor/skills/`.

Share via dedicated repo:

```bash
npx skills add <owner>/design-intelligence-skills
# or
git clone https://github.com/<owner>/design-intelligence-skills.git ~/.cursor/skills/design-intelligence-skills
```

Per-project override: copy individual skill folders to `.cursor/skills/` in the repo.

Cursor plugin: package with `.cursor-plugin/plugin.json` for marketplace distribution.

## Examples

**"Audit basement.studio and suggest improvements"**
→ `audit+proposal` → Phases 1–4 → Canvas or markdown proposal

**"Audit X and show me how the improvements would look"**
→ `audit+proposal+preview` → Phases 1–4 + 4b lite → `preview/compare.html`

**"Redesign our landing page — here's the repo"**
→ `full-redesign` → Phases 1–8 after user approves proposal

**"We're building a new SaaS dashboard from scratch"**
→ `greenfield` → Phases 3–5 first, then 6–7
