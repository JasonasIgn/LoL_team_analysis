import Axios from "axios";
import { apiUrls } from "../../../api.config";
import {
  fetchChampions,
  fetchChampionsFailure,
  fetchChampionsSuccess,
} from "./championsSlice";

export const fetchChampionsEffect = () => async (dispatch: any) => {
  dispatch(fetchChampions());
  try {
    const response = await Axios.request({
      url: apiUrls.fetchChampions,
      method: "GET",
    });
    dispatch(
      fetchChampionsSuccess(response.data.data)
    );
  } catch (e) {
    dispatch(fetchChampionsFailure());
  }
};
