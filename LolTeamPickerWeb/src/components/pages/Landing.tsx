import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/types";

export const LandingPage = () => {
  const messages = useSelector((state: AppState) => state.messages.messages);
  return (
    <div>
      <textarea>{messages.map((message) => message)}</textarea>
      <button onClick={() => console.log("collected")}>Collect</button>
    </div>
  );
};
