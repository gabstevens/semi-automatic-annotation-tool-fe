import * as types from "./types";

export const getDatasets = () => ({
  type: types.GET_DATASETS,
  request: {
    url: "/api/datasets/",
    method: "GET"
  }
});

export const getDetectors = () => ({
  type: types.GET_DETECTORS,
  request: {
    url: "/api/detectors/",
    method: "GET"
  }
});

export const deletePreprocessedDataset = ({ id }) => ({
  type: types.DELETE_PREPROCESSED_DATASET,
  request: {
    url: `/api/preprocessed_datasets/${id}`,
    method: "DELETE"
  }
});

export const preprocess = ({ name, datasetId, detectorId, isBoth }) => ({
  type: types.PREPROCESS,
  request: {
    url: "/api/preprocess",
    method: "POST",
    data: {
      preprocessedDataset: {
        name,
        datasetId,
        detectorId,
        isBoth
      }
    }
  }
});
