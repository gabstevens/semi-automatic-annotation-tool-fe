/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { isNil } from "lodash";
import numeral from "numeral";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

numeral.locale("it");

const NumeralDataProvider = ({ format, ...props }) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ value }) => !isNil(value) && numeral(value).format(format)}
  />
);

NumeralDataProvider.propTypes = {
  format: PropTypes.string
};

NumeralDataProvider.defaultProps = {
  format: "$0,0.00"
};

export default NumeralDataProvider;
