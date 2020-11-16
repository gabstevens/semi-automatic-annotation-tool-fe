/* eslint-disable import/no-extraneous-dependencies */
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger";
import { handleRequests } from "@redux-requests/core";
import { createDriver as createAxiosDriver } from "@redux-requests/axios";
import rootReducer from "./reducers";
import config from "../config";
import interceptors from "./interceptors";
import { changeCaseMiddleware } from "./middlewares";

export const INITIAL_STATE = {};

const logger = createLogger();

export const configureStore = (preloadedState = INITIAL_STATE) => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    ...interceptors,
    driver: createAxiosDriver(axios.create({ baseURL: config.apiBaseUrl })),
    cache: true
  });

  const middlewares = [changeCaseMiddleware(), ...requestsMiddleware];
  if (config.appEnv === "dev") {
    middlewares.push(logger);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const composedEnhancers = composeEnhancers(...enhancers);

  const store = createStore(
    combineReducers({ ...rootReducer, requests: requestsReducer }),
    preloadedState,
    composedEnhancers
  );

  if (config.appEnv !== "dist" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
};
