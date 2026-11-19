<script lang="ts">
  import Header from './components/Header.svelte';
  import HeroLogo from './components/HeroLogo.svelte';
  import Footer from './components/Footer.svelte';

  type Theme = 'light' | 'dark';

  function initialTheme(): Theme {
    try {
      const s = localStorage.getItem('hallohome.theme');
      if (s === 'dark' || s === 'light') return s;
    } catch {
      /* ignore */
    }
    return 'light';
  }

  let theme = $state<Theme>(initialTheme());

  $effect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('hallohome.theme', theme);
    } catch {
      /* ignore */
    }
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
  }
</script>

<Header {theme} onToggleTheme={toggleTheme} />

<main class="main">
  <HeroLogo />
</main>

<Footer />

<style>
  .main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
</style>