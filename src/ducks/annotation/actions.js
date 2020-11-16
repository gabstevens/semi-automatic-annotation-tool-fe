import * as types from "./types";

export const getPreprocessedDatasets = () => ({
  type: types.GET_PREPOCESSED_DATASETS,
  request: {
    url: "/api/preprocessed_datasets/",
    method: "GET"
  }
});

export const getPreprocessedDataset = ({ id }) => ({
  type: types.GET_PREPOCESSED_DATASET,
  request: {
    url: `/api/preprocessed_datasets/${id}/`,
    method: "GET"
  }
});

export const getAnnotation = ({ id }) => ({
  type: types.GET_ANNOTATION,
  request: {
    url: `/api/annotations/${id}/`,
    method: "GET"
  }
});

export const updateAnnotation = ({ id, annotation }) => ({
  type: types.UPDATE_ANNOTATION,
  request: {
    url: `/api/annotations/${id}/`,
    method: "PATCH",
    data: {
      ...annotation
    }
  }
});

export const pollingPreprocessedDatasets = () => ({
  type: types.POLLING_PREPROCESSED_DATASETS,
  request: {
    url: "/api/preprocessed_datasets/",
    method: "GET"
  },
  meta: {
    mutations: {
      [types.GET_PREPOCESSED_DATASETS]: (_, newData) => newData
    }
  }
});

export const pollingPreprocessedDataset = ({ id }) => ({
  type: types.POLLING_PREPROCESSED_DATASET,
  request: {
    url: `/api/preprocessed_datasets/${id}/`,
    method: "GET"
  },
  meta: {
    mutations: {
      [types.GET_PREPOCESSED_DATASET]: (_, newData) => newData
    }
  }
});
