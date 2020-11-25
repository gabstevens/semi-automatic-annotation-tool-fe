/* eslint-disable react/prop-types */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { Typography, ButtonGroup, Select, Button, Paper } from "@material-ui/core";
import { sentenceCase } from "sentence-case";
import { ArrowBack, ArrowForward, Delete, FileCopy } from "@material-ui/icons";

export const RegionLabel = ({ onCopy, type }) => ({
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
          {type !== "none" ? (
            <ButtonGroup size="small" style={{ marginTop: 4, width: "100%" }} variant="outlined">
              <Button onClick={() => onDelete(region)} size="small" style={{ flexGrow: 1 }}>
                <Delete fontSize="small" />
              </Button>
              {type === "left" ? (
                <Button onClick={() => onCopy(region)} size="small" style={{ flexGrow: 1 }}>
                  <FileCopy fontSize="small" />
                  <ArrowForward fontSize="small" />
                </Button>
              ) : (
                <Button onClick={() => onCopy(region)} size="small" style={{ flexGrow: 1 }}>
                  <ArrowBack fontSize="small" />
                  <FileCopy fontSize="small" />
                </Button>
              )}
            </ButtonGroup>
          ) : (
            <Button
              onClick={() => onDelete(region)}
              size="small"
              variant="contained"
              style={{ marginTop: 4, width: "100%" }}
            >
              <Delete fontSize="small" />
            </Button>
          )}
        </div>
      )}
    </Paper>
  );
};

export default RegionLabel;
