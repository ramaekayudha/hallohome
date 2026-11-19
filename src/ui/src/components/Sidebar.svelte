<script lang="ts">
  interface Point2 { x: number; y: number; }
  interface Line { start: Point2; end: Point2; }
  interface Wall { id: string; line: Line; }

  let { activeTool, gridSpacing, walls }: { activeTool: string; gridSpacing: number; walls: Wall[] } = $props();
</script>

<aside class="sidebar">
  <div class="panel">
    <h3 class="panel-title">Properties</h3>
    <div class="property">
      <span class="label">Active Tool</span>
      <span class="value capitalize">{activeTool}</span>
    </div>
    <div class="property">
      <span class="label">Grid Size</span>
      <span class="value">{gridSpacing}px</span>
    </div>
    <div class="property">
      <span class="label">Walls</span>
      <span class="value">{walls.length}</span>
    </div>
  </div>
</aside>

<style>
  .sidebar {
    width: 260px;
    background: var(--bg-elevated);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .panel {
    padding: 1rem;
  }

  .panel-title {
    margin: 0 0 1rem 0;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
  }

  .property {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
  }

  .label { color: var(--text-muted); }
  .value { font-weight: 500; }
  .capitalize { text-transform: capitalize; }
</style>