/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../ducks/selectors";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(isAuthenticated);
  return isAuth ? <Route {...rest} component={Component} /> : <Redirect to="/" />;
};

export default PrivateRoute;
