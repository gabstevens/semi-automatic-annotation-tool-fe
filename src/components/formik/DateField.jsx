/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { isNull } from "lodash";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useField } from "formik";

const DateTimeField = ({ name, format, ...other }) => {
  const [field, meta, { setValue }] = useField(name);
  const isInError = Boolean(meta.error) && Boolean(meta.touched);
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        error={isInError}
        helperText={meta.error}
        format={format}
        margin="normal"
        {...field}
        {...other}
        onChange={date => (isNull(date) ? setValue(null) : setValue(date))}
      />
    </MuiPickersUtilsProvider>
  );
};

DateTimeField.propTypes = {
  name: PropTypes.string.isRequired,
  format: PropTypes.string
};

DateTimeField.defaultProps = {
  format: "DD/MM/YYYY"
};

export default DateTimeField;
