import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { getDatasets, getDetectors, preprocess } from "../../ducks/actions";
import { datasets, detectors } from "../../ducks/selectors";
import { useNotifications } from "../../notifications";
import Form from "./Form";

const types = {
  RGB: "RGB",
  THERMAL: "THERMAL",
  BOTH: "BOTH"
};

const useEnhancer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ok, ko } = useNotifications();
  const [type, setType] = useState(types.RGB);
  useEffect(() => {
    dispatch(getDatasets());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDetectors());
  }, [dispatch]);
  const [preprocessedDatasetSchema] = useState(
    yup.object().shape({
      name: yup.string().required(),
      datasetId: yup.string().required(),
      detectorId: yup.string().required()
    })
  );
  return {
    type,
    preprocessedDatasetSchema,
    datasets: useSelector(datasets),
    detectors: useSelector(detectors),
    setType,
    onPreprocess: async ({ name, datasetId, detectorId }) => {
      const { error } = await dispatch(
        preprocess({ name, datasetId, detectorId, isBoth: type === types.BOTH })
      );
      if (error) {
        ko("Preprocessing not started!");
      } else {
        ok("Preprocessing dataset started!");
        history.push("/preprocessed-datasets");
      }
    }
  };
};

const MultiForm = () => {
  const {
    type,
    preprocessedDatasetSchema,
    datasets,
    detectors,
    setType,
    onPreprocess
  } = useEnhancer();
  return (
    <Grid container spacing={4}>
      <Grid item container xs={4} style={{ display: "flex", flexDirection: "column" }}>
        <Formik
          initialValues={{ name: "", datasetId: "", detectorId: "" }}
          validationSchema={preprocessedDatasetSchema}
          onSubmit={onPreprocess}
        >
          <Form
            title="RGB Dataset"
            label="Preprocess RGB Dataset"
            selected={type === types.RGB}
            onSelect={() => setType(types.RGB)}
            datasets={datasets.filter(dataset => dataset.thermal_path === null)}
            detectors={detectors.filter(detector => !detector.is_both)}
          />
        </Formik>
      </Grid>
      <Grid item container xs={4} style={{ display: "flex", flexDirection: "column" }}>
        <Formik
          initialValues={{ name: "", datasetId: "", detectorId: "" }}
          validationSchema={preprocessedDatasetSchema}
          onSubmit={onPreprocess}
        >
          <Form
            title="RGB & Thermal Dataset"
            label="Preprocess RGB and Thermal Dataset"
            selected={type === types.BOTH}
            onSelect={() => setType(types.BOTH)}
            datasets={datasets.filter(
              dataset => dataset.thermal_path !== null && dataset.rgb_path !== null
            )}
            detectors={detectors.filter(detector => detector.is_both)}
          />
        </Formik>
      </Grid>
      <Grid item container xs={4} style={{ display: "flex", flexDirection: "column" }}>
        <Formik
          initialValues={{ name: "", datasetId: "", detectorId: "" }}
          validationSchema={preprocessedDatasetSchema}
          onSubmit={onPreprocess}
        >
          <Form
            title="Thermal Dataset"
            label="Preprocess Thermal Dataset"
            selected={type === types.THERMAL}
            onSelect={() => setType(types.THERMAL)}
            datasets={datasets.filter(dataset => dataset.rgb_path === null)}
            detectors={detectors.filter(detector => !detector.is_both)}
          />
        </Formik>
      </Grid>
    </Grid>
  );
};

export default MultiForm;
