import { writable, Writable } from 'svelte/store'

export const speciesCollection: Writable<ISpecies[] | null> = writable(null)
