# Walkthrough — Generic SaaS Landing Audit

Template for auditing a SaaS marketing site.

## Recommended flow

1. **Audit** — `web-brand-audit` on target URL
2. **Benchmark** — load `market-leaders.md` + `anti-patterns.md`
3. **Proposal** — expect anti-pattern flags if Inter/purple-gradient detected
4. **Stack** — `frontend-stack-advisor` Preset B (Next.js + shadcn)
5. **Assets** — `design-asset-workflow` Path B tokens
6. **Implement** — `design-to-implementation` P0 token + typography fixes

## Typical P0 recommendations

- Replace generic font with brand pairing
- Fix contrast on muted text
- Add focus rings to ghost buttons
- Map colors to OKLCH CSS variables

## Complementary installs

```bash
npx skills add shadcn/ui
```
