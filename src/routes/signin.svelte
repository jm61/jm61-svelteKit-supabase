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
  <div class="relative">
    <input
      class="peer h-10 w-full border-b-2 border-gray-600
    focus:border-pink-600 focus:outline-none placeholder:transparent"
      type="email"
      id="email"
      bind:value={email}
      required
      placeholder=""
    />
    <label
      class="
      absolute
      left-0
      -top-3.5
       text-teal-600 text-md 
       peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-400 
       peer-placeholder-shown:top-2
       transition-all
       peer-focus:-top-3.5
       peer-focus:text-gray-400
       peer-focus:text-sm"
      for="email">Email address</label
    >
  </div>
  <div class="relative mt-6">
    <input
      class="peer h-10 w-full border-b-2 border-gray-600
    focus:border-pink-600 focus:outline-none placeholder:transparent"
      type="password"
      id="password"
      placeholder=""
      bind:value={password}
      required
    />
    <label
      class="
      absolute
      left-0
      -top-3.5
      text-teal-600 text-md 
      peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-400 
      peer-placeholder-shown:top-2
      transition-all
      peer-focus:-top-3.5
      peer-focus:text-gray-400
      peer-focus:text-sm"
      for="password">Password</label
    >
  </div>

  <div
    class="mx-auto my-6 outline outline-indigo-800 px-8 py-2 rounded-xl bg-teal-600 text-gray-100 text-md hover:bg-teal-700 hover:shadow-lg hover:shadow-black"
  >
    <input
      type="submit"
      class="button block"
      disabled={loading}
      value="Sign In"
    />
  </div>
</form>
<!-- <form class="flex flex-col text-md" on:submit|preventDefault={signin}>
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
</form> -->
