# HalloHome — Architecture

## Layer separation (permanent rule)

| Layer | Path | Rule |
| --- | --- | --- |
| Core engine | `src/core` | Rust, UI-agnostic. Never imports from `src/ui` or `src/tauri`. |
| Bridge | `src/tauri` | Tauri v2. Calls `hallohome-core` and exposes commands. |
| UI | `src/ui` | Svelte 5 + Vite + TypeScript. Calls Tauri commands only. |

`src/core` must compile independently:

```bash
cargo build -p hallohome-core
```

## Data flow

```
UI (Svelte)  ->  Tauri command  ->  Core engine  ->  Result  ->  UI
```

Rules:

- No business logic in the Tauri bridge.
- No UI concerns in the core engine.
- No cross-imports between layers except: `src/tauri` depends on `src/core`, and `src/ui` communicates through Tauri commands.

## File formats

- Project file: `.hallohome` (JSON, versioned via `SCHEMA_VERSION`).
- 3D asset: glTF 2.0 / GLB.

## Typography

Lora only. Bundled as `woff2` under `src/ui/public/fonts/`.

- No CDN.
- No additional fonts.
- `@font-face` declarations live in `src/ui/src/styles/lora.css`.

## Themes

`data-theme="light" | "dark"` on `<html>`.

- Light: Corporate Blue.
- Dark: Neon Orange.

CSS variables live in `src/ui/src/styles/theme.css`.

User selection persisted in `localStorage` under key `hallohome.theme`.

## Layout

- Header with hamburger + dropdown (user-pickable items).
- Hero logo centered.
- Footer single line: `© Copyright {year} HalloHome | Terms of Use | License`.

## Versioning

Carry per segment, base-10:

```
0.0.0 -> 0.0.1 -> ... -> 0.0.9 -> 0.1.0 -> ... -> 0.9.9 -> 1.0.0
```

Handled by `scripts/bump.mjs`. No alternative roadmap is permitted in code or UI.

## Verification

Every change must pass `pnpm verify`:

- RED -> fix -> re-verify.
- GREEN required before any release.
- Release via `pnpm bump` only after GREEN.

## Scripts

- `scripts/verify.mjs` — orchestrates all checks (exit 0 = GREEN, non-zero = RED).
- `scripts/bump.mjs` — full release pipeline (verify, version carry, manifests, README, restore, git add/commit/tag/push).
- `scripts/restore.mjs` — writes `scripts/restore.md`, single continuous file, overwritten each run, binary excluded.
- `scripts/logo.mjs` — generates brand PNGs into `src/ui/public/brand/`.

## Restore

`scripts/restore.md` is the single continuous snapshot of essential source files.

- Binary assets excluded (png, woff2, gltf, glb, etc.).
- Excluded directories: `node_modules`, `target`, `dist`, `build`, `.git`, `.svelte-kit`, `.vite`, `.cache`, `coverage`, `brand`.
- Overwritten every run.

## CI

`.github/workflows/verify.yml` runs on push and pull request to `main` and executes `pnpm verify`.