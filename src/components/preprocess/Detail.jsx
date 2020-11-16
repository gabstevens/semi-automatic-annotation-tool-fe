import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  LinearProgress,
  styled,
  Toolbar,
  Typography,
  useTheme
} from "@material-ui/core";
import { Delete as DeleteIcon, PlayArrow as PlayArrowIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import { ButtonWithConfirmation } from "..";
import {
  deletePreprocessedDataset,
  getPreprocessedDataset,
  pollingPreprocessedDataset
} from "../../ducks/actions";
import { useInterval } from "../../ducks/hooks";
import { preprocessedDataset, preprocessedDatasetLoading } from "../../ducks/selectors";
import { useNotifications } from "../../notifications";
import { Table } from "../annotation";

const Title = styled(Typography)({
  flexGrow: 1
});

const useEnhancer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { ok, ko } = useNotifications();
  useEffect(() => {
    dispatch(getPreprocessedDataset({ id }));
  }, [dispatch, id]);
  useInterval(() => {
    dispatch(pollingPreprocessedDataset({ id }));
  }, 3000);
  return {
    id,
    preprocessedDataset: useSelector(preprocessedDataset),
    preprocessedDatasetLoading: useSelector(preprocessedDatasetLoading),
    onDelete: async () => {
      const { error } = await dispatch(deletePreprocessedDataset({ id }));
      if (error) {
        ko("Preprocessed dataset not deleted!");
      } else {
        ok("Preprocessed dataset deleted!");
        history.push("/preprocessed-datasets");
      }
    }
  };
};

const Detail = () => {
  const { id, preprocessedDataset, preprocessedDatasetLoading, onDelete } = useEnhancer();
  const theme = useTheme();
  const [colorMap] = useState({
    PE: theme.palette.warning.main,
    FA: theme.palette.error.main,
    SU: theme.palette.success.main
  });
  const [labelMap] = useState({ PE: "Pending", FA: "Failed", SU: "Succeded" });
  if (preprocessedDatasetLoading) return <LinearProgress />;
  return (
    <div>
      <Toolbar disableGutters>
        <Title variant="h4">Preprocessed dataset</Title>
        <ButtonGroup variant="contained">
          <Button
            disabled={!preprocessedDataset.annotation_set.length}
            color="primary"
            component={RouterLink}
            to={`/preprocessed-datasets/${id}/annotations/${
              (preprocessedDataset.annotation_set[0] || {}).id
            }`}
          >
            <PlayArrowIcon />
            &nbsp;Start annotating
          </Button>
          <ButtonWithConfirmation onConfirm={onDelete} color="secondary">
            <DeleteIcon />
            &nbsp;Delete
          </ButtonWithConfirmation>
        </ButtonGroup>
      </Toolbar>
      <Card>
        <CardHeader
          title={preprocessedDataset.name}
          subheader={
            <Chip
              label={labelMap[preprocessedDataset.status]}
              style={{ backgroundColor: colorMap[preprocessedDataset.status] }}
            />
          }
        />
        <Divider />
        <CardContent>
          <Table />
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
