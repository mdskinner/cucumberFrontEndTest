import { writable, Writable } from 'svelte/store'

export const people: Writable<IPerson[] | null> = writable(null)
export const peopleSelected: Writable<IPerson[]> = writable([])
export const filters: Writable<IPeopleFilter> = writable({
    gender: null,
    eye_color: null,
    hair_color: null,
    skin_color: null,
})
