import {counterActions} from '../store/counterSlice'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from '@reduxjs/toolkit'

const actions = {
  ... counterActions
}

export const useActions  = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
