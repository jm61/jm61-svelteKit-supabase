<script>
  import { supabase } from "$lib/supabaseClient"
  import { user } from "$lib/stores/session"
  import Avatar from "$lib/Avatar.svelte"
  import { goto } from "$app/navigation"
  import { onMount } from "svelte"

  let loading = true
  let username = null
  let website = null
  let avatar_url = null
  let country = null

  onMount(async () => {
    const user = supabase.auth.user()
    if (!user) {
      console.log("not logged in")
      goto("/signin")
    }
  })

  async function getProfile() {
    try {
      loading = true
      const user = supabase.auth.user()
      console.log(user.email)

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, country`)
        .eq("id", user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        username = data.username
        website = data.website
        avatar_url = data.avatar_url
        country = data.country
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      loading = false
    }
  }

  async function updateProfile() {
    try {
      loading = true
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        country,
        updated_at: new Date()
      }

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal" // Don't return the value after inserting
      })

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading = false
    }
  }
</script>

<form
  use:getProfile
  id="formWidget"
  class="flex flex-col text-md gap-3 text-teal-700 font-bold"
  on:submit|preventDefault={updateProfile}
>
  <Avatar bind:path={avatar_url} on:upload={updateProfile} />

  <label for="email">Email</label>
  <input
    id="email"
    type="text"
    value={$user?.email}
    disabled
    autocomplete="on"
  />
  <label for="username">Name</label>
  <input id="username" type="text" bind:value={username} />
  <label for="website">Website</label>
  <input id="website" type="website" bind:value={website} />
  <label for="country">Country</label>
  <input id="country" type="country" bind:value={country} />

  <input
    type="submit"
    class="mx-auto my-4 outline outline-indigo-800 px-8 py-2 rounded-xl bg-teal-600 text-gray-100 text-md hover:bg-teal-700"
    value={loading ? "Loading ..." : "Update"}
    disabled={loading}
  />
</form>
