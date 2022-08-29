<script>
  import Toast from "$lib/components/Toast.svelte"
  import { dismissToast, toasts, addToast } from "$lib/stores/toast"
  import { user } from "$lib/stores/session"
</script>

<svelte:head><title>Toasts</title></svelte:head>

<h1>Toast test page</h1>
<div class="flex space-x-12 mt-6 justify-center">
  <button
    on:click={() =>
      addToast({
        message: `${$user.email
          .split("@")[0]
          .toUpperCase()} has great success!`,
        type: "success",
        dismissible: false
      })}
    class="border-2 border-teal-600 py-2 px-4 rounded-tl-xl rounded-br-xl hover:shadow-xl hover:shadow-orange-400"
    >Success</button
  >
  <button
    on:click={() =>
      addToast({
        message: "I'm an Error!",
        type: "error",
        dismissible: true
      })}
    class="border-2 border-teal-600 py-2 px-4 rounded-tl-xl rounded-br-xl hover:shadow-xl hover:shadow-orange-400"
    >Error</button
  >
  <button
    on:click={() =>
      addToast({
        message: "I'm an Info!",
        type: "info",
        dismissible: true
      })}
    class="border-2 border-teal-600 py-2 px-4 rounded-tl-xl rounded-br-xl hover:shadow-xl hover:shadow-orange-400"
    >Info</button
  >
</div>

{#if $toasts}
  <section>
    {#each $toasts as toast (toast.id)}
      <Toast
        type={toast.type}
        dismissible={toast.dismissible}
        on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
      >
    {/each}
  </section>
{/if}

<style>
  section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }
</style>
