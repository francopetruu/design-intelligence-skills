# Walkthrough — basement.studio Smoke Test

End-to-end validation of the design intelligence pipeline.

## Steps executed

### 1. Brand audit (`web-brand-audit`)

- Navigated to https://basement.studio/ via cursor-ide-browser
- Captured accessibility snapshot and desktop screenshot
- Produced `brandbook.json`

### 2. Validation

```bash
node scripts/validate-brandbook.js examples/basement-studio-smoke/brandbook.json
# OK — brandbook is valid
```

### 3. Trend benchmark (`design-trends-intelligence`)

- Loaded basement-studio, market-leaders, motion-2026 references
- Output: `trend-benchmark.md`

### 4. Proposal (`design-improvement-proposal`)

- Scored 7 dimensions (overall 86/100)
- 5 recommendations (3× P0, 1× P1, 1× P2)
- Output: `proposal.md`

### 5. P0 implementation (`design-to-implementation`)

- Implemented reduced-motion fallback + focus rings in `prototype/after.html`
- Baseline in `prototype/before.html`
- Tokens in `design-tokens.json` and `prototype/tokens.css`

## How to replay

```bash
node scripts/validate-brandbook.js examples/basement-studio-smoke/brandbook.json
```

Open `prototype/before.html` and `prototype/after.html` in a browser. Enable OS "Reduce motion" to see the P0 hero fallback in `after.html`.

## Expected agent invocation

```
Read design-orchestrator and run audit+proposal on https://basement.studio/
```
