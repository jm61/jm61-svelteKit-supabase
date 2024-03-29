import { writable } from "svelte/store"

export const toasts = writable([])

/** @param {string} id */
export const dismissToast = id => {
  toasts.update(all => all.filter(toast => toast.id !== id))
}

/** @param {Object} toast */
export const addToast = toast => {
  const id = Math.floor(Math.random() * 1000)
  const defaults = {
    id,
    type: "info",
    dismissible: true,
    timeOut: 3000
  }
  const t = { ...defaults, ...toast }
  toasts.update(all => [...all, t])

  if (t.timeOut) {
    setTimeout(() => dismissToast(id), t.timeOut)
  }
}
