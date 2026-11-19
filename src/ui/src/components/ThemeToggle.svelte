<script lang="ts">
  let {
    theme,
    onToggle,
  }: {
    theme: 'light' | 'dark';
    onToggle: () => void;
  } = $props();
</script>

<button
  class="theme-toggle"
  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
  onclick={onToggle}
>
  {#if theme === 'light'}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  {:else}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg-elevated);
    display: grid;
    place-items: center;
    color: var(--text);
    transition: all var(--transition);
  }

  .theme-toggle:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>