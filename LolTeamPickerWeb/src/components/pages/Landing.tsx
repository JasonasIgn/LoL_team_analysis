import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/types";
import { TeamSelect } from "../organisms/TeamSelect";
import { LoadingState } from "../../utils/enums";
import {
  fetchChampionsEffect,
  fetchTeamsWinrate,
} from "../../store/features/champions/effects";
import { getMappedDataForChampionSelect } from "../../utils/mappers";
import { useForm } from "react-hook-form";
import { WinratesProgressBar } from "../molecules/WinratesProgressBar";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 0 10%;
  height: 70%;
  flex-wrap: wrap;
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  width: 100%;
  height: 90%;
  flex-wrap: wrap;
`;

const WinrateContainer = styled.div`
  width: 50%;
`;

export const LandingPage = () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [winrates, setWinrates] = useState({
    team1Winrate: 50,
    team2Winrate: 50,
  });
  const championsLoadingState = useSelector(
    (state: AppState) => state.champions.championsLoadingState
  );
  const championsData = useSelector(
    (state: AppState) => state.champions.champions
  );
  useEffect(() => {
    if (championsLoadingState === LoadingState.PRISTINE) {
      dispatch(fetchChampionsEffect());
    }
  }, [championsLoadingState, dispatch]);

  const champions = useMemo(
    () => getMappedDataForChampionSelect(championsData),
    [championsData]
  );

  const { control, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data: any) => {
    setSubmitting(true);
    try {
      const winrates: any = await dispatch(fetchTeamsWinrate(data));
      console.log(winrates);
      setWinrates({
        team1Winrate: Number(winrates.team1Winrate),
        team2Winrate: Number(winrates.team2Winrate),
      });
    } catch (e) {
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <Form onSubmit={onSubmit}>
      <TeamsContainer>
        <TeamSelect champions={champions} control={control} teamNumber="1" />
        <WinrateContainer>
          <WinratesProgressBar
            team1Winrate={winrates.team1Winrate}
            team2Winrate={winrates.team2Winrate}
          />
        </WinrateContainer>
        <TeamSelect champions={champions} control={control} teamNumber="2" />
      </TeamsContainer>
      <button type="submit" disabled={submitting}>
        Calculate
      </button>
    </Form>
  );
};
