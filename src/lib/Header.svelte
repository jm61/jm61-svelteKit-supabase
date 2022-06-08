<script>
  import { user } from "$lib/stores/session"
  import { supabase } from "$lib/supabaseClient"
  import { goto } from "$app/navigation"

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      goto("/signin")
      if (error) throw error
    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }
</script>

<header class="container mb-10 p-6 bg-teal-600 text-gray-100 md:rounded-lg">
  <nav class="">
    <ul class="flex gap-4 font-sans lg:text-xl text-sm flex-wrap">
      <li class="mr-auto hover:shadow-lg lg:text-2xl hover:shadow-white">
        <a href="/">Home</a>
      </li>
      <li class="hover:shadow-lg hover:shadow-white">
        <a href="/games">Games</a>
      </li>
      <li class="hover:shadow-lg hover:shadow-white">
        <a href="/countries">Countries</a>
      </li>
      <li class="hover:shadow-lg hover:shadow-white">
        <a href="/signin">SignIn</a>
      </li>
      {#if !$user}
        <li class="hover:shadow-lg hover:shadow-white">
          <a href="/signup">SignUp</a>
        </li>
      {/if}
      {#if $user}
        <li class="hover:shadow-lg hover:shadow-white">
          <a href="/profile">Profile</a>
        </li>
        <li class="hover:shadow-lg hover:shadow-white">
          <a href="/todos">Todos</a>
        </li>
        <li
          class="outline rounded-lg px-2 outline-orange-400 hover:shadow-lg hover:shadow-white"
        >
          <button on:click={signOut}>SignOut</button>
        </li>
      {/if}
    </ul>
  </nav>
</header>
