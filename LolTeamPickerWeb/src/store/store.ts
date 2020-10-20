import { configureStore } from '@reduxjs/toolkit'
import chalengesReducer from './features/challenges/challengesSlice'

export default configureStore({
  reducer: {
    challenges: chalengesReducer
  }
})