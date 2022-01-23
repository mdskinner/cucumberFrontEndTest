import { writable, Writable } from 'svelte/store'

export const searchString: Writable<string> = writable('')
export const page: Writable<number> = writable(0)
export const take: Writable<number> = writable(10)
