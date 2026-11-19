<section class="hero">
  <img
    src="/brand/logo-hero-512.png"
    alt="HalloHome logo"
    class="hero-logo"
    width="128"
    height="128"
  />
  <h1 class="hero-title">HalloHome</h1>
  <p class="hero-subtitle">Design. Visualize. Live.</p>
</section>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }

  .hero-logo {
    width: 128px;
    height: 128px;
    border-radius: 24px;
    box-shadow: var(--shadow);
  }

  .hero-title {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .hero-subtitle {
    margin: 0;
    color: var(--text-muted);
    font-style: italic;
    font-size: 1.1rem;
  }
</style>