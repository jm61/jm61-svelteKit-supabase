<script>
  import { supabase } from "$lib/supabaseClient"

  $: result = []
  $: counted = 0
  let selected = ""

  async function handleSelect(event) {
    selected = event.target.value
    const { data, error, count } = await supabase
      .from("countries")
      .select("*", { count: "exact" })
      .eq("continent", selected)
    result = data
    counted = count
    if (error) throw new Error(error.message)
    return result
  }
</script>

<label for="countries">Select a continent:</label>

<select
  class="input text-center"
  name="countries"
  id="countries"
  on:change={handleSelect}
>
  <option value="" />
  <option value="Africa">Africa</option>
  <option value="Antarctica">Antarctica</option>
  <option value="Asia">Asia</option>
  <option value="Europe">Europe</option>
  <option value="North America">North America</option>
  <option value="Oceania">Oceania</option>
  <option value="South America">South America</option>
</select>

{#if counted}
  <div class="mt-4">
    <span>There are {counted} countries in {selected}</span>
  </div>
{/if}
<div class="cont">
  {#each result as country}
    <span class="input p-2 m-2 text-center">{country.name}</span>
  {/each}
</div>

<style>
  .cont {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    margin: 2rem;
    width: 350px;
    height: 400px;
    padding: 1rem;
    border-radius: 20px;
    box-sizing: border-box;
    box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
    background-color: lavenderblush;
  }
  .input {
    background-color: lavenderblush;
    height: 3rem;
    border-radius: 3rem;
    box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
    border: none;
  }
</style>
