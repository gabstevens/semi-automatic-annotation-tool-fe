import React from "react";
import { BaseLayout } from "../components";
import { Table, TableBar } from "../components/preprocess";

const PreprocessedDatasetsPage = () => {
  return (
    <BaseLayout>
      <TableBar />
      <Table />
    </BaseLayout>
  );
};

export default PreprocessedDatasetsPage;
