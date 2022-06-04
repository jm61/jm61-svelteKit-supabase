import { writable } from "svelte/store"
import { supabase } from "$lib/supabaseClient"
export const todos = writable([])

export const loadTodos = async () => {
  try {
    const { data } = await supabase.from("todos").select()
    todos.set(data)
  } catch (error) {
    return console.error(error)
  }
}
loadTodos()

const statusEnum = {
  loading: "loading",
  complete: "complete",
  error: "error",
  terminated: "terminated"
}
let status = statusEnum.loading

export async function addTodo(task, category, user_id) {
  console.log(user_id)
  status = statusEnum.loading
  try {
    const { data, error } = await supabase.from("todos").insert([
      {
        user_id,
        task,
        category,
        is_complete: false
      }
    ])
    //todos.update((cur) => [...cur, data[0]])

    status = statusEnum.complete
  } catch (error) {
    status = statusEnum.error
    console.log(error, status)
  } finally {
    status = statusEnum.terminated
    console.log(status)
  }
}
