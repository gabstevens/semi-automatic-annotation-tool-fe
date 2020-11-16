/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { IconButton, CircularProgress, makeStyles } from "@material-ui/core";
import { Delete, Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dropZone: {
    position: "relative",
    outline: "none",
    display: "inline-block",
    width: 240,
    height: 240,
    border: "solid 1px",
    borderRadius: "100%",
    borderColor: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      borderColor: "#63aec7",
    },
  },
  imageRoot: {
    overflow: "hidden",
    position: "relative",
    outline: "none",
    display: "inline-block",
    width: 240,
    height: 240,
    border: "solid 1px",
    borderRadius: "100%",
    borderColor: theme.palette.primary.main,
    cursor: "pointer",
  },
  imageIcon: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: "-4rem",
    marginTop: "-4rem",
    fontSize: "8rem",
    color: theme.palette.primary.main,
  },
  trashButton: {
    opacity: 0,
    display: "block",
    position: "absolute",
    left: "0",
    top: "0",
    width: "240px",
    height: "240px",
    "&:hover": {
      opacity: 1,
    },
  },
  trashIcon: {
    fontSize: "2rem",
    color: theme.palette.primary.main,
  },
  loader: {
    position: "absolute",
    top: "calc(50% - 40px)",
    left: "calc(50% - 40px)",
  },
}));

const ImageUploader = ({ imageUrl, imageAlt, loading, onFileUpload, icon: Icon }) => {
  const classes = useStyles();

  if (loading) {
    return (
      <div className={classes.imageRoot}>
        <CircularProgress size={80} className={classes.loader} />
      </div>
    );
  }
  if (imageUrl) {
    return (
      <div className={classes.imageRoot}>
        <img alt={imageAlt} width={240} src={imageUrl} />

        <IconButton
          aria-label="delete"
          className={classes.trashButton}
          onClick={() => {
            onFileUpload({ file: null });
          }}>
          <Delete className={classes.trashIcon} />
        </IconButton>
      </div>
    );
  }

  return (
    <Dropzone
      accept="image/*"
      maxSize={1000000}
      multiple={false}
      onDrop={(acceptedFiles) => {
        onFileUpload({ file: acceptedFiles[0] });
      }}>
      {({ getRootProps, getInputProps }) => {
        return (
          <div {...getRootProps({ className: classes.dropZone })}>
            <Icon className={classes.imageIcon} />
            <input {...getInputProps()} />
          </div>
        );
      }}
    </Dropzone>
  );
};

ImageUploader.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  onFileUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  icon: PropTypes.element,
};

ImageUploader.defaultProps = {
  imageUrl: null,
  imageAlt: "",
  loading: false,
  icon: Person,
};

export default ImageUploader;
