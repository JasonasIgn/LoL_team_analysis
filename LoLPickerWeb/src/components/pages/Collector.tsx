import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  collectMatchup,
  fetchConfig,
  fetchTotalGames,
  toggleRun,
} from "../../store/features/matchups/effects";
import { AppState } from "../../store/types";
import { LoadingState } from "../../utils/enums";
import { CollectingStatistics } from "../organisms/CollectingStatistics";
import Switch from "@material-ui/core/Switch";

const MessageBox = styled.div`
  height: 90%;
  width: 100%;
  background-color: black;
  padding: 10px;
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 0 10%;
  height: 70%;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 70%;
  flex-wrap: wrap;
`;

const Message = styled.span`
  display: flex;
  color: white;
`;

export const CollectorPage = () => {
  const lastPlayerCrawled = useSelector(
    (state: AppState) => state.matchups.lastPlayerCrawled
  );
  const running = useSelector((state: AppState) => state.matchups.running);
  const totalGamesCollected = useSelector(
    (state: AppState) => state.matchups.totalMatchupsCollected
  );
  const matchupsCollected = useSelector(
    (state: AppState) => state.matchups.matchupsCollected
  );
  const collectingLoadingState = useSelector(
    (state: AppState) => state.matchups.collectingLoadingState
  );
  const dispatch = useDispatch();
  const [collecting, setCollecting] = useState(false);
  useEffect(() => {
    if (
      collecting &&
      [
        LoadingState.PRISTINE,
        LoadingState.FETCH_FAILED,
        LoadingState.FETCH_SUCCESS,
      ].includes(collectingLoadingState)
    ) {
      dispatch(collectMatchup());
    }
  }, [collecting, collectingLoadingState, dispatch, matchupsCollected]);

  useEffect(() => {
    dispatch(fetchConfig());
    dispatch(fetchTotalGames());
  }, [dispatch]);
  return (
    <Container>
      <CollectingStatistics
        collectedThisSession={matchupsCollected}
        lastPlayerCrawled={lastPlayerCrawled || "-"}
        totalCollected={
          totalGamesCollected >= 0 ? totalGamesCollected : "Loading..."
        }
      />
      <ContentContainer>
        Collecting -
        <Switch
          checked={running}
          onChange={() => {
            dispatch(toggleRun());
          }}
          color="primary"
          name="checked"
          inputProps={{ "aria-label": "checkbox" }}
        />
      </ContentContainer>
    </Container>
  );
};
