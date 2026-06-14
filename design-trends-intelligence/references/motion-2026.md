# Motion Design Trends (2025–2026)

Last reviewed: 2026-06

Sources: basement.studio craft posts, industry motion reports, View Transitions adoption.

## 1. Coded motion (systems over keyframes)

- Behaviors defined in code (springs, scroll progress, procedural noise)
- Tools: CSS `@property`, Motion/Framer, GSAP ScrollTrigger, R3F useFrame
- Best for: branding systems that must stay on-brand across many surfaces

## 2. View Transitions API

- Native cross-document and same-document transitions in supporting browsers
- Next.js integration via `vercel-react-view-transitions` patterns
- Use for: page nav, shared element transitions (hero → detail)
- Fallback: instant nav or reduced crossfade

## 3. Animating on twos

- Stylized 12fps character motion in 24fps scenes
- Hand-drawn, editorial, conference/film identity
- Not for: utilitarian SaaS tables

## 4. Scroll orchestration (one arc)

- Single coordinated scroll narrative vs scattered parallax
- Staggered reveal on load (`animation-delay` sequence)
- Pin sections sparingly — perf cost on mobile

## 5. Tactile / handcrafted texture

- Grain, paper, paint, organic noise overlaid on digital UI
- Counterbalance to flat AI-generated gloss
- Pair with photography or custom illustration

## 6. Performance-aware motion budget

| Surface | Budget guidance |
|---------|-----------------|
| Marketing hero | One hero sequence < 500KB JS for motion libs |
| SaaS UI | Transitions ≤ 250ms; no scroll-jacking |
| Mobile | Prefer CSS transforms/opacity; avoid layout thrashing |

## 7. Reduced motion as first-class

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Or selective: disable parallax/3D, keep opacity fades.

## 8. AI-assisted post, human-directed motion

- AI for asset prep/variation; human art direction for timing and easing
- Avoid: auto-generated infinite loops with no narrative purpose

## Recommendation mapping

| Brandbook signal | Motion recommendation |
|------------------|----------------------|
| `voice: playful, bold` | Coded motion + one scroll orchestration |
| `voice: corporate, trust` | Subtle transitions, no scroll effects |
| `hasWebGL: true` | Offscreen canvas, device tiers |
| `accessibility.contrastIssues` | Fix contrast before adding motion |

## References

- [View Transitions — MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- basement.studio Shader Lab and Ship conference posts
- `vercel-react-view-transitions` skill for implementation
