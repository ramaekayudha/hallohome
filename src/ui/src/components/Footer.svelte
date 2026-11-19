<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <p class="footer-line">
    © Copyright {year} HalloHome | <a href="#terms">Terms of Use</a> |
    <a href="#license">License</a>
  </p>
</footer>

<style>
  .footer {
    background: var(--bg-elevated);
    border-top: 1px solid var(--border);
    padding: 0.5rem 1rem;
    text-align: center;
    flex-shrink: 0;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-line {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .footer-line a {
    color: var(--accent);
    text-decoration: none;
  }

  .footer-line a:hover {
    text-decoration: underline;
  }
</style>