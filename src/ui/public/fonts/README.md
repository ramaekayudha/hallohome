# Lora Fonts — Required

**Rule: HalloHome uses Lora only. No other fonts are permitted.**

Place these files in this folder (`src/ui/public/fonts/`):

- `Lora-Regular.woff2`
- `Lora-Medium.woff2`
- `Lora-Bold.woff2`
- `Lora-Italic.woff2`

`pnpm verify` will fail if any of them is missing.

## How to obtain

1. Open https://fonts.google.com/specimen/Lora
2. Click **"Get font"** → **"Download all"**.
3. Unzip the download. It contains `static/` and `Lora-VariableFont_wght.ttf`.
4. Convert the following TTFs to `.woff2` (any online tool or `fonttools`):

   - `static/Lora-Regular.ttf` → `Lora-Regular.woff2`
   - `static/Lora-Medium.ttf` → `Lora-Medium.woff2`
   - `static/Lora-Bold.ttf` → `Lora-Bold.woff2`
   - `static/Lora-Italic.ttf` → `Lora-Italic.woff2`

   Using `fonttools`:

   ```
   pip install fonttools brotli
   fonttools ttLib.woff2 compress -o Lora-Regular.woff2 static/Lora-Regular.ttf
   ```

5. Drop the 4 `.woff2` files into this folder.

## License

Lora is licensed under the SIL Open Font License 1.1. The full text is in `OFL.txt` in this folder.