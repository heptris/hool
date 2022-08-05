import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Routes } from "generouted";
import { store } from "store";

import "regenerator-runtime/runtime"; // regeneratorRuntime 트러블 슈팅

import { GlobalStyle } from "./styles/GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
