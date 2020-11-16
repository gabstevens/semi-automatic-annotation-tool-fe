/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { Chip, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  chip: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    color: ({ backgroundColor }) => theme.palette.getContrastText(backgroundColor)
  }
}));

// eslint-disable-next-line react/prop-types
const ChipFormatter = ({ color, label }) => {
  const classes = useStyles({ backgroundColor: color || grey[100] });
  return <Chip className={classes.chip} label={label} />;
};

const ChipDataProvider = ({ getLabel, getColor, ...props }) => {
  return (
    <DataTypeProvider
      {...props}
      formatterComponent={({ row }) => (
        <ChipFormatter color={getColor && getColor(row)} label={getLabel && getLabel(row)} />
      )}
    />
  );
};

ChipDataProvider.propTypes = {
  getLabel: PropTypes.func,
  getColor: PropTypes.func
};

ChipDataProvider.defaultProps = {
  getLabel: null,
  getColor: null
};

export default ChipDataProvider;
