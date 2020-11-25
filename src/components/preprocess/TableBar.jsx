import React from "react";
import { Button, styled, Toolbar, Typography } from "@material-ui/core";
import { AddToPhotos as AddToPhotosIcon } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Title = styled(Typography)({
  flexGrow: 1
});

const TableBar = () => {
  return (
    <Toolbar disableGutters>
      <Title variant="h4">Preprocessed dataset list</Title>
      <Button
        component={RouterLink}
        to="/preprocessed-datasets/new"
        variant="contained"
        color="primary"
      >
        <AddToPhotosIcon />
        &nbsp;Preprocess new dataset
      </Button>
    </Toolbar>
  );
};

export default TableBar;
