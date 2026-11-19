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
    border-top: 1px solid var(--border);
    background: var(--bg-elevated);
    padding: 1rem 1.5rem;
    text-align: center;
  }

  .footer-line {
    margin: 0;
    font-size: 0.9rem;
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