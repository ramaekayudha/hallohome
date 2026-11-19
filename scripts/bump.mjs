#!/usr/bin/env node
/**
 * HalloHome — 100% release pipeline.
 *
 * Steps:
 *  1. Verify (must be GREEN).
 *  2. Compute next version (carry base-10 per segment).
 *  3. Update versions in: package.json (root + UI), Cargo.toml, tauri.conf.json, README badge.
 *  4. Regenerate scripts/restore.md.
 *  5. git add + commit + tag + push.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function run(cmd, opts = {}) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts });
}

function nextVersion(v) {
  const [maj, min, pat] = v.split('.').map((n) => Number.parseInt(n, 10));
  if (!Number.isFinite(maj) || !Number.isFinite(min) || !Number.isFinite(pat)) {
    throw new Error(`Invalid version: ${v}`);
  }
  if (pat < 9) return `${maj}.${min}.${pat + 1}`;
  if (min < 9) return `${maj}.${min + 1}.0`;
  return `${maj + 1}.0.0`;
}

function readPkg(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writePkg(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function replaceInFile(file, pattern, replacement) {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const next = content.replace(pattern, replacement);
  if (next === content) return;
  fs.writeFileSync(file, next);
}

// --- 0. Sanity ---
try {
  execSync('git rev-parse --git-dir', { stdio: 'ignore', cwd: ROOT });
} catch {
  console.error('❌ Not a git repository. Run `git init` first.');
  process.exit(1);
}

// --- 1. Verify ---
run('pnpm verify');

// --- 2. Compute next version ---
const rootPkgPath = path.join(ROOT, 'package.json');
const rootPkg = readPkg(rootPkgPath);
const current = rootPkg.version;
const next = nextVersion(current);
console.log(`\n📦 Version: ${current} → ${next}`);

// --- 3. Update versions ---
// Root package.json
rootPkg.version = next;
writePkg(rootPkgPath, rootPkg);

// UI package.json
const uiPkgPath = path.join(ROOT, 'src/ui/package.json');
if (fs.existsSync(uiPkgPath)) {
  const uiPkg = readPkg(uiPkgPath);
  uiPkg.version = next;
  writePkg(uiPkgPath, uiPkg);
}

// Workspace Cargo.toml
replaceInFile(
  path.join(ROOT, 'Cargo.toml'),
  /(\[workspace\.package\][\s\S]*?version\s*=\s*)"[^"]+"/,
  `$1"${next}"`
);

// tauri.conf.json
replaceInFile(
  path.join(ROOT, 'src/tauri/tauri.conf.json'),
  /"version"\s*:\s*"[^"]+"/,
  `"version": "${next}"`
);

// README badge
replaceInFile(
  path.join(ROOT, 'README.md'),
  /(badge\/version-)\d+\.\d+\.\d+(-)/g,
  `$1${next}$2`
);

// --- 4. Regenerate restore.md ---
run('node scripts/restore.mjs');

// --- 5. Commit, tag, push ---
run('git add -A');
run(`git commit -m "release: v${next}"`);
run(`git tag v${next}`);
run('git push origin HEAD --follow-tags');

console.log(`\n🚀 Released v${next}`);