/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import { Typography } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    margin: 16
  }
}));

const AsyncSelectField = ({ name, label, loadOptions, formikToProps, ...other }) => {
  const classes = useStyles();
  const [field] = useField(name);
  const formik = useFormikContext();
  return (
    <div className={classes.root}>
      {label && (
        <Typography variant="body2" gutterBottom>
          {label}
        </Typography>
      )}
      <AsyncSelect
        {...field}
        onChange={value => {
          field.onChange({ target: { name: field.name, value } });
        }}
        loadOptions={loadOptions}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        {...formikToProps(formik)}
        {...other}
      />
    </div>
  );
};

AsyncSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  loadOptions: PropTypes.func.isRequired,
  formikToProps: PropTypes.func
};

AsyncSelectField.defaultProps = {
  formikToProps: () => {}
};

export default AsyncSelectField;
