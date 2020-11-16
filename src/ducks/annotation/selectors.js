import { getQuerySelector } from "@redux-requests/core";
import { createSelector } from "reselect";
import * as types from "./types";

const getPreprocessedDatasetsQuery = getQuerySelector({
  type: types.GET_PREPOCESSED_DATASETS,
  defaultData: { count: 0, next: null, previous: null, results: [] }
});

export const preprocessedDatasets = createSelector(
  getPreprocessedDatasetsQuery,
  ({ data }) => data.results
);
export const preprocessedDatasetsLoading = createSelector(
  getPreprocessedDatasetsQuery,
  ({ loading }) => loading
);

const getPreprocessedDatasetQuery = getQuerySelector({
  type: types.GET_PREPOCESSED_DATASET,
  defaultData: { detector: { class_list: [] }, annotation_set: [] }
});

export const preprocessedDataset = createSelector(getPreprocessedDatasetQuery, ({ data }) => data);
export const preprocessedDatasetLoading = createSelector(
  getPreprocessedDatasetQuery,
  ({ loading }) => loading
);

const getAnnotationQuery = getQuerySelector({
  type: types.GET_ANNOTATION,
  defaultData: {}
});

export const annotation = createSelector(getAnnotationQuery, ({ data }) => data);
export const annotationLoading = createSelector(getAnnotationQuery, ({ loading }) => loading);
