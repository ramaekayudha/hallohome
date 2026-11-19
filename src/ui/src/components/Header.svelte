<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';

  let {
    theme,
    onToggleTheme,
  }: {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
  } = $props();

  let open = $state(false);

  const menuItems = ['Editor', 'Library', 'Templates', 'Settings'] as const;

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }
</script>

<header class="header">
  <div class="brand">
    <span class="brand-mark">H</span>
    <span class="brand-name">HalloHome</span>
  </div>

  <div class="actions">
    <ThemeToggle {theme} onToggle={onToggleTheme} />
    <button
      class="hamburger"
      aria-label="Toggle menu"
      aria-expanded={open}
      onclick={toggle}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  {#if open}
    <nav class="dropdown" aria-label="Main menu">
      {#each menuItems as item}
        <button class="dropdown-item" onclick={close}>
          {item}
        </button>
      {/each}
    </nav>
  {/if}
</header>

<style>
  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .brand-mark {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--accent);
    color: #fff;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .brand-name {
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: 0.02em;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 40px;
    height: 40px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg-elevated);
  }

  .hamburger span {
    display: block;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition:
      transform var(--transition),
      opacity var(--transition);
  }

  .hamburger[aria-expanded='true'] span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }
  .hamburger[aria-expanded='true'] span:nth-child(2) {
    opacity: 0;
  }
  .hamburger[aria-expanded='true'] span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    right: 1.5rem;
    min-width: 200px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 10;
  }

  .dropdown-item {
    text-align: left;
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    color: var(--text);
    transition:
      background var(--transition),
      color var(--transition);
  }

  .dropdown-item:hover,
  .dropdown-item:focus-visible {
    background: var(--accent-soft);
    color: var(--accent);
    outline: none;
  }
</style>