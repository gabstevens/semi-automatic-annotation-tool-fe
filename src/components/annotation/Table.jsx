import React, { useState } from "react";
import { last } from "lodash";
import { useHistory, useParams } from "react-router-dom";
import {
  Grid,
  PagingPanel,
  Table as GridTable,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import { IntegratedPaging, PagingState } from "@devexpress/dx-react-grid";
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
      title: "RGB",
      getCellValue: row => last((row.rgb_url || "Not available").split("/"))
    },
    {
      name: "thermal_url",
      title: "Thermal",
      getCellValue: row => last((row.thermal_url || "Not available").split("/"))
    },
    {
      name: "checker",
      title: "Checker",
      getCellValue: ({ checker }) => (checker ? checker.username : "Not checked yet")
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
      <PagingState defaultCurrentPage={0} pageSize={20} />
      <IntegratedPaging />
      <GridTable rowComponent={ClickableRow(onRowClick)} />
      <TableHeaderRow />
      <PagingPanel />
    </Grid>
  );
};

export default Table;
