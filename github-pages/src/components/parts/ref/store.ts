import { writable, type Writable } from "svelte/store"

export const contents$: Writable<{ title: string, content: string }[]> = writable([])
export const todo$: Writable<string[]> = writable([])
export const todoTf$: Writable<number[]> = writable([])
export const done$: Writable<string[]> = writable([])
export const doneTf$: Writable<number[]> = writable([])
export const transition$ = writable(false)
export const drag$: Writable<{ type: "todo" | "done", index: number } | null> = writable(null)