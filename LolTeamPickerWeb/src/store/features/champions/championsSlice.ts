import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../utils/enums";

export interface ChampionsState {
  champions: {};
  championsLoadingState: LoadingState;
}

const championsInitialState: ChampionsState = {
  champions: {},
  championsLoadingState: LoadingState.PRISTINE,
};

export const championsSlice = createSlice({
  name: "champions",
  initialState: championsInitialState,
  reducers: {
    fetchChampions: (state) => {
      state.champions = [];
      state.championsLoadingState = LoadingState.FETCHING;
    },
    fetchChampionsSuccess: (state, action) => {
      state.champions = action.payload;
      state.championsLoadingState = LoadingState.FETCH_SUCCESS;
    },
    fetchChampionsFailure: (state) => {
      state.championsLoadingState = LoadingState.FETCH_FAILED;
    },
  },
});

export const {
  fetchChampions,
  fetchChampionsSuccess,
  fetchChampionsFailure,
} = championsSlice.actions;

export default championsSlice.reducer;
