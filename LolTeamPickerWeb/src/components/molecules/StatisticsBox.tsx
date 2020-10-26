import React from "react";
import styled from "styled-components";

interface StatisticsBoxProps {
  title: string;
  text: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 150px;
  height: 200px;
`;
const TitleText = styled.span`
  font-size: 30px;
  line-height: 1;
  font-weight: 500;
`;
const ContentText = styled.div`
  font-size: 24px;
  line-height: 2;
`;

export const StatisticsBox: React.FC<StatisticsBoxProps> = ({
  title,
  text,
}) => {
  return (
    <Container>
      <TitleText>{title}</TitleText>
      <ContentText>{text}</ContentText>
    </Container>
  );
};
