<script>
  import { user, alert } from "$lib/stores/session"
  import { supabase } from "$lib/supabaseClient"
  import Alert from "$lib/components/Alert.svelte"

  user.set(supabase.auth.user())

  supabase.auth.onAuthStateChange((state, session) => {
    if (state == "SIGNED_IN") {
      user.set(session.user)
    } else {
      user.set(false)
    }
  })

  const session = supabase.auth.session()
  const expireAt = new Date(session?.expires_at * 1000)
  console.log(expireAt.toTimeString().split("G")[0])

  const giveAdmin = async () => {
    try {
      alert.set("You are Admin")
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
  let meta = $user?.user_metadata.role
  alert.set(meta)
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
  <h1 class="text-3xl">
    Welcome back <span
      class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block"
      ><span class="relative text-white">{email.toUpperCase()}</span></span
    >
  </h1>
  <button
    on:click|preventDefault={giveAdmin}
    class="mx-auto my-6 outline outline-indigo-800 px-4 py-1 rounded-lg bg-teal-600 text-gray-100 text-md hover:bg-teal-700"
    >Admin +</button
  >
  <button
    on:click|preventDefault={dropAdmin}
    class="mx-auto my-6 outline outline-indigo-800 px-4 py-1 rounded-lg bg-teal-600 text-gray-100 text-md hover:bg-teal-700 ml-4"
    >Admin -</button
  ><br />
  {#if meta === "admin"}
    <Alert />
    <a href="/admin" class="text-md hover:border-b-2 hover:border-b-teal-600"
      >&rArr Admin</a
    ><br />
    <a href="/toasts" class="text-md hover:border-b-2 hover:border-b-teal-600"
      >&rArr Toasts</a
    >
  {:else}
    <Alert />
  {/if}
{:else}
  <div class="mt-6 text-center ">
    <a
      href="/signin"
      class="text-2xl mt-10 px-2 rounded-md hover:shadow-lg hover:shadow-indigo-500"
      >You need to sign in!</a
    >
  </div>
{/if}
