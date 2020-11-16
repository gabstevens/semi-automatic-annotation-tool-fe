import React from "react";
import PropTypes from "prop-types";
import { IconButton, makeStyles } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";

const useStyles = makeStyles({
  icon: {
    color: "white"
  }
});

const DismissButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <IconButton size="small" onClick={onClick} className={classes.icon}>
      <Clear />
    </IconButton>
  );
};

DismissButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DismissButton;
