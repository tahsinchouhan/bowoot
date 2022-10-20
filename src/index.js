import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { registerServiceWorker } from "./register-sw";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { loadState, saveState } from "./localStorage";
import firebase from "firebase";

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
