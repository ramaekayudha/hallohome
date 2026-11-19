# HalloHome

![Version](https://img.shields.io/badge/version-0.0.3-blue)
![Status](https://img.shields.io/badge/status-active-success)
![Tech](https://img.shields.io/badge/tech-Rust%20%2B%20Tauri%20v2%20%2B%20Svelte%205-orange)
![License](https://img.shields.io/badge/license-GPL--3.0--or--later-blue)

**HalloHome** — Floor plan editor with professional 3D rendering, a curated asset library, and a professional layout system.

## Stack

| Layer | Tech | Path |
| --- | --- | --- |
| Core engine | Rust (UI-agnostic) | `src/core` |
| Bridge | Tauri v2 | `src/tauri` |
| UI | Svelte 5 + Vite + TypeScript | `src/ui` |

- **Typography**: Lora only.
- **Themes**: Light (Corporate Blue) / Dark (Neon Orange). User-pickable.
- **3D assets**: glTF 2.0 / GLB.
- **Project file**: `.hallohome` (versioned JSON).

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm verify` | Full verification (logo, UI build, fmt, clippy, test, build, typecheck, lint) |
| `pnpm bump` | Release: verify → carry version → update badges/manifests → restore → commit → tag → push |
| `pnpm restore` | Regenerate `scripts/restore.md` (source snapshot, binary excluded) |
| `pnpm logo` | Generate brand PNGs into `src/ui/public/brand/` |

## License

GPL-3.0-or-later. See [LICENSE](./LICENSE).