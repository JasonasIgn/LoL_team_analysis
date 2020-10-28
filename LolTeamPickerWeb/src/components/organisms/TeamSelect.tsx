import React from "react";
import styled from "styled-components";
import { ChampionInput } from "../molecules/ChampionInput";

interface TeamSelectProps {
  champions: any[];
  control: any;
  teamPrefix: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const TeamSelect: React.FC<TeamSelectProps> = ({
  champions,
  control,
  teamPrefix,
}) => {
  return (
    <Container>
      <ChampionInput
        options={champions}
        control={control}
        name={`${teamPrefix}_top`}
      />
      <ChampionInput
        options={champions}
        control={control}
        name={`${teamPrefix}_jgl`}
      />
      <ChampionInput
        options={champions}
        control={control}
        name={`${teamPrefix}_mid`}
      />
      <ChampionInput
        options={champions}
        control={control}
        name={`${teamPrefix}_adc`}
      />
      <ChampionInput
        options={champions}
        control={control}
        name={`${teamPrefix}_sup`}
      />
    </Container>
  );
};
