import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import { BaseLayout } from "../components";
import { Form } from "../components/preprocess";

const NewPreprocessedDatasetPage = () => {
  return (
    <BaseLayout>
      <Toolbar disableGutters>
        <Typography variant="h4">Preprocess new dataset</Typography>
      </Toolbar>
      <Form />
    </BaseLayout>
  );
};

export default NewPreprocessedDatasetPage;
