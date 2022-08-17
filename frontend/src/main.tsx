import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Routes } from "routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "regenerator-runtime/runtime"; // regeneratorRuntime 트러블 슈팅

import { store } from "store";

import { GlobalStyle } from "./styles/GlobalStyle";

const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        <Routes />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
