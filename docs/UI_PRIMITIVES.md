# UI primitive adaptation

The showcase uses a small Preact primitive layer in `src/components/ui/`. Its components are used by the landing sections and player, rather than being an unused parallel design system.

## Origin and changes

- **Icon** follows the JigSolver `apps/web/src/components/ui/Icon` registry and one-file-per-icon organization. Piece, Camera, Sun, Moon, Check, Menu, and X SVG components were adapted from those source files. Local Arrow, Scan, Grid, Desktop, Phone, and Expand icons retain the showcase's existing paths. All icons support size and className and are decorative; the containing control supplies its accessible name.
- **Button** adapts JigSolver's primary/secondary/ghost/danger variants and loading/disabled contract. It uses the local Pressable, showcase CSS tokens, and an explicit `loadingLabel`, instead of importing the private React locale provider or its theme dependencies.
- **ShouldRender** adapts the JigSolver conditional-rendering component by replacing ReactNode with Preact ComponentChildren.
- **Text** and **Pressable** are local complementary implementations. No corresponding components were found in the inspected JigSolver UI directory. Text uses an explicit semantic tag (`as="h2"`, `as="span"`, `as="figcaption"`, etc.). Pressable renders a real anchor when `href` is provided and a native button otherwise. Disabled links have no active destination, expose `aria-disabled`, and are removed from sequential keyboard navigation. New-tab links receive safe relationship attributes.
- **Image** is a local reusable primitive. Ordinary images remain noninteractive; opt-in fullscreen adds a keyboard-accessible trigger, a labelled native-dialog fallback, native fullscreen when available, Escape/close behavior, focus restoration, and an error message. Output crops open their unchanged complete historical panel, while source photographs open the original JPEG.
- **Video** is a local reusable primitive that forwards the media-element ref, children such as caption tracks, and native media attributes. It centralizes silent/inline defaults; viewport, user-gesture, and session orchestration stay outside the primitive.
- Components accepting children use `PropsWithChildren` from `preact/compat` as a type-only import. Image deliberately does not accept children because it represents a void element plus an optional viewer.
- **ShouldRender** supports an optional `fallback` for presentation branches. Keep ordinary conditionals when TypeScript must narrow nullable data or when selecting a value rather than rendering a branch.

The source application is not modified. No backend, authentication, admin features, Next.js modules, or React runtime dependencies are copied into this static site.

## Rights and distribution

These adaptations were requested by the project owner. No repository-level license file was found in the inspected JigSolver root; this document does not assign a new license or infer third-party SVG rights. Confirm the intended source and asset licensing before public redistribution. Preserve any upstream notices if they are added later.

## Usage

```tsx
<Button variant="secondary" loading={saving} loadingLabel={copy.saving}>
  {copy.save}
</Button>

<Pressable aria-label={copy.changeTheme} onClick={changeTheme}>
  <Icon name="sun" />
</Pressable>

<Text as="h2">{copy.heading}</Text>
<ShouldRender if={hasDetails}>
  <Text>{copy.details}</Text>
</ShouldRender>
```

ShouldRender controls rendering, not expression evaluation: use a normal conditional when children depend on a nullable value that TypeScript must narrow. Keep localized labels outside the primitive layer.
