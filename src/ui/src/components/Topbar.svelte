<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';

  let {
    projectName,
    theme,
    onToggleTheme,
    activeTool,
    onSelectTool,
  }: {
    projectName: string;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    activeTool: string;
    onSelectTool: (tool: string) => void;
  } = $props();

  let open = $state(false);
  const menuItems = ['File', 'Edit', 'View', 'Help'];
  const tools = [
    { id: 'select', label: 'Select' },
    { id: 'wall', label: 'Wall' },
    { id: 'door', label: 'Door' },
    { id: 'window', label: 'Window' },
  ];

  function toggle() {
    open = !open;
  }
</script>

<header class="topbar">
  <div class="left">
    <button class="hamburger" aria-label="Menu" aria-expanded={open} onclick={toggle}>
      <span></span><span></span><span></span>
    </button>
    <div class="brand">
      <span class="brand-mark">H</span>
      <span class="brand-name">HalloHome</span>
      <span class="divider">/</span>
      <span class="project-name">{projectName}</span>
    </div>
  </div>

  <div class="center">
    {#each tools as tool}
      <button 
        class="tool-btn" 
        class:active={activeTool === tool.id}
        onclick={() => onSelectTool(tool.id)}
      >
        {tool.label}
      </button>
    {/each}
  </div>

  <div class="right">
    <ThemeToggle {theme} onToggle={onToggleTheme} />
  </div>

  {#if open}
    <nav class="dropdown" aria-label="Main menu">
      {#each menuItems as item}
        <button class="dropdown-item" onclick={() => open = false}>
          {item}
        </button>
      {/each}
    </nav>
  {/if}
</header>

<style>
  .topbar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    height: 56px;
    flex-shrink: 0;
    z-index: 10;
  }

  .left, .right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
  }

  .brand-mark {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--accent);
    color: #fff;
  }

  .divider { color: var(--text-muted); }
  .project-name { color: var(--text-muted); font-weight: 500; }

  .center {
    display: flex;
    gap: 0.5rem;
    background: var(--bg);
    padding: 0.25rem;
    border-radius: 8px;
    border: 1px solid var(--border);
  }

  .tool-btn {
    padding: 0.4rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all var(--transition);
  }

  .tool-btn:hover { background: var(--accent-soft); }
  .tool-btn.active { background: var(--accent); color: #fff; }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 32px;
    padding: 4px 0;
  }
  .hamburger span {
    display: block;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
  }

  .dropdown {
    position: absolute;
    top: 60px;
    left: 1rem;
    min-width: 200px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .dropdown-item {
    text-align: left;
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    color: var(--text);
  }
  .dropdown-item:hover { background: var(--accent-soft); color: var(--accent); }
</style>