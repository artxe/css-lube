import { writable, type Writable } from 'svelte/store'

export const theme$ = writable("")

export const scroll$ = writable(0)

export const modal$ = writable(0)

export const rootScrollStack$: Writable<number[]> = writable([])