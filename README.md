# Design Intelligence Skills

Modular [Cursor Agent Skills](https://docs.cursor.com/agent/skills) for end-to-end design intelligence: web brand audits, trend benchmarking, improvement proposals, frontend stack advice, design assets, and code implementation.

Inspired by [Anthropic frontend-design](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design), [shadcn/ui skills](https://ui.shadcn.com/docs/skills), and [basement.studio](https://basement.studio/) craft patterns.

## Skills included

| Skill | Purpose |
|-------|---------|
| `design-orchestrator` | Entry point — routes the full pipeline |
| `web-brand-audit` | Extract structured brandbook from live URLs |
| `design-trends-intelligence` | Trend references (basement.studio, market leaders, anti-patterns) |
| `design-improvement-proposal` | Gap analysis with impact×effort scoring |
| `frontend-stack-advisor` | Stack and architecture ADRs |
| `design-to-implementation` | Apply approved changes in code |
| `design-asset-workflow` | Figma (when MCP available) or tokens/Canvas/prototypes |

## Installation

### Personal (all projects)

```bash
# Option A — Skills CLI (recommended)
npx skills add <your-github-user>/design-intelligence-skills

# Option B — Clone into Cursor skills directory
git clone https://github.com/<your-github-user>/design-intelligence-skills.git ~/.cursor/skills/design-intelligence-skills
```

On Windows:

```powershell
git clone https://github.com/<your-github-user>/design-intelligence-skills.git $env:USERPROFILE\.cursor\skills\design-intelligence-skills
```

### Per-project

Copy individual skill folders to `.cursor/skills/` in your repo, or install with:

```bash
npx skills add <owner>/design-intelligence-skills --path .cursor/skills
```

## Quick start

Ask Cursor:

```
Using design-orchestrator, audit https://example.com and propose design improvements.
```

Or step by step:

1. `web-brand-audit` → `brandbook.json`
2. `design-trends-intelligence` → `trend-benchmark.md`
3. `design-improvement-proposal` → prioritized recommendations
4. `frontend-stack-advisor` → ADR (if building/migrating)
5. `design-asset-workflow` → tokens or Figma
6. `design-to-implementation` → code changes

## Scripts

```bash
# Validate brandbook JSON
node scripts/validate-brandbook.js path/to/brandbook.json

# Extract CSS variables from a URL (requires Playwright)
npm install -D playwright
npx playwright install chromium
node scripts/extract-tokens.js https://example.com
```

## Complementary skills

Install alongside:

```bash
npx skills add shadcn/ui
```

Also useful: Anthropic `frontend-design`, `vercel-react-best-practices`, `control-ui`, `canvas`, `using-ui-stack` ([awesome-cursor-skills](https://github.com/spencerpauly/awesome-cursor-skills#frontend--ui)).

Optional: [Figma Cursor Plugin](https://cursor.com/marketplace/figma) for Path A in `design-asset-workflow`.

## Examples

See [`examples/basement-studio-smoke/`](examples/basement-studio-smoke/) for a full smoke test:

- `brandbook.json` — validated against schema
- `trend-benchmark.md` — trend analysis
- `proposal.md` — improvement recommendations
- `prototype/before.html` + `after.html` — P0 implementation demo
- `design-tokens.json` — exported tokens

## Pipeline

```
User request
  → design-orchestrator
  → web-brand-audit → brandbook.json
  → design-trends-intelligence → trend-benchmark.md
  → design-improvement-proposal → proposal.md
  → frontend-stack-advisor → ADR (optional)
  → design-asset-workflow → tokens / Figma
  → design-to-implementation → code
  → control-ui verification
```

## License

Skill content: MIT. Anthropic frontend-design patterns referenced under Apache 2.0 where applicable.

## Maintenance

Update trend references in `design-trends-intelligence/references/` quarterly. Each file includes a `Last reviewed` date.
