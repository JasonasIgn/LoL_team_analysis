import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import store from "./store/store";
import "./index.css";
import App from "./App";

const GlobalStyle = createGlobalStyle`
  #root {
    width: 100%;
    height: 100vh;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
