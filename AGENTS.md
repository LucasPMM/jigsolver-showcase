# Development guide for coding assistants

## Product and boundaries

JigSolver Showcase is a public, static presentation of an experimental assisted jigsaw-assembly project. It is not the private reconstruction application. Keep academic claims contextualized; retain the name JigSolver but do not call the project a universal “solver”. Synthetic reconstructions and viewport simulations must remain clearly labelled. Do not expose private code, credentials, admin screens, personal data, or unlicensed media.

## Working agreements

- Preserve existing user changes, including staged changes. Do not commit, push, deploy, change DNS, or modify the private application without an explicit request.
- Use pnpm, never npm/yarn. Keep pnpm-lock.yaml consistent and avoid additional lockfiles.
- Use TypeScript, Preact, Tailwind and the existing design language. Keep the site mobile-first and comfortable on presentation tablets.
- Prefer arrow functions throughout. Place each UI component in `src/components/{ui,layout,sections,media,illustrations}/Name/Name.tsx` with a named re-export in `index.tsx`.
- Write development documentation and code comments in English; keep public-facing PT/EN copy in `src/locales/content.ts`.
- Reuse the primitives in `src/components/ui`; consult `docs/UI_PRIMITIVES.md` before copying more source code.
- Put shared state in the showcase context and pure rules in testable modules. Avoid duplicating state in presentation sections.
- Follow `biome.json`. Use `pnpm lint:fix` for safe fixes; inspect changes before using unsafe fixes. Do not disable rules just to hide problems.
- Maintain matching PT/EN translation structures. Provide accessible names for icon-only controls; flags are decorative, not the accessible name of a language.
- Respect reduced motion. Inline videos must be muted, looped, inline, pausable, and suspended when offscreen or the document is hidden. Keep manual playback available when autoplay is denied.
- Fullscreen requests must originate from user activation and retain the accessible dialog as a fallback. Do not restore play overlays or duration badges.
- Use `asset()` for public media paths so GitHub Pages subpaths work. Keep videos optimized and document provenance in `public/media/README.md`.

## Validation

Run `pnpm check` (typecheck, Biome, Vitest, production build) before delivery. For routing/assets, also run `BASE_PATH=/jigsolver-showcase/ pnpm build` and preview with the same `BASE_PATH`.

Check 320–390px mobile, portrait/landscape tablet and desktop; PT/EN, themes, keyboard focus, modal Escape, video switching, reduced motion and automatic looping. Do not claim physical-device coverage from viewport simulation. CI must validate before deployment and must not deploy pull requests.
