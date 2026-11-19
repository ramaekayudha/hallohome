#!/usr/bin/env node
/**
 * HalloHome — brand + Tauri icon generator.
 *
 * Outputs:
 *   src/ui/public/brand/
 *     - favicon-32.png
 *     - apple-touch-180.png
 *     - logo-hero-512.png
 *     - logo.png
 *
 *   src/tauri/icons/         (required by tauri-build on all platforms)
 *     - 32x32.png
 *     - 128x128.png
 *     - 128x128@2x.png       (256x256)
 *     - icon.png             (512x512)
 *     - icon.ico             (256x256 PNG-wrapped ICO, Windows resource)
 */

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const UI_OUT = path.join(ROOT, 'src/ui/public/brand');
const TAURI_OUT = path.join(ROOT, 'src/tauri/icons');

fs.mkdirSync(UI_OUT, { recursive: true });
fs.mkdirSync(TAURI_OUT, { recursive: true });

const SIZE = 512;
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e40af"/>
      <stop offset="100%" stop-color="#ff7a00"/>
    </linearGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" rx="96" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
        font-family="serif" font-size="280" font-weight="bold" fill="#ffffff">H</text>
</svg>`;

const buf = Buffer.from(svg);

// --- UI brand ---------------------------------------------------------
await sharp(buf).resize(32, 32).png().toFile(path.join(UI_OUT, 'favicon-32.png'));
await sharp(buf).resize(180, 180).png().toFile(path.join(UI_OUT, 'apple-touch-180.png'));
await sharp(buf).resize(512, 512).png().toFile(path.join(UI_OUT, 'logo-hero-512.png'));
await sharp(buf).resize(512, 512).png().toFile(path.join(UI_OUT, 'logo.png'));

// --- Tauri icons ------------------------------------------------------
await sharp(buf).resize(32, 32).png().toFile(path.join(TAURI_OUT, '32x32.png'));
await sharp(buf).resize(128, 128).png().toFile(path.join(TAURI_OUT, '128x128.png'));
await sharp(buf).resize(256, 256).png().toFile(path.join(TAURI_OUT, '128x128@2x.png'));
await sharp(buf).resize(512, 512).png().toFile(path.join(TAURI_OUT, 'icon.png'));

// icon.ico: single 256x256 PNG-wrapped ICO (Windows resource)
const png256 = await sharp(buf).resize(256, 256).png().toBuffer();
fs.writeFileSync(path.join(TAURI_OUT, 'icon.ico'), makeIco(png256));

/**
 * Wrap a single PNG buffer into a minimal ICO container.
 * Spec: ICONDIR (6 B) + ICONDIRENTRY (16 B) + PNG data.
 * Width/Height byte 0 means 256.
 */
function makeIco(pngBuf) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = 1 (ICO)
  header.writeUInt16LE(1, 4); // count = 1

  const entry = Buffer.alloc(16);
  entry.writeUInt8(0, 0); // width (0 = 256)
  entry.writeUInt8(0, 1); // height (0 = 256)
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bit count
  entry.writeUInt32LE(pngBuf.length, 8); // size
  entry.writeUInt32LE(6 + 16, 12); // offset = 22

  return Buffer.concat([header, entry, pngBuf]);
}

console.log('✅ brand + Tauri icons generated');