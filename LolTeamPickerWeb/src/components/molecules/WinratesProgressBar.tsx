import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";

interface WinratesProgressBarProps {
  team1Winrate: number;
  team2Winrate: number;
}

const Container = styled.div`
  width: 100%;
`;
const WinratesTextContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const WinrateText = styled.span``;

export const WinratesProgressBar: React.FC<WinratesProgressBarProps> = ({
  team1Winrate,
  team2Winrate,
}) => {
  return (
    <Container>
      <WinratesTextContainer>
        <WinrateText>{`${team1Winrate}%`}</WinrateText>
        <WinrateText>{`${team2Winrate}%`}</WinrateText>
      </WinratesTextContainer>
      <LinearProgress variant="determinate" value={team1Winrate} />
    </Container>
  );
};
