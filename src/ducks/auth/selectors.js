import { getQuerySelector } from "@redux-requests/core";
import { createSelector } from "reselect";
import * as types from "./types";

export const isAuthenticated = () => Boolean(localStorage.getItem("SAAT_ACCESS_TOKEN"));

const getUserMeQuery = getQuerySelector({
  type: types.GET_USER_ME,
  defaultData: {}
});

export const userMe = createSelector(getUserMeQuery, ({ data }) => data);
export const userMeLoading = createSelector(getUserMeQuery, ({ loading }) => loading);
