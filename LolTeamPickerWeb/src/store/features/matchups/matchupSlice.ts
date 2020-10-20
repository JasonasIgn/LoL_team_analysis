import { createSlice } from '@reduxjs/toolkit'

export interface MatchupsState {
  matchups: number[];
  matchupsCollected: number;
}

const matchupsInitialState: MatchupsState = {
  matchups: [],
  matchupsCollected: 0
}

export const matchupsSlice = createSlice({
  name: 'matchups',
  initialState: matchupsInitialState,
  reducers: {
    fetch: state => {
      state.matchups = []
    },
    fetchSuccess: state => {
      state.matchups = [1]
    },
    increaseCollectedMatchups: state => {
      state.matchupsCollected += 1;
    }
  }
})

export const { fetch, fetchSuccess, increaseCollectedMatchups } = matchupsSlice.actions

export default matchupsSlice.reducer