import { getQuerySelector } from "@redux-requests/core";
import { createSelector } from "reselect";
import * as types from "./types";

const getDatasetsQuery = getQuerySelector({
  type: types.GET_DATASETS,
  defaultData: { count: 0, next: null, previous: null, results: [] }
});

export const datasets = createSelector(getDatasetsQuery, ({ data }) => data.results);
export const datasetsLoading = createSelector(getDatasetsQuery, ({ loading }) => loading);

const getDetectorsQuery = getQuerySelector({
  type: types.GET_DETECTORS,
  defaultData: { count: 0, next: null, previous: null, results: [] }
});
export const detectors = createSelector(getDetectorsQuery, ({ data }) => data.results);
export const detectorsLoading = createSelector(getDetectorsQuery, ({ loading }) => loading);
