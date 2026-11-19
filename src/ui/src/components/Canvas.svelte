<script lang="ts">
  interface Point2 { x: number; y: number; }
  interface Line { start: Point2; end: Point2; }
  interface Wall { id: string; line: Line; }

  let {
    activeTool,
    gridSpacing,
    walls,
    selectedWallId,
    onAddWall,
    onSelectWall
  }: {
    activeTool: string;
    gridSpacing: number;
    walls: Wall[];
    selectedWallId: string | null;
    onAddWall: (start: Point2, end: Point2) => void;
    onSelectWall: (id: string | null) => void;
  } = $props();

  let canvasContainer: HTMLElement;
  let isDrawing = $state(false);
  let currentStart = $state<Point2 | null>(null);
  let currentEnd = $state<Point2 | null>(null);

  // Hitung jarak dari titik ke segmen garis (untuk seleksi)
  function distanceToLine(p: Point2, line: Line): number {
    const l2 = Math.pow(line.end.x - line.start.x, 2) + Math.pow(line.end.y - line.start.y, 2);
    if (l2 === 0) return Math.hypot(p.x - line.start.x, p.y - line.start.y);
    
    let t = ((p.x - line.start.x) * (line.end.x - line.start.x) + (p.y - line.start.y) * (line.end.y - line.start.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    
    const projX = line.start.x + t * (line.end.x - line.start.x);
    const projY = line.start.y + t * (line.end.y - line.start.y);
    
    return Math.hypot(p.x - projX, p.y - projY);
  }

  function snapToGrid(val: number) {
    return Math.round(val / gridSpacing) * gridSpacing;
  }

  function getMousePos(e: MouseEvent): Point2 {
    if (!canvasContainer) return { x: 0, y: 0 };
    const rect = canvasContainer.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    return {
      x: snapToGrid(rawX),
      y: snapToGrid(rawY)
    };
  }

  function handleMouseDown(e: MouseEvent) {
    if (e.target instanceof Node && !canvasContainer.contains(e.target)) return;

    const rawPos = getMousePos(e);

    if (activeTool === 'select') {
      // Cari dinding terdekat dalam radius 10px
      let closestWallId: string | null = null;
      let minDistance = 10;

      for (const wall of walls) {
        const dist = distanceToLine(rawPos, wall.line);
        if (dist < minDistance) {
          minDistance = dist;
          closestWallId = wall.id;
        }
      }
      onSelectWall(closestWallId);
      return;
    }

    if (activeTool === 'wall') {
      isDrawing = true;
      currentStart = rawPos;
      currentEnd = rawPos;
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDrawing) return;
    currentEnd = getMousePos(e);
  }

  function handleMouseUp() {
    if (!isDrawing || !currentStart || !currentEnd) return;
    
    if (currentStart.x !== currentEnd.x || currentStart.y !== currentEnd.y) {
      onAddWall(currentStart, currentEnd);
    }

    isDrawing = false;
    currentStart = null;
    currentEnd = null;
  }
</script>

<svelte:window 
  onmousedown={handleMouseDown}
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
/>

<div 
  class="canvas-container" 
  bind:this={canvasContainer}
  class:select-mode={activeTool === 'select'}
>
  <div class="grid-layer" style="--grid-size: {gridSpacing}px;"></div>
  
  <svg class="drawing-layer">
    <!-- Render Walls -->
    {#each walls as wall (wall.id)}
      <line 
        x1={wall.line.start.x} 
        y1={wall.line.start.y} 
        x2={wall.line.end.x} 
        y2={wall.line.end.y} 
        class="wall-line"
        class:selected={selectedWallId === wall.id}
      />
    {/each}

    <!-- Preview Line -->
    {#if isDrawing && currentStart && currentEnd}
      <line 
        x1={currentStart.x} 
        y1={currentStart.y} 
        x2={currentEnd.x} 
        y2={currentEnd.y} 
        class="preview-line"
      />
      <circle cx={currentStart.x} cy={currentStart.y} r="3" class="anchor-point" />
      <circle cx={currentEnd.x} cy={currentEnd.y} r="3" class="anchor-point" />
    {/if}
  </svg>

  {#if activeTool === 'wall' && !isDrawing}
    <div class="tool-hint">Click and drag to draw a wall</div>
  {:else if activeTool === 'select'}
    <div class="tool-hint">Click on a wall to select it</div>
  {/if}
</div>

<style>
  .canvas-container {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: var(--bg);
    cursor: crosshair;
  }

  .canvas-container.select-mode {
    cursor: default;
  }

  .grid-layer {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(var(--border) 1px, transparent 1px);
    background-size: var(--grid-size) var(--grid-size);
    background-position: 0 0;
    opacity: 0.6;
    pointer-events: none;
  }

  .drawing-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  /* SVG Styles */
  .wall-line {
    stroke: var(--accent);
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke 0.1s, stroke-width 0.1s;
  }

  .wall-line.selected {
    stroke: #ff7a00; /* Neon Orange untuk seleksi */
    stroke-width: 6;
    filter: drop-shadow(0 0 4px rgba(255, 122, 0, 0.6));
  }

  .preview-line {
    stroke: var(--accent);
    stroke-width: 2;
    stroke-dasharray: 6 4;
    opacity: 0.7;
  }

  .anchor-point {
    fill: var(--accent);
  }

  .tool-hint {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg-elevated);
    color: var(--text-muted);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    pointer-events: none;
  }
</style>
