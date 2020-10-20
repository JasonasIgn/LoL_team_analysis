import { createSlice } from '@reduxjs/toolkit'
import { LoadingState } from '../../../utils/enums';

export interface MatchupsState {
  matchupsCollected: number;
  collectingLoadingState: LoadingState;
}

const matchupsInitialState: MatchupsState = {
  matchupsCollected: 0,
  collectingLoadingState: LoadingState.PRISTINE,
}

export const matchupsSlice = createSlice({
  name: 'matchups',
  initialState: matchupsInitialState,
  reducers: {
    collect: state => {
      state.collectingLoadingState = LoadingState.FETCHING 
    },
    collectSuccess: state => {
      state.matchupsCollected += 1
      state.collectingLoadingState = LoadingState.FETCH_SUCCESS
    },
    collectFailed: state => {
      state.collectingLoadingState = LoadingState.FETCH_FAILED
    }
  }
})

export const { collectSuccess, collect, collectFailed } = matchupsSlice.actions

export default matchupsSlice.reducer