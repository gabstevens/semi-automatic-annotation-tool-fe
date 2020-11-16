/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import * as changeCase from "change-case";
import { set } from "lodash";

const changeCaseOn = (changeCaseTo, obj) => {
  const newObject = Array.isArray(obj) ? [] : {};

  for (const prop in obj) {
    if (typeof obj[prop] === "object" && obj[prop] !== null) {
      newObject[changeCase[changeCaseTo](prop)] = changeCaseOn(changeCaseTo, obj[prop]);
    } else if (prop !== "_destroy") {
      newObject[changeCase[changeCaseTo](prop)] = obj[prop];
    } else {
      newObject[prop] = obj[prop];
    }
  }
  return newObject;
};

const defaultOptions = {
  /** expects `change-case` npm package method name, default `snakeCase` */
  changeCaseTo: "snakeCase"
};

export const changeCaseMiddleware = (options = defaultOptions) => _ => next => action => {
  // Treat @redux-requests actions only
  if (action.request && action.request.data && !(action.meta && action.meta.noChangeCase)) {
    const newData = { ...changeCaseOn(options.changeCaseTo, action.request.data) };
    return next(set(action, "request.data", newData));
  }

  return next(action);
};
