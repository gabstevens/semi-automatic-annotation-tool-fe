/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import { useField } from "formik";
import TextField from "./TextField";

const SelectField = ({ options, name, ...other }) => {
  const [field] = useField(name);
  return (
    <TextField select {...field} {...other}>
      {options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    })
  ).isRequired,
};

export default SelectField;
