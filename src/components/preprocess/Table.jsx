import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Table as GridTable, TableHeaderRow } from "@devexpress/dx-react-grid-material-ui";
import { LinearProgress, useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { preprocessedDatasets, preprocessedDatasetsLoading } from "../../ducks/selectors";
import { getPreprocessedDatasets, pollingPreprocessedDatasets } from "../../ducks/actions";
import { useInterval } from "../../ducks/hooks";
import ClickableRow from "../react-grid/ClickableRow";
import ChipDataProvider from "../react-grid/ChipDataProvider";

const useEnhancer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getPreprocessedDatasets());
  }, [dispatch]);
  useInterval(() => {
    dispatch(pollingPreprocessedDatasets());
  }, 3000);
  const theme = useTheme();
  const [colorMap] = useState({
    PE: theme.palette.warning.main,
    FA: theme.palette.error.main,
    SU: theme.palette.success.main
  });
  const [labelMap] = useState({ PE: "Pending", FA: "Failed", SU: "Succeded" });
  const [columns] = useState([
    {
      name: "name",
      title: "Name"
    },
    {
      name: "time",
      title: "Time [h:m:s]"
    },
    {
      name: "status",
      title: "Status"
    }
  ]);
  return {
    colorMap,
    labelMap,
    columns,
    preprocessedDatasets: useSelector(preprocessedDatasets),
    preprocessedDatasetsLoading: useSelector(preprocessedDatasetsLoading),
    onRowClick: ({ id }) => {
      history.push(`/preprocessed-datasets/${id}`);
    }
  };
};

const Table = () => {
  const {
    colorMap,
    labelMap,
    columns,
    preprocessedDatasets,
    preprocessedDatasetsLoading,
    onRowClick
  } = useEnhancer();
  if (preprocessedDatasetsLoading) return <LinearProgress />;
  return (
    <Grid rows={preprocessedDatasets} columns={columns}>
      <ChipDataProvider
        for={["status"]}
        getColor={({ status }) => colorMap[status]}
        getLabel={({ status }) => labelMap[status]}
      />
      <GridTable rowComponent={ClickableRow(onRowClick)} />
      <TableHeaderRow />
    </Grid>
  );
};

export default Table;
