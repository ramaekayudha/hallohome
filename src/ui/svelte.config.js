import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * HalloHome UI — Svelte configuration.
 *
 * `svelte-check` v4 requires this file to exist explicitly.
 * `vitePreprocess` enables `<script lang="ts">` inside `.svelte` files.
 *
 * @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig}
 */
export default {
  preprocess: vitePreprocess(),
};