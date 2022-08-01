import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'

const LS_KEY_POKEMON = 'PokemonNum'

interface CounterState {
  value: number
}

const getInitValue = () => {
  const valueFromLocalstorage = parseInt(localStorage.getItem(LS_KEY_POKEMON) ?? '1')
  return valueFromLocalstorage > 0 ? valueFromLocalstorage : 1
}

// Define the initial state using that type
const initialState: CounterState = {
  value: getInitValue()
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
      localStorage.setItem(LS_KEY_POKEMON, state.value.toString())
    },
    incrementOnValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload
      localStorage.setItem(LS_KEY_POKEMON, state.value.toString())
    },
    decrement: state => {
      state.value -= 1
      localStorage.setItem(LS_KEY_POKEMON, state.value.toString())
    },
    decrementOnValue: (state, action: PayloadAction<number>) => {
      state.value -= action.payload
      localStorage.setItem(LS_KEY_POKEMON, state.value.toString())
    },
  }
})

// export const {increment, incrementOnValue, decrement, decrementOnValue} = counterSlice.actions
export const counterActions = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export const counterReducer = counterSlice.reducer
