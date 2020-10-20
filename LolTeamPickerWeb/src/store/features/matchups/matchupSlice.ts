import { createSlice } from '@reduxjs/toolkit'

export interface MatchupsState {
  matchupsCollected: number;
}

const matchupsInitialState: MatchupsState = {
  matchupsCollected: 0
}

export const matchupsSlice = createSlice({
  name: 'matchups',
  initialState: matchupsInitialState,
  reducers: {
    increaseCollectedMatchups: state => {
      state.matchupsCollected += 1;
    }
  }
})

export const { increaseCollectedMatchups } = matchupsSlice.actions

export default matchupsSlice.reducer