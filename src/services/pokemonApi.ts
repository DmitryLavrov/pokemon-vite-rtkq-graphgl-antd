import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {Pokemon} from './pokemonApiTypes'

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/'
  }),
  refetchOnFocus: true,
  tagTypes: [],
  endpoints: build => ({
    getPokemonByNumber: build.query<Pokemon, string>({
      query: (num: string) => ({
        url: `pokemon/${num}`,
        // params: {}
      })
    })
  })
})

export const {useGetPokemonByNumberQuery} = pokemonApi
