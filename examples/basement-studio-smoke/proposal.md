# Design Improvement Proposal — basement.studio

**Date:** 2026-06-14  
**URL:** https://basement.studio/  
**Mode:** audit+proposal

## Executive Summary

basement.studio already scores at the top of market differentiation and spatial composition. The largest opportunities are accessibility (reduced motion for 3D), performance transparency for low-end devices, and progressive enhancement of the 3D hero — not a visual rebrand.

## Current State

- **Voice:** bold, irreverent, performance-focused, craft-driven
- **Primary colors:** #0A0A0A background, #FFFFFF type, warm orange accent in 3D
- **Typography:** Heavy grotesque display, tight tracking, oversized headlines
- **Key patterns:** 3D dithered hero, featured projects, capabilities grid
- **Tech:** Next.js + WebGL/Three.js, Vercel hosting

## Trend Alignment Scores

| Dimension | Score (0–100) | Rationale |
|-----------|---------------|-----------|
| Typography | 92 | Distinctive, editorial, intentional scale |
| Color | 88 | Strong dark-first system; accent from scene |
| Motion | 85 | Excellent craft; reduced-motion gap |
| Spatial composition | 95 | Full-bleed 3D + typographic contrast |
| Performance | 80 | Studio practices strong; hero weight on low-end unknown |
| Accessibility | 65 | Focus/contrast over 3D needs audit |
| Differentiation | 98 | Industry-leading; not generic AI UI |
| **Overall** | **86** | Leader site; optimize inclusivity and tiers |

## Anti-patterns detected

None significant — site intentionally avoids generic AI slop.

## Recommendations

### P0 — Quick wins

#### 1. Add reduced-motion fallback for 3D hero

- **Current:** `reducedMotionSupported: false`; full 3D always active
- **Proposed:** Static poster image + optional "Enter experience" when `prefers-reduced-motion: reduce`
- **Trend justification:** motion-2026 — reduced motion as first-class
- **Preserve:** Dithered 3D aesthetic for default users
- **Effort:** S
- **Dependencies:** Hero poster asset export from scene
- **Preview:** slice-hero

#### 2. Document device-tier scene fallback

- **Current:** Advanced 3D without visible low-end path in audit
- **Proposed:** Simplified scene tier (no post-processing) for low GPU / mobile
- **Trend justification:** basement-studio — device-tier detection pattern
- **Preserve:** Full experience on capable devices
- **Effort:** S
- **Dependencies:** Performance monitor thresholds
- **Preview:** skip

#### 3. Strengthen focus visibility on header controls

- **Current:** Transparent header over 3D
- **Proposed:** High-contrast focus ring on Menu, music toggle, logo button
- **Trend justification:** anti-patterns — keyboard nav
- **Preserve:** Minimal header visual weight
- **Effort:** S
- **Preview:** slice-nav

### P1 — Brand elevation

#### 4. View Transitions between showcase case studies

- **Current:** Standard link navigation between projects
- **Proposed:** Shared-element transition on project thumbnails where supported
- **Trend justification:** motion-2026 — View Transitions API
- **Preserve:** Case study content and layout language
- **Effort:** M
- **Dependencies:** Next.js App Router

### P2 — Strategic

#### 5. Public Shader Lab presets gallery on /lab

- **Current:** Lab section exists; Shader Lab tool separate
- **Proposed:** Embed exportable shader presets as live demos with `useShaderLab` hook docs
- **Trend justification:** basement-studio Shader Lab post
- **Preserve:** Studio craft positioning
- **Effort:** L

## Impact × Effort Matrix

|  | Low effort | High effort |
|--|------------|-------------|
| **High impact** | P0 reduced motion, device tiers | P2 Lab gallery |
| **Medium impact** | P0 focus rings | P1 View Transitions |

## Migration Path

### Phase A — 1 sprint
- P0 items 1–3

### Phase B — 2–4 weeks
- P1 View Transitions on showcase

### Phase C — Quarter
- P2 Lab integration

## Risks & Constraints

| Risk | Mitigation |
|------|------------|
| Reduced motion feels like downgrade | Optional opt-in to full 3D |
| View Transitions browser support | Progressive enhancement |

## Approval

- [x] Smoke test — proposal generated for validation
- [ ] User approved for implementation

**Next skill:** `design-asset-workflow` | `design-to-implementation`
