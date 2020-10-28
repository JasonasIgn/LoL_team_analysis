import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/types";
import { TeamSelect } from "../organisms/TeamSelect";
import { LoadingState } from "../../utils/enums";
import { fetchChampionsEffect } from "../../store/features/champions/effects";
import { getMappedDataForChampionSelect } from "../../utils/mappers";
import { useForm } from "react-hook-form";

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

export const LandingPage = () => {
  const dispatch = useDispatch();
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
  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <TeamsContainer>
        <TeamSelect
          champions={champions}
          control={control}
          teamPrefix="team1"
        />
        <TeamSelect
          champions={champions}
          control={control}
          teamPrefix="team2"
        />
        
      </TeamsContainer>
      <button type="submit"> Calculate</button>
    </Form>
  );
};
