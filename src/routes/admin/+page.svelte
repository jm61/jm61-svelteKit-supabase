<script>
  import { user } from "$lib/stores/session"
  import { supabase } from "$lib/supabaseClient"
  import { goto } from "$app/navigation"
  import { onMount } from "svelte"

  onMount(async () => {
    const user = supabase.auth.user()
    if (user?.user_metadata.isAdmin === true) {
      console.log("You are admin")
    } else {
      goto("/")
    }
  })
</script>

<h1>ADMIN</h1>

<style>
  h1 {
    text-align: center;
    margin-top: 4rem;
    color: palevioletred;
  }
</style>
