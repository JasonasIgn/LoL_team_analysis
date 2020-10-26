import Axios from "axios";
import { apiUrls } from "../../../api.config";
import { addMessage } from "../messages/messagesSlice";
import {
  collect,
  collectFailed,
  collectSuccess,
  fetchTotalGamesSuccess,
} from "./matchupSlice";

export const collectMatchup = () => async (dispatch: any) => {
  dispatch(collect());
  dispatch(addMessage(`Collecting matchup...`));
  try {
    const response = await Axios.request({
      url: apiUrls.collectMatchup,
      method: "GET",
    });
    dispatch(
      collectSuccess({
        gamesCollected: response.data.gamesCollected,
        lastPlayerCrawled: response.data.playerCrawled,
      })
    );
    dispatch(addMessage(`Matchup collected!`));
  } catch (e) {
    dispatch(collectFailed());
    dispatch(addMessage("Failed!"));
  }
};

export const fetchTotalGames = () => async (dispatch: any) => {
  try {
    const response = await Axios.request({
      url: apiUrls.fetchTotalGames,
      method: "GET",
    });
    dispatch(fetchTotalGamesSuccess(response.data.totalRecords));
  } catch (e) {}
};
