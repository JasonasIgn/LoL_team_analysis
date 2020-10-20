import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { collectMatchup } from "../../store/features/matchups/effects";
import { AppState } from "../../store/types";
import { LoadingState } from "../../utils/enums";

const MessageBox = styled.div`
  height: 90%;
  width: 100%;
  background-color: black;
  padding: 10px;
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  flex-wrap: wrap;
`;

const Message = styled.span`
  display: flex;
  color: white;
`;

export const LandingPage = () => {
  const messages = useSelector((state: AppState) => state.messages.messages);
  const matchupsCollected = useSelector(
    (state: AppState) => state.matchups.matchupsCollected
  );
  const collectingLoadingState = useSelector(
    (state: AppState) => state.matchups.collectingLoadingState
  );
  const dispatch = useDispatch();
  const [collecting, setCollecting] = useState(false);
  const [canCollect, setCanCollect] = useState(false);
  useEffect(() => {
      if (!canCollect) {
          setTimeout(() => {
            setCanCollect(true)
          }, 1500)
      }
  }, [canCollect])
  useEffect(() => {
    if (
      collecting && canCollect &&
      [
        LoadingState.PRISTINE,
        LoadingState.FETCH_FAILED,
        LoadingState.FETCH_SUCCESS,
      ].includes(collectingLoadingState)
    ) {
      dispatch(collectMatchup());
      setCanCollect(false)
    }
  }, [collecting, collectingLoadingState, dispatch, matchupsCollected, canCollect]);
  return (
    <Container>
      <ContentContainer>
        <MessageBox>
          {messages.map((message) => (
            <Message>{`> ${message}`}</Message>
          ))}
        </MessageBox>
        <button onClick={() => setCollecting(!collecting)}>
          {!collecting ? "Start collecting" : "Stop Collecting"}
        </button>
      </ContentContainer>
    </Container>
  );
};
