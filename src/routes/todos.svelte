<script>
  import { addTodo } from "../lib/stores/todos.js"
  import { user } from "$lib/stores/session"
  import { todos } from "$lib/stores/todos.js"
  let task = ""
  let category = ""

  const handleSubmit = () => {
    addTodo(task, category, $user.id)
    task = ""
    category = ""
  }
</script>

<h1>Todos</h1>

<li>TODO <span>CATEGORY</span><span>COMPLETED</span></li>
{#each $todos as todo}
  <li>
    {todo.task}<span>{todo.category}</span><span>{todo.is_complete}</span>
  </li>
{/each}

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="todo"> Task </label>
    <input
      type="text"
      name="todo"
      bind:value={task}
      placeholder="ex. Learn about authentication in Next.js"
    />
    <label for="category"> Category </label>
    <input
      type="text"
      name="category"
      bind:value={category}
      placeholder="category..."
    />
  </div>
  <button type="submit">Add Task</button>
</form>

<style>
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
  }
</style>
