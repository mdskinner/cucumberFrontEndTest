import { writable, Writable } from 'svelte/store'

export const planets: Writable<IPlanet[] | null> = writable(null)
