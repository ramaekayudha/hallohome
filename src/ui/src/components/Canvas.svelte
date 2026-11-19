<script lang="ts">
  let { activeTool, gridSpacing }: { activeTool: string; gridSpacing: number } = $props();
</script>

<main class="canvas-container">
  <div 
    class="grid-layer" 
    style="--grid-size: {gridSpacing}px;"
  ></div>
  
  <div class="canvas-content">
    <p class="hint">Workspace Ready. Tool: <strong>{activeTool}</strong></p>
  </div>
</main>

<style>
  .canvas-container {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid-layer {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(var(--border) 1px, transparent 1px);
    background-size: var(--grid-size) var(--grid-size);
    background-position: center center;
    opacity: 0.6;
    pointer-events: none;
  }

  .canvas-content {
    position: relative;
    z-index: 1;
    background: var(--bg-elevated);
    padding: 1rem 2rem;
    border-radius: 12px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
  }

  .hint {
    margin: 0;
    color: var(--text-muted);
  }
</style>