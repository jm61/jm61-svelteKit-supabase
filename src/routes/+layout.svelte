<script>
  import "../app.css"
  //import "../global.css";
  import Header from "$lib/Header.svelte"
  import Footer from "$lib/Footer.svelte"
</script>

<Header />
<main class="container p-4 mb-12 md:rounded-lg ">
  <slot />
</main>
<Footer />
