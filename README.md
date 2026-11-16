# JigSolver Showcase

An interactive presentation of **JigSolver**, an experimental assisted jigsaw-assembly project developed by Lucas Paulo as part of his Computer Science studies at UFMG.

The page introduces the user-facing experience: capturing and characterizing pieces, exploring compatibility estimates, and following a digital reconstruction. It complements the academic poster during a tablet presentation while remaining comfortable on phones and desktop computers.

## Explore the project

- A visual journey through capture, analysis, and assisted assembly.
- Short desktop and mobile demonstrations playing silently in a loop as they enter the viewport.
- Click or keyboard-activate a demonstration to open the video in fullscreen. An accessible, viewport-filling dialog remains available when native fullscreen is unsupported or denied.
- Experimental results presented with their context and limitations, without claiming universal reconstruction.
- Portuguese and English content, remembered language preferences, and light, dark, or system themes.
- Keyboard navigation, a global animation-pause control, and reduced-motion support.

The recordings illustrate an experimental stage of the project. They are not a general accuracy benchmark or a promise of successful reconstruction on arbitrary physical puzzles. See [media provenance](public/media/README.md) for capture conditions, editing details, and credits.

## Scope

This repository is the public, static showcase, not the private reconstruction application. It does not require a backend, database, credentials, or authentication. It does not accept visitor uploads or process puzzles. There are no analytics or third-party trackers.

## Local development

Requirements: **Node.js 24** and **pnpm 10.33.4**.

```sh
pnpm install --frozen-lockfile
pnpm start       # http://localhost:4173
pnpm check       # TypeScript, Biome, tests, production build
```

Additional commands:

```sh
pnpm lint        # validate code, imports, and formatting
pnpm lint:fix    # apply safe fixes
pnpm format
pnpm test
pnpm build
pnpm preview
```

If another process is already using port 4173, stop that instance or run `pnpm start --port 4175`.

## Source structure

```text
src/
  app/App/                 # application composition
  components/
    ui/                    # Icon, Text, ShouldRender, Button, Pressable
    layout/                # Header and Footer
    sections/              # landing-page sections
    media/                 # inline playback and fullscreen/dialog player
    illustrations/         # decorative puzzle artwork
  contexts/                # shared presentation state
  data/                    # media manifest
  lib/                     # preference and fullscreen helpers
  locales/                 # PT/EN resources and i18next setup
  styles/                  # typography, Tailwind, responsive styles
```

Each component has a `Name.tsx` implementation and an `index.tsx` named export. Components use arrow functions. Shared UI primitives follow the JigSolver conventions, adapted for Preact and the showcase's design tokens; [adaptation notes](docs/UI_PRIMITIVES.md) explain their origin and dependency boundaries.

Stack: **Preact, TypeScript, Vite, Tailwind CSS, i18next, Biome, and Vitest**. Fonts are hosted locally. The Biome configuration adapts the JigSolver style rules without its Next.js-specific settings.

## GitHub Pages

The workflow installs dependencies with a frozen lockfile and runs `pnpm check` before uploading the deployment artifact. Deployment depends on that successful validation job: type, lint, test, or build failures block publication. Pull requests only validate; deployment is restricted to `main`.

After reviewing the code, configure **Pages → Source → GitHub Actions** in the repository and push the approved changes. This repository does not configure a custom domain or CNAME.

To test the Pages subdirectory locally:

```sh
BASE_PATH=/jigsolver-showcase/ pnpm build
BASE_PATH=/jigsolver-showcase/ pnpm preview --port 4174
```

The workflow derives the base path from the repository name. A custom domain requires changing `BASE_PATH` to `/` and configuring DNS separately.

## Presentation checklist

Inline videos pause when they leave the viewport, the tab becomes hidden, or an expanded player opens. The global pause control stops every preview; reduced-motion preferences start the page paused. Browser or power-saving policies may still reject autoplay, leaving the poster and manually activated player available.

Test on the actual tablet before the presentation and keep local copies of the clips. There is no service worker or offline guarantee. Preserve synthetic-example labels and research limitations when updating the content. Keep development documentation and code comments in English; public-facing content remains bilingual.
