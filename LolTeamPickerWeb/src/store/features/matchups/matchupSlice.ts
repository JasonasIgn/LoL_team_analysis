import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../utils/enums";

export interface MatchupsState {
  matchupsCollected: number;
  collectingLoadingState: LoadingState;
  totalMatchupsCollected: number;
  lastPlayerCrawled: string;
}

const matchupsInitialState: MatchupsState = {
  matchupsCollected: 0,
  totalMatchupsCollected: -1,
  collectingLoadingState: LoadingState.PRISTINE,
  lastPlayerCrawled: ""
};

export const matchupsSlice = createSlice({
  name: "matchups",
  initialState: matchupsInitialState,
  reducers: {
    collect: (state) => {
      state.collectingLoadingState = LoadingState.FETCHING;
    },
    collectSuccess: (state, action) => {
      state.matchupsCollected += action.payload.gamesCollected;
      state.totalMatchupsCollected += action.payload.gamesCollected;
      state.lastPlayerCrawled = action.payload.lastPlayerCrawled;
      state.collectingLoadingState = LoadingState.FETCH_SUCCESS;
    },
    collectFailed: (state) => {
      state.collectingLoadingState = LoadingState.FETCH_FAILED;
    },
    fetchTotalGamesSuccess: (state, action) => {
      state.totalMatchupsCollected = action.payload;
    },
  },
});

export const {
  collectSuccess,
  collect,
  collectFailed,
  fetchTotalGamesSuccess,
} = matchupsSlice.actions;

export default matchupsSlice.reducer;
