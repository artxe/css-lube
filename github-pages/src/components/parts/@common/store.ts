import { writable, type Writable } from 'svelte/store'

export const naviOpen$ = writable(false)

export const contentScrollStack$: Writable<number[]> = writable([])