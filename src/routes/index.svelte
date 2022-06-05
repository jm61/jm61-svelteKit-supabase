<script>
  import { user } from "$lib/stores/session"
  import { supabase } from "$lib/supabaseClient"

  user.set(supabase.auth.user())

  supabase.auth.onAuthStateChange((state, session) => {
    if (state == "SIGNED_IN") {
      user.set(session.user)
    } else {
      user.set(false)
    }
  })

  const giveAdmin = async () => {
    try {
      const user = await supabase.auth.update({
        data: {
          isAdmin: true,
          role: "admin"
        }
      })
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }
  const dropAdmin = async () => {
    try {
      const user = await supabase.auth.update({
        data: {
          isAdmin: false,
          role: "user"
        }
      })
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  let email = $user?.email.split("@")[0]
  let meta = $user?.user_metadata
  console.log(meta)
</script>

<q class="text-2xl font-semibold italic text-center text-slate-900">
  Welcome on this workbench App dedicated to
  <span
    class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block"
  >
    <span class="relative text-white">Supabase</span></span
  > and built with SvelteKit</q
>

{#if email}
  <h1 class="text-3xl">Welcome back <span class="font-bold">{email}</span>!</h1>
  <button
    on:click|preventDefault={giveAdmin}
    class="mx-auto my-6 outline outline-indigo-800 px-4 py-1 rounded-lg bg-teal-600 text-gray-100 text-md hover:bg-teal-700"
    >Admin +</button
  >
  <button
    on:click|preventDefault={dropAdmin}
    class="mx-auto my-6 outline outline-indigo-800 px-4 py-1 rounded-lg bg-teal-600 text-gray-100 text-md hover:bg-teal-700 ml-4"
    >Admin -</button
  >
  {#if meta.isAdmin}
    <h2 class="mb-4"><mark class="rounded-lg p-2">You are Admin</mark></h2>
    <a href="/admin" class="text-md hover:border-b-2 hover:border-b-teal-600"
      >&rArr Admin</a
    >
  {:else}
    <h2 class="mb-4"><mark class="rounded-lg p-2">You are User</mark></h2>
  {/if}
{:else}
  <h3 class="text-2xl mt-10">You need to sign in!</h3>
{/if}
