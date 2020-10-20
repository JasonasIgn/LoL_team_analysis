import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectMatchup } from "../../store/features/matchups/effects";
import { AppState } from "../../store/types";

export const LandingPage = () => {
  const messages = useSelector((state: AppState) => state.messages.messages);
  const dispatch = useDispatch()
  const [collecting, setCollecting] = useState(false)
  return (
    <div>
      <div>{messages.map((message) => message)}</div>
      <button onClick={() => dispatch(collectMatchup())}>Collect</button>
    </div>
  );
};
