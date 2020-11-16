import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid, useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { getDatasets, getDetectors, preprocess } from "../../ducks/actions";
import { datasets, detectors } from "../../ducks/selectors";
import SubmitButton from "../formik/SubmitButton";
import SelectField from "../formik/SelectField";
import TextField from "../formik/TextField";
import { useNotifications } from "../../notifications";

const useEnhancer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ok, ko } = useNotifications();
  const [isBoth, setIsBoth] = useState(false);
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
    isBoth,
    preprocessedDatasetSchema,
    rgbDatasets: useSelector(datasets)
      .filter(dataset => dataset.thermal_path === null)
      .map(({ id, name }) => ({ label: name, value: id })),
    bothDatasets: useSelector(datasets)
      .filter(dataset => dataset.thermal_path !== null)
      .map(({ id, name }) => ({ label: name, value: id })),
    rgbDetectors: useSelector(detectors)
      .filter(detector => !detector.is_both)
      .map(({ id, name }) => ({ label: name, value: id })),
    bothDetectors: useSelector(detectors)
      .filter(detector => detector.is_both)
      .map(({ id, name }) => ({ label: name, value: id })),
    onRGBSelect: () => {
      setIsBoth(false);
    },
    onBothSelect: () => {
      setIsBoth(true);
    },
    onPreprocess: async ({ name, datasetId, detectorId }) => {
      const { error } = await dispatch(preprocess({ name, datasetId, detectorId, isBoth }));
      if (error) {
        ko("Preprocessing not started!");
      } else {
        ok("Preprocessing dataset started!");
        history.push("/preprocessed-datasets");
      }
    }
  };
};

const Form = () => {
  const {
    isBoth,
    preprocessedDatasetSchema,
    rgbDatasets,
    bothDatasets,
    rgbDetectors,
    bothDetectors,
    onRGBSelect,
    onBothSelect,
    onPreprocess
  } = useEnhancer();
  const theme = useTheme();
  return (
    <Grid container spacing={4}>
      <Grid item container xs={6} style={{ display: "flex", flexDirection: "column" }}>
        <Formik
          initialValues={{ name: "", datasetId: "", detectorId: "" }}
          validationSchema={preprocessedDatasetSchema}
          onSubmit={onPreprocess}
        >
          <Card
            elevation={isBoth ? 0 : 16}
            onClick={onRGBSelect}
            style={
              isBoth
                ? {
                    cursor: "pointer",
                    backgroundColor: "#fafafa"
                  }
                : { border: "solid 1px", borderColor: theme.palette.primary.light }
            }
          >
            <CardHeader title="RGB Dataset" />
            <CardContent>
              <TextField label="Name" name="name" fullWidth />
              <SelectField
                label="Select dataset"
                name="datasetId"
                options={rgbDatasets}
                fullWidth
              />
              <SelectField
                label="Select detector"
                name="detectorId"
                options={rgbDetectors}
                fullWidth
              />
              <SubmitButton disabled={isBoth} variant="contained" color="primary">
                Preprocess RGB Dataset
              </SubmitButton>
            </CardContent>
          </Card>
        </Formik>
      </Grid>
      <Grid item container xs={6} style={{ display: "flex", flexDirection: "column" }}>
        <Formik
          initialValues={{ name: "", datasetId: "", detectorId: "" }}
          validationSchema={preprocessedDatasetSchema}
          onSubmit={onPreprocess}
        >
          <Card
            elevation={isBoth ? 16 : 0}
            onClick={onBothSelect}
            style={
              isBoth
                ? { border: "solid 1px", borderColor: theme.palette.primary.light }
                : {
                    cursor: "pointer",
                    backgroundColor: "#fafafa"
                  }
            }
          >
            <CardHeader title="Thermal and RGB Dataset" />
            <CardContent>
              <TextField label="Name" name="name" fullWidth />
              <SelectField
                label="Select dataset"
                name="datasetId"
                options={bothDatasets}
                fullWidth
              />
              <SelectField
                label="Select detector"
                name="detectorId"
                options={bothDetectors}
                fullWidth
              />
              <SubmitButton disabled={!isBoth} variant="contained" color="primary">
                Preprocess RGB and Thermal Dataset
              </SubmitButton>
            </CardContent>
          </Card>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Form;
