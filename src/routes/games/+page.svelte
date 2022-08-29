<script>
  import { supabase } from "$lib/supabaseClient"

  async function getData() {
    const { data, error } = await supabase.from("games").select()
    if (error) throw new Error(error.message)
    return data
  }

  let newGame, cat, year
  let submit = false

  async function sendData() {
    const { data, error } = await supabase.from("games").insert([
      {
        title: newGame,
        category: cat,
        year: year
      }
    ])
    myForm.reset()
    if (error) throw new Error(error.message)
    return data
  }
</script>

<h1>Games Testing</h1>

<table
  class="border-collapse border border-slate-500 text-center mx-auto lg:w-1/2"
>
  <thead>
    <tr>
      <th class="border border-slate-600">Title</th>
      <th class="border border-slate-600">Category</th>
      <th class="border border-slate-600 px-6">Year</th>
    </tr>
  </thead>
  <tbody>
    {#await getData()}
      <br />
      <p>Fetching data...</p>
    {:then data}
      {#each data as game}
        <tr class="odd:bg-teal-600 odd:text-gray-100">
          <td class="border border-slate-700">{game.title}</td>
          <td class="border border-slate-700">{game.category}</td>
          <td class="border border-slate-700">{game.year}</td>
        </tr>
      {/each}
    {:catch error}
      <p>Something went wrong while fetching the data:</p>
      <pre>{error}</pre>
    {/await}
  </tbody>
</table>
<br />

<form
  class="flex flex-col gap-2"
  id="myForm"
  on:submit|preventDefault={() => (submit = true)}
>
  <label for="title">Title</label>
  <input type="text" bind:value={newGame} name="title" required />

  <label for="cat">Category</label>
  <input type="text" bind:value={cat} name="cat" required />

  <label for="year">Year</label>
  <input type="number" bind:value={year} name="year" required />
  <input
    class="cursor-pointer hover:shadow-lg hover:shadow-black hover:px-2 rounded-lg hover:bg-teal-600 hover:text-white hover:transition-all duration-500"
    type="submit"
    value="Add Game"
    on:click={() => (submit = false)}
  />
</form>
{#if submit}
  {#await sendData()}
    <p>Sending data...</p>
  {:then data}
    <p>Successfully sent data.</p>
  {:catch error}
    <p>Something went wrong while sending the data:</p>
    <pre>{error}</pre>
  {/await}
{/if}

<!-- <style>
  .sub {
    margin-top: 1rem;
  }
  .sub:hover {
    color: rgb(43, 43, 46);
    background-color: #4dc449;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-size: larger;
  }

  tr:nth-child(even) {
    background-color: #4dc449;
  }
</style>
 -->
