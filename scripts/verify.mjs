#!/usr/bin/env node
/**
 * HalloHome — full verification.
 *
 * Order matters:
 *   1. Logo generation (ensures brand PNGs exist for build).
 *   2. Frontend build (ensures dist/ exists for Tauri build script).
 *   3. Rust fmt / clippy / test / build.
 *   4. Frontend typecheck / lint.
 *
 * Exit code 0 = GREEN. Any failure = RED.
 */

import { execSync } from 'node:child_process';

const ROOT = process.cwd();

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT });
}

try {
  run('pnpm logo');
  run('pnpm --filter @hallohome/ui build');
  run('cargo fmt --all -- --check');
  run('cargo clippy --workspace --all-targets -- -D warnings');
  run('cargo test --workspace');
  run('cargo build --release --workspace');
  run('pnpm --filter @hallohome/ui typecheck');
  run('pnpm --filter @hallohome/ui lint');
  console.log('\n✅ VERIFY PASSED — GREEN');
} catch {
  console.error('\n❌ VERIFY FAILED — RED');
  process.exit(1);
}