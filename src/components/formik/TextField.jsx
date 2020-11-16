/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { TextField as MUITextField } from "@material-ui/core";
import { useField } from "formik";

const TextField = ({ name, label, number, ...other }) => {
  const [field, meta] = useField(name);
  const isInError = Boolean(meta.touched) && Boolean(meta.error);
  return (
    <MUITextField
      margin="normal"
      type={number ? "number" : "text"}
      error={isInError}
      helperText={isInError && meta.error}
      label={label}
      {...field}
      {...other}
    />
  );
};

TextField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.bool
};

TextField.defaultProps = {
  number: false
};

export default TextField;
