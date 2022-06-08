<script>
  import { supabase } from "$lib/supabaseClient"

  async function getData() {
    const { data, error } = await supabase.from("cars").select()
    if (error) throw new Error(error.message)
    return data
  }

  async function addCar() {
    const { data, error } = await supabase.from("cars").insert({
      brand: "Nissan",
      type: "Calibre",
      engine: "tanduay"
    })
    if (error) throw new Error(error.message)
    return data
  }
</script>

{#await getData()}
  <p>Fetching data...</p>
{:then data}
  <pre>{JSON.stringify(data, null, 2)}</pre>
{/await}

<button on:click|once={addCar}>Add Car</button>
