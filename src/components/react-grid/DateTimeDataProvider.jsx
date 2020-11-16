/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

const DateTimeDataProvider = ({ format, ...props }) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ value }) => value && moment(value).format(format)}
  />
);

DateTimeDataProvider.propTypes = {
  format: PropTypes.string
};

DateTimeDataProvider.defaultProps = {
  format: "DD/MM/YYYY hh:mm"
};

export default DateTimeDataProvider;
