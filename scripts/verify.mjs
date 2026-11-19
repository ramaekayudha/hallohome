#!/usr/bin/env node
/**
 * HalloHome — full verification.
 *
 * Order matters:
 *   0. Woff2 fonts must exist (4 files) — enforces "Lora only".
 *   1. Logo generation.
 *   2. Frontend build.
 *   3. Rust fmt / clippy / test / build.
 *   4. Frontend typecheck / lint.
 *
 * Exit code 0 = GREEN. Any failure = RED.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT });
}

function checkFonts() {
  const dir = path.join(ROOT, 'src/ui/public/fonts');
  const required = [
    'Lora-Regular.woff2',
    'Lora-Medium.woff2',
    'Lora-Bold.woff2',
    'Lora-Italic.woff2',
  ];
  const missing = required.filter((f) => !fs.existsSync(path.join(dir, f)));
  if (missing.length > 0) {
    console.error('\n❌ MISSING LORA FONTS:');
    for (const f of missing) console.error(`   - src/ui/public/fonts/${f}`);
    console.error(
      '\n   See src/ui/public/fonts/README.md for download instructions.'
    );
    console.error('   Rule: only Lora is allowed. No fallback to other fonts.\n');
    process.exit(1);
  }
  console.log('✅ Lora fonts present (4/4)');
}

try {
  checkFonts();
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