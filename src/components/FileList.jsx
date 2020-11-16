import React from "react";
import PropTypes from "prop-types";
import { map, isEmpty } from "lodash";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

const FileList = ({ files, showDelete, onFileDelete }) => {
  return (
    <List dense>
      {isEmpty(files)
        ? "No files"
        : map(files, ({ id, url, filename }) => (
            <ListItem key={id}>
              <ListItemText
                primary={
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {filename}
                  </a>
                }
              />
              {showDelete && (
                <ListItemSecondaryAction>
                  <IconButton onClick={() => onFileDelete({ fileId: id })}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
    </List>
  );
};

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired
    })
  ),
  onFileDelete: PropTypes.func,
  showDelete: PropTypes.bool
};

FileList.defaultProps = {
  files: [],
  onFileDelete: () => {},
  showDelete: false
};
export default FileList;
