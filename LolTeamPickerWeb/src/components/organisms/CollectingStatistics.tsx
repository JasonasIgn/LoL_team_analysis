import React from "react";
import styled from "styled-components";
import { StatisticsBox } from "../molecules/StatisticsBox";

interface CollectingStatisticsProps {
  totalCollected: number | string;
  collectedThisSession: number;
  lastPlayerCrawled: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 200px;
`;

export const CollectingStatistics: React.FC<CollectingStatisticsProps> = ({
  totalCollected,
  collectedThisSession,
  lastPlayerCrawled,
}) => {
  return (
    <Container>
      <StatisticsBox text={`${totalCollected}`} title="Total games collected" />
      <StatisticsBox text={`${collectedThisSession}`} title="Collected this session" />
      <StatisticsBox text={lastPlayerCrawled} title="Last player crawled" />
    </Container>
  );
};
