import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Table as GridTable, TableHeaderRow } from "@devexpress/dx-react-grid-material-ui";
import { LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { preprocessedDataset, preprocessedDatasetLoading } from "../../ducks/selectors";
import ClickableRow from "../react-grid/ClickableRow";

const useEnhancer = () => {
  const history = useHistory();
  const { id } = useParams();
  const [columns] = useState([
    {
      name: "rgb_url",
      title: "RGB"
    },
    {
      name: "thermal_url",
      title: "Thermal"
    }
  ]);
  return {
    columns,
    preprocessedDataset: useSelector(preprocessedDataset),
    preprocessedDatasetLoading: useSelector(preprocessedDatasetLoading),
    onRowClick: row => {
      history.push(`/preprocessed-datasets/${id}/annotations/${row.id}`);
    }
  };
};

const Table = () => {
  const { columns, preprocessedDataset, preprocessedDatasetLoading, onRowClick } = useEnhancer();
  if (preprocessedDatasetLoading) return <LinearProgress />;
  return (
    <Grid rows={preprocessedDataset.annotation_set} columns={columns}>
      <GridTable rowComponent={ClickableRow(onRowClick)} />
      <TableHeaderRow />
    </Grid>
  );
};

export default Table;
