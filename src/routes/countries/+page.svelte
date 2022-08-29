<script>
  import { supabase } from "$lib/supabaseClient"

  async function getData() {
    const { data, error } = await supabase.from("countries").select()
    if (error) throw new Error(error.message)
    return data
  }
</script>

<h1 class="text-center bg-teal-600 text-white">Countries</h1>
{#await getData()}
  <p>Fetching data...</p>
{:then data}
  <li>COUNTRY <span>CONTINENT</span></li>
  {#each data as country}
    {#if country.continent}
      <li>{country.name} <span>{country.continent}</span></li>
    {/if}
  {/each}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}

<style>
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
  }
</style>
