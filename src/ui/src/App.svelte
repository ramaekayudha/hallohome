<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke, isTauri } from '@tauri-apps/api/core';
  import Topbar from './components/Topbar.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Canvas from './components/Canvas.svelte';
  import Footer from './components/Footer.svelte';

  type Theme = 'light' | 'dark';

  interface Point2 { x: number; y: number; }
  interface Line { start: Point2; end: Point2; }
  interface Wall { id: string; line: Line; }
  interface Grid { spacing: number; origin: Point2; }
  interface WorkspaceState { project_name: string; grid: Grid; walls: Wall[]; }

  function initialTheme(): Theme {
    try {
      const s = localStorage.getItem('hallohome.theme');
      if (s === 'dark' || s === 'light') return s;
    } catch { /* ignore */ }
    return 'light';
  }

  let theme = $state<Theme>(initialTheme());
  let activeTool = $state('select');
  let projectName = $state('Loading...');
  let gridSpacing = $state(20);
  let walls = $state<Wall[]>([]);

  $effect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('hallohome.theme', theme); } catch { /* ignore */ }
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
  }

  function addWall(start: Point2, end: Point2) {
    const newWall: Wall = {
      id: crypto.randomUUID(),
      line: { start, end }
    };
    walls = [...walls, newWall];
  }

  onMount(async () => {
    try {
      if (isTauri()) {
        const state = await invoke<WorkspaceState>('get_workspace_state');
        projectName = state.project_name;
        gridSpacing = state.grid.spacing;
        walls = state.walls;
      } else {
        projectName = 'Browser Preview';
      }
    } catch (e) {
      console.error(e);
      projectName = 'Error loading';
    }
  });
</script>

<div class="app-container">
  <Topbar 
    {projectName} 
    {theme} 
    onToggleTheme={toggleTheme} 
    {activeTool} 
    onSelectTool={(t) => activeTool = t} 
  />
  
  <div class="app-body">
    <Sidebar {activeTool} {gridSpacing} {walls} />
    <Canvas {activeTool} {gridSpacing} {walls} onAddWall={addWall} />
  </div>

  <Footer />
</div>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: var(--bg);
    color: var(--text);
  }

  .app-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
</style>