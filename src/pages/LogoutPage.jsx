import React from "react";
import { Redirect } from "react-router-dom";

const LogoutPage = () => {
  localStorage.removeItem("SAAT_ACCESS_TOKEN");
  return <Redirect to="/" />;
};

export default LogoutPage;
