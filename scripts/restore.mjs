#!/usr/bin/env node
/**
 * HalloHome — restore snapshot generator.
 *
 * Output: scripts/restore.md (single continuous file, overwritten each run).
 * Only essential source files are recorded.
 * Binary assets (png, woff2, gltf, etc.) are EXCLUDED.
 * Excluded directories: node_modules, target, dist, .git, build, .svelte-kit.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'scripts/restore.md');

const EXCLUDE_DIRS = new Set([
  'node_modules',
  'target',
  'dist',
  'build',
  '.git',
  '.svelte-kit',
  '.vite',
  '.cache',
  'coverage',
  'brand', // generated PNGs
]);

const EXCLUDE_FILES = new Set([
  'pnpm-lock.yaml',
  'Cargo.lock',
  'scripts/restore.md',
  '.DS_Store',
]);

const EXCLUDE_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.svg',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.gltf', '.glb', '.bin',
  '.mp3', '.mp4', '.wav',
  '.zip', '.tar', '.gz', '.7z',
]);

const LANG = {
  '.rs': 'rust',
  '.toml': 'toml',
  '.json': 'json',
  '.js': 'javascript',
  '.mjs': 'javascript',
  '.cjs': 'javascript',
  '.ts': 'typescript',
  '.svelte': 'svelte',
  '.css': 'css',
  '.html': 'html',
  '.md': 'markdown',
  '.yml': 'yaml',
  '.yaml': 'yaml',
  '.txt': 'text',
  '.sh': 'bash',
};

function shouldInclude(relPath, name) {
  if (EXCLUDE_FILES.has(relPath)) return false;
  const ext = path.extname(name).toLowerCase();
  if (EXCLUDE_EXT.has(ext)) return false;
  return true;
}

function walk(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      files.push(...walk(fullPath, relPath));
    } else if (shouldInclude(relPath, entry.name)) {
      files.push({ relPath, fullPath });
    }
  }
  return files;
}

const allFiles = walk(ROOT).sort((a, b) => a.relPath.localeCompare(b.relPath));

let out = '# HalloHome — Restore Snapshot\n\n';
out += `Generated: ${new Date().toISOString()}\n\n`;
out += `Total files: ${allFiles.length}\n\n`;
out += '---\n\n';

for (const { relPath, fullPath } of allFiles) {
  const content = fs.readFileSync(fullPath, 'utf8');
  const lang = LANG[path.extname(relPath).toLowerCase()] || 'text';
  out += `## \`${relPath}\`\n\n`;
  out += '```' + lang + '\n';
  out += content;
  if (!content.endsWith('\n')) out += '\n';
  out += '```\n\n';
}

fs.writeFileSync(OUT, out);
console.log(`✅ restore.md written: ${allFiles.length} files`);