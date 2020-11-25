import React, { useState } from "react";
import { Formik } from "formik";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import * as yup from "yup";
import { login } from "../../ducks/actions";
import { useNotifications } from "../../notifications";
import TextField from "../formik/TextField";
import SubmitButton from "../formik/SubmitButton";
import { isAuthenticated } from "../../ducks/selectors";

const useEnhancer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ok, ko } = useNotifications();
  const [loginSchema] = useState(
    yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required()
    })
  );

  return {
    loginSchema,
    isAuthenticated: useSelector(isAuthenticated),
    onLogin: async ({ username, password }) => {
      const { error } = await dispatch(login({ username, password }));
      if (error) {
        ko("Login failed!");
      } else {
        history.push("/preprocessed-datasets");
        ok("Logged in!");
      }
    }
  };
};

const Form = () => {
  const { loginSchema, isAuthenticated, onLogin } = useEnhancer();
  if (isAuthenticated) return <Redirect to="/preprocessed-datasets" />;
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={onLogin}
    >
      <Card elevation={6}>
        <CardHeader title="Login to start annotating" subheader="Insert username e password" />
        <Divider />
        <CardContent>
          <TextField name="username" label="Username" fullWidth />
          <TextField name="password" label="Password" type="password" fullWidth />
          <SubmitButton variant="contained" color="primary" fullWidth>
            Login
          </SubmitButton>
        </CardContent>
      </Card>
    </Formik>
  );
};

export default Form;
