/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

const ActionsDataProvider = ({ actionsComponent: ActionsComponent, ...props }) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ row }) => {
      return <ActionsComponent row={row} />;
    }}
  />
);

ActionsDataProvider.propTypes = {
  actionsComponent: PropTypes.func.isRequired
};

export default ActionsDataProvider;
