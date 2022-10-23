/* eslint-disable */ /* eslint-disable */
import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import App from "./App";
import { loadState, saveState } from "./localStorage";
import rootReducer from "./reducers";

import "./index.css";

const persistedState = loadState();
export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, logger)
);

const global = store;
window.global = global;

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,

  document.getElementById("root")
);
