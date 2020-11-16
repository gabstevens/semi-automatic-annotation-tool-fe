/* eslint-disable react/prop-types */
import React from "react";
import TrashIcon from "@material-ui/icons/Delete";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import { Typography, ButtonGroup, Select, Button, Paper } from "@material-ui/core";
import { sentenceCase } from "sentence-case";

export const RegionLabel = ({ onCopy, isBoth }) => ({
  region,
  editing,
  allowedClasses,
  onDelete,
  onClose,
  onOpen,
  onChange
}) => {
  return (
    <Paper
      onClick={() => (!editing ? onOpen(region) : null)}
      style={editing ? { padding: 4 } : { opacity: 0.7, padding: 4, cursor: "pointer" }}
    >
      {!editing ? (
        <Typography variant="body2">{sentenceCase(region.cls)}</Typography>
      ) : (
        <div>
          <Select
            fullWidth
            value={region.cls}
            onChange={({ target: { value } }) => {
              onChange({ ...region, cls: value });
              onClose(region);
            }}
          >
            {allowedClasses.map(c => (
              <ListItem key={c} value={c}>
                {sentenceCase(c)}
              </ListItem>
            ))}
          </Select>
          {isBoth ? (
            <ButtonGroup size="small" style={{ marginTop: 4, width: "100%" }}>
              <Button onClick={() => onCopy(region)} size="small" variant="outlined">
                <ChevronRightIcon fontSize="small" />
              </Button>
              <Button onClick={() => onDelete(region)} size="small" variant="outlined">
                <TrashIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              onClick={() => onDelete(region)}
              size="small"
              variant="outlined"
              style={{ marginTop: 4, width: "100%" }}
            >
              <TrashIcon fontSize="small" />
            </Button>
          )}
        </div>
      )}
    </Paper>
  );
};

export default RegionLabel;
