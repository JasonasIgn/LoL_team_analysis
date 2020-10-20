import { createSlice } from '@reduxjs/toolkit'

export interface ChallengesState {
    challenges: number[]
}

const challengesInitialState: ChallengesState = {
    challenges: []
}

export const challengesSlice = createSlice({
  name: 'challenges',
  initialState: challengesInitialState,
  reducers: {
    fetch: state => {
      state.challenges = []
    },
    fetchSuccess: state => {
      state.challenges = [1]
    },
  }
})

export const { fetch, fetchSuccess } = challengesSlice.actions

export default challengesSlice.reducer