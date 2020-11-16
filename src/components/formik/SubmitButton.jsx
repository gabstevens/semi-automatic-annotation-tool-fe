/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const SubmitButton = ({ children, disabled, ...rest }) => {
  const { submitForm, dirty, isValid, isSubmitting } = useFormikContext();
  return (
    <Button
      {...rest}
      onClick={submitForm}
      disabled={disabled || isSubmitting || !dirty || !isValid}
    >
      {children}
    </Button>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  disabled: PropTypes.bool
};

SubmitButton.defaultProps = {
  disabled: false
};

export default SubmitButton;
