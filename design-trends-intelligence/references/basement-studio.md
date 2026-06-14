# basement.studio Design Patterns

Last reviewed: 2026-06

Source: [basement.studio](https://basement.studio/), [New Digital HQ pt 1](https://basement.studio/post/new-digital-hq-pt-1), [Shader Lab](https://basement.studio/post/the-making-of-shader-lab), [Behind the Ship](https://basement.studio/post/behind-the-ship)

## Studio thesis

"Cool shit that performs." Creativity, design, and technology converge without sacrificing speed. Performance constraints are creative drivers, not afterthoughts.

## Signature patterns

### PS2 / stylized low-poly aesthetics

- Intentional visual limitations (PS2-era look) keep 3D lightweight on the web
- Stylization beats photorealism for sustained 60fps experiences
- Apply when: brand wants distinctive 3D without AAA asset weight

### Light-maps and baked lighting

- Bake complex lighting into textures instead of real-time heavy lighting
- Custom shader materials combine textures, reflections, and light-maps in one pass
- Reduces draw-call cost while keeping cohesive look

### Instanced meshes

- Repeat geometry via instancing for scenes with many similar objects
- Custom implementations when engine limits exist (e.g. instanced skinned meshes)

### Texture compression (KTX / glTF-transform)

- KTX with ETC1S compression for 3D textures
- gltf-transform CLI in asset pipeline
- Target: large visual impact, small payload

### Dual-layer rendering

- Main content on standard DOM/canvas
- Overlay canvas for interactive 3D (e.g. contact form model)
- Offscreen canvas / worker rendering to protect main thread

### Shader Lab / coded visuals

- Layer-based shader composition for rapid visual exploration
- `useShaderLab` hook integrates post-processing stack into scenes
- Designers iterate without full code rewrites

### Coded motion over static animation

- Procedural, real-time motion systems
- Scroll-linked and interaction-driven effects
- Keyframed motion only where narrative demands it

### Animating on twos

- Hold poses for 2 frames → 12fps character rhythm at 24fps environment
- Graphic, hand-drawn quality vs fluid 3D realism
- Used in conference/keynote visual identity (e.g. "liquid" theme)

### Liquid / procedural materials

- Node-based shaders: noise, masks, silhouette treatments
- Strong conceptual north star (one metaphor drives entire system)

## Performance checklist (basement-grade)

- [ ] Device-tier detection with simplified scene fallback
- [ ] Performance monitor in dev/staging
- [ ] Texture compression pipeline
- [ ] Instancing for repeated geometry
- [ ] Offscreen/worker rendering for heavy 3D
- [ ] Core Web Vitals budget documented

## When to recommend

| Signal in brandbook | Recommendation |
|--------------------|----------------|
| Creative studio, portfolio, launch site | basement-style bold motion + performance budget |
| SaaS dashboard | Selective: coded micro-motion, not full 3D hero |
| E-commerce at scale | Performance patterns only; simplify 3D |

## Anti-overreach

- Do not add Three.js to every landing page
- PS2 aesthetic must match brand voice — not a default "make it cool" button
- Always pair immersive ideas with fallback for low-end devices
