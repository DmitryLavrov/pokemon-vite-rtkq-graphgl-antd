import {gql} from '@apollo/client'

export const GET_POKEMON_BY_ID = gql`
    query getPokemonById($id: Int) {
        getPokemonById: pokemon_v2_pokemonspecies(where: {id: {_eq: $id}}) {
            name
            id
        },
        getPokemonSpritesById: pokemon_v2_pokemonsprites(where: {id: {_eq: $id}}) {
            sprites
        }
    }
`

// export const GET_POKEMON_SPRITES_BY_ID = gql`
//     query getPokemonSpritesById($id: Int) {
//     }
// `
