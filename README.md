# JigSolver Showcase

An interactive presentation of **JigSolver**, an experimental assisted jigsaw-assembly project developed by Lucas Paulo as part of his Computer Science studies at UFMG.

The page introduces the user-facing experience: capturing and characterizing pieces, exploring compatibility estimates, and following a digital reconstruction. It complements the academic poster during a tablet presentation while remaining comfortable on phones and desktop computers.

## Explore the project

- A visual journey through capture, analysis, and assisted assembly.
- Short desktop and mobile demonstrations playing silently in a loop as they enter the viewport.
- Click or keyboard-activate a demonstration to open the existing video directly in native fullscreen. Leaving fullscreen returns to the page, without an intermediate player. A viewport-filling, accessible player is used only if native fullscreen is unavailable or rejected.
- A computed assembly proposal for 30 photographed sea-life puzzle pieces, exported as an animation, with physical verification still pending. The clip is not a real-time processing recording.
- Real photographed pieces paired with historical Classical and MobileSAM segmentation examples, with qualitative limitations rather than accuracy claims.
- Portuguese and English content, remembered language preferences, and light or dark themes. New visits default to English and light mode, independently of system preferences.
- Keyboard navigation, a global animation-pause control, and reduced-motion support.
- Clickable photographs and historical comparison panels, with an accessible fullscreen image viewer.

The recordings illustrate an experimental stage of the project. They are not a general accuracy benchmark or a promise of successful reconstruction on arbitrary physical puzzles. See [media provenance](public/media/README.md) for capture conditions, editing details, and credits.

## Scope

This repository is the public, static showcase, not the private reconstruction application. It does not require a backend, database, credentials, or authentication. It does not accept visitor uploads or process puzzles. There are no analytics or tracking scripts; the author avatar makes an image request to GitHub.

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
    ui/                    # Text, Pressable, Button, Image, Video, Icon, ShouldRender
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

Stack: **Preact, TypeScript, Vite, Tailwind CSS, i18next, Biome, and Vitest**. Fonts are hosted locally. The author avatar is loaded dynamically from the public GitHub profile, with initials as a network-error fallback. The Biome configuration adapts the JigSolver style rules without its Next.js-specific settings.

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

Inline videos pause when they leave the viewport, the tab becomes hidden, or an expanded player opens. The global pause control stops every preview; reduced-motion preferences start the page paused. Browser or power-saving policies may still reject autoplay. The player now reports that state and provides explicit Play/Restart actions, a fullscreen retry after metadata loads, and a direct video link when loading or playback fails. See [iPad playback notes](docs/MEDIA_PLAYBACK.md) for implementation and testing boundaries.

Test on the actual tablet before the presentation and keep local copies of the clips. There is no service worker or offline guarantee. Preserve synthetic-example labels and research limitations when updating the content. Keep development documentation and code comments in English; public-facing content remains bilingual.

### Languages and deployment version

The showcase supports English, Brazilian Portuguese and French, including media captions. Language and theme preferences persist locally; `?lang=fr` opens the French presentation.

The footer displays a build-time version. GitHub Actions supplies its monotonically increasing workflow run number as the patch version (`0.1.<run>`). A retry keeps the same version; a new deployment run increases it. Pull requests and failed runs can leave gaps, so the number is a deployment identifier rather than a count of successful releases. No version-bump commit or repository write permission is needed. Local builds show the package version with `-dev`. Keep this workflow identity when preserving the sequence.
