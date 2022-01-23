/* eslint camelcase: "off" */

declare interface IPeopleFilter {
    gender: string
    eye_color: string
    hair_color: string
    skin_color: string
}

declare interface IPerson {
    name: string
    url: string
    birth_year: string
    gender: string
    height: string
    mass: string
    eye_color: string
    hair_color: string
    skin_color: string
    homeworld: string
    species: string[]
    vehicles: string[]
    starships: string[]
    films: string[]
    created: Date
    edited: Date
    image: string
}
