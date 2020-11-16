/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { CardActions, Fab, Tooltip } from "@material-ui/core";

const ToolbarDataProvider = ({ buttons, ...props }) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ row }) => {
      return (
        <CardActions style={{ padding: 0 }}>
          {buttons.map(({ key, tooltip, icon: Icon, to, onClick }) => (
            <Tooltip key={key} placement="top" title={tooltip}>
              <Fab
                size="small"
                component={to && RouterLink}
                to={to && to(row)}
                onClick={onClick && onClick(row)}
              >
                <Icon />
              </Fab>
            </Tooltip>
          ))}
        </CardActions>
      );
    }}
  />
);

ToolbarDataProvider.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({}))
};

ToolbarDataProvider.defaultProps = {
  buttons: []
};

export default ToolbarDataProvider;
