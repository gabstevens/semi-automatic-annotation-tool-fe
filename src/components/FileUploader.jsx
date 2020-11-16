/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { forEach } from "lodash";

import { makeStyles } from "@material-ui/core";
import { Publish as PublishIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dropZone: {
    marginTop: 8,
    width: "100%",
    height: 96,
    border: "solid 1px",
    borderRadius: 4,
    borderColor: theme.palette.primary.main,
    cursor: "pointer",
    backgroundColor: "rgba(255,255,255,1)",
    "&:hover": {
      borderColor: "rgba(0, 0, 0, 0.87)",
    },
  },
  icon: {
    position: "relative",
    left: "50%",
    top: "50%",
    marginLeft: "-2rem",
    marginTop: "-2rem",
    fontSize: "4rem",
    color: theme.palette.primary.main,
  },
}));

const FileUploader = ({ onFileUpload }) => {
  const classes = useStyles();
  return (
    <Dropzone
      multiple
      onDrop={(acceptedFiles) =>
        forEach(acceptedFiles, (file) => {
          onFileUpload({ file });
        })
      }>
      {({ getRootProps, getInputProps }) => {
        return (
          <div {...getRootProps({ className: classes.dropZone })}>
            <PublishIcon className={classes.icon} />
            <input {...getInputProps()} />
          </div>
        );
      }}
    </Dropzone>
  );
};

FileUploader.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};
export default FileUploader;
