/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardHeader, CardContent, useTheme } from "@material-ui/core";
import SubmitButton from "../formik/SubmitButton";
import SelectField from "../formik/SelectField";
import TextField from "../formik/TextField";

const Form = ({ selected, onSelect, datasets, detectors, title }) => {
  const theme = useTheme();
  return (
    <Card
      elevation={selected ? 16 : 0}
      onClick={onSelect}
      style={
        selected
          ? { border: "solid 1px", borderColor: theme.palette.primary.light }
          : {
              cursor: "pointer"
            }
      }
      variant={selected ? "elevation" : "outlined"}
    >
      <CardHeader title={title} />
      <CardContent>
        <TextField label="Name" name="name" fullWidth />
        <SelectField
          label="Select dataset"
          name="datasetId"
          options={datasets.map(({ id, name }) => ({ label: name, value: id }))}
          fullWidth
        />
        <SelectField
          label="Select detector"
          name="detectorId"
          options={detectors.map(({ id, name }) => ({ label: name, value: id }))}
          fullWidth
        />
        <SubmitButton disabled={!selected} variant="contained" color="primary" fullWidth>
          Preprocess
        </SubmitButton>
      </CardContent>
    </Card>
  );
};

export default Form;
