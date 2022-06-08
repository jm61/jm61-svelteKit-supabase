<script>
  import { alert } from "$lib/stores/session.js"
  const closeAlert = () =>
    (document.querySelector("#alert").style.display = "none")
</script>

<div on:click={closeAlert} id="alert">
  <p>{$alert}</p>
</div>

<style>
  #alert {
    position: fixed;
    cursor: pointer;
    top: 2%;
    right: 55%;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    background-color: #fb923c;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
    padding: 0.5rem 1.4rem;
    z-index: 0;
    opacity: 60%;
  }
  div p {
    color: #fff;
  }
</style>
