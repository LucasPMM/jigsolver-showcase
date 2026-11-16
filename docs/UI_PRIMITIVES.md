# UI primitive adaptation

The showcase uses a small Preact primitive layer in `src/components/ui/`. Its components are used by the landing sections and player, rather than being an unused parallel design system.

## Origin and changes

- **Icon** follows the JigSolver `apps/web/src/components/ui/Icon` registry and one-file-per-icon organization. Piece, Camera, Sun, Moon, Check, Menu, and X SVG components were adapted from those source files. Local Arrow, Scan, Grid, Desktop, Phone, and Expand icons retain the showcase's existing paths. All icons support size and className and are decorative; the containing control supplies its accessible name.
- **Button** adapts JigSolver's primary/secondary/ghost/danger variants and loading/disabled contract. It uses the local Pressable, showcase CSS tokens, and an explicit `loadingLabel`, instead of importing the private React locale provider or its theme dependencies.
- **ShouldRender** adapts the JigSolver conditional-rendering component by replacing ReactNode with Preact ComponentChildren.
- **Text** and **Pressable** are local complementary implementations. No corresponding components were found in the inspected JigSolver UI directory. Text preserves semantic HTML; Pressable intentionally uses a native button for keyboard activation, focus, and disabled behavior.

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
