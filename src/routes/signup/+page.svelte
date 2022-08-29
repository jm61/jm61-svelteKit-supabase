<script>
  import { supabase } from "$lib/supabaseClient"
  import { goto } from "$app/navigation"
  let loading = false
  let email, password

  const signup = async () => {
    try {
      loading = true
      const { error } = await supabase.auth.signUp({ email, password })
      goto("/")
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      loading = false
    }
  }
</script>

<h1 class="text-4xl mb-4">Supabase + SvelteKit</h1>
<h2 class="text-3xl mb-4">Sign Up</h2>

<form class="flex flex-col text-md" on:submit|preventDefault={signup}>
  <label for="email">Email</label>
  <input
    class="outline-none"
    type="email"
    placeholder="your email..."
    bind:value={email}
    required
  />
  <label for="password">Password</label>
  <input
    class="outline-none"
    type="password"
    placeholder="your password..."
    bind:value={password}
    required
  />
  <div
    class="mx-auto my-6 outline outline-indigo-800 px-8 py-2 rounded-xl bg-teal-600 text-gray-100 text-md hover:bg-teal-700"
  >
    <input
      type="submit"
      class="button block"
      disabled={loading}
      value="Sign Up"
    />
  </div>
</form>
