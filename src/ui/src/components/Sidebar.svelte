<script lang="ts">
  interface Point2 { x: number; y: number; }
  interface Line { start: Point2; end: Point2; }
  interface Wall { id: string; line: Line; }

  let {
    activeTool,
    gridSpacing,
    walls,
    selectedWallId,
    onDeleteWall
  }: {
    activeTool: string;
    gridSpacing: number;
    walls: Wall[];
    selectedWallId: string | null;
    onDeleteWall: (id: string) => void;
  } = $props();

  // Mencari objek dinding yang sedang dipilih
  let selectedWall = $derived(walls.find(w => w.id === selectedWallId));

  // Menghitung panjang dinding
  let wallLength = $derived(
    selectedWall 
      ? Math.hypot(
          selectedWall.line.end.x - selectedWall.line.start.x,
          selectedWall.line.end.y - selectedWall.line.start.y
        )
      : 0
  );
</script>

<aside class="sidebar">
  <div class="panel">
    <h3 class="panel-title">Inspector</h3>
    
    <div class="property">
      <span class="label">Active Tool</span>
      <span class="value capitalize">{activeTool}</span>
    </div>
    <div class="property">
      <span class="label">Grid Size</span>
      <span class="value">{gridSpacing}px</span>
    </div>
    <div class="property">
      <span class="label">Total Walls</span>
      <span class="value">{walls.length}</span>
    </div>
  </div>

  {#if selectedWall}
    <div class="panel highlight-panel">
      <h3 class="panel-title text-orange">Wall Properties</h3>
      
      <div class="property">
        <span class="label">Start X</span>
        <span class="value">{selectedWall.line.start.x.toFixed(1)}</span>
      </div>
      <div class="property">
        <span class="label">Start Y</span>
        <span class="value">{selectedWall.line.start.y.toFixed(1)}</span>
      </div>
      <div class="property">
        <span class="label">End X</span>
        <span class="value">{selectedWall.line.end.x.toFixed(1)}</span>
      </div>
      <div class="property">
        <span class="label">End Y</span>
        <span class="value">{selectedWall.line.end.y.toFixed(1)}</span>
      </div>
      <div class="property">
        <span class="label">Length</span>
        <span class="value font-bold">{wallLength.toFixed(1)} px</span>
      </div>

      <button class="btn-danger" onclick={() => onDeleteWall(selectedWall.id)}>
        Delete Wall
      </button>
    </div>
  {/if}
</aside>

<style>
  .sidebar {
    width: 260px;
    background: var(--bg-elevated);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow-y: auto;
  }

  .panel {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .highlight-panel {
    background: rgba(255, 122, 0, 0.05);
  }

  .panel-title {
    margin: 0 0 1rem 0;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
  }

  .text-orange {
    color: #ff7a00;
  }

  .property {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px dashed var(--border);
    font-size: 0.9rem;
  }
  
  .property:last-of-type {
    border-bottom: none;
  }

  .label { color: var(--text-muted); }
  .value { font-weight: 500; }
  .capitalize { text-transform: capitalize; }
  .font-bold { font-weight: 700; }

  .btn-danger {
    margin-top: 1rem;
    width: 100%;
    padding: 0.6rem;
    background: #dc2626;
    color: white;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background 0.2s;
  }

  .btn-danger:hover {
    background: #b91c1c;
  }
</style>
