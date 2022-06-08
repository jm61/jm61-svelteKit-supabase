import { supabase } from "$lib/supabaseClient"

export async function getData() {
  const { data, error } = await supabase.from("cars").select("brand")
  console.log(data)
  if (error) throw new Error(error.message)
  return data
}
/* export const get = async (req) => {
  return {
    body: {
      data: req.params.slug
    }
  }
} */
