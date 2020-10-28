import React from "react";
import styled from "styled-components";
import { ChampionInput } from "../molecules/ChampionInput";

interface TeamSelectProps {
  champions: any[];
  control: any;
  teamNumber: string;
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
  teamNumber,
}) => {
  return (
    <Container>
      <ChampionInput
        options={champions}
        control={control}
        name={`top${teamNumber}`}
      />
      <ChampionInput
        options={champions}
        control={control}
        name={`jgl${teamNumber}`}
      />
      <ChampionInput
        options={champions}
        control={control}
        name={`mid${teamNumber}`}
      />
      <ChampionInput
        options={champions}
        control={control}
        name={`adc${teamNumber}`}
      />
      <ChampionInput
        options={champions}
        control={control}
        name={`sup${teamNumber}`}
      />
    </Container>
  );
};
