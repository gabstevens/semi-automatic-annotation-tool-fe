/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Checkbox, FormControl } from "@material-ui/core";
import { useField } from "formik";

const CheckboxField = ({ name, label, ...other }) => {
  const [field, meta] = useField(name);
  const isInError = Boolean(meta.touched) && Boolean(meta.error);
  return (
    <FormControl error={isInError} {...other}>
      <FormControlLabel label={label} control={<Checkbox {...field} />} />
    </FormControl>
  );
};

CheckboxField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  name: PropTypes.string.isRequired
};

export default CheckboxField;
