<script>
  import { supabase } from "$lib/supabaseClient"
  import { goto } from "$app/navigation"
  import { user } from "$lib/stores/session"
  let loading = false
  let email, password

  const signin = async () => {
    try {
      loading = true
      const { user, error } = await supabase.auth.signIn({ email, password })
      if (user) {
        goto("/")
      }
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      loading = false
    }
  }
</script>

<h1 class="text-4xl mb-4">Supabase + SvelteKit</h1>
<h2 class="text-3xl mb-4">Sign In</h2>

<form class="flex flex-col text-md" on:submit|preventDefault={signin}>
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
      value="Sign In"
    />
  </div>
</form>
