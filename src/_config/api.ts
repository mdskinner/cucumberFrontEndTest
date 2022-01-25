import axios, { AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import { errorResponse } from '_helpers/errorHandlers'

let retries = process.env.NODE_ENV === 'development' ? 0 : 5

const api = axios.create({
    baseURL: 'https://swapi.dev/api/',
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     // 'api-key': '49f9a154fd66e86ee67da0f1093055aa'
    // },
})
axiosRetry(api, { retries: retries })

const responseBody = (response: AxiosResponse) => {
    // console.log('--apiQuery res--', response.data.results)
    return response.data.results
}

const People = {
    collection: (): Promise<IPerson[]> => api.get('/people').then(responseBody).catch(errorResponse),
    item: (id: string): Promise<IPerson> => api.get(`/people/${id}`).then(responseBody).catch(errorResponse),
}

const Planets = {
    collection: (): Promise<IPlanet[]> => api.get('/planets').then(responseBody).catch(errorResponse),
    item: (id: string): Promise<IPlanet> => api.get(`/planets/${id}`).then(responseBody).catch(errorResponse),
}

const Species = {
    collection: (): Promise<ISpecies[]> => api.get('/species').then(responseBody).catch(errorResponse),
    item: (id: string): Promise<ISpecies> => api.get(`/species/${id}`).then(responseBody).catch(errorResponse),
}

export default {
    People,
    Planets,
    Species,
}
