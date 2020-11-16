import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const SubmitButton = ({ children, ...rest }) => {
  const { resetForm } = useFormikContext();
  return (
    <Button {...rest} onClick={resetForm}>
      {children}
    </Button>
  );
};

export default SubmitButton;
