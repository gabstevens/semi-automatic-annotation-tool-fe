import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { BaseLayout } from "../components";
import { getAnnotation, getPreprocessedDataset, updateAnnotation } from "../ducks/actions";
import {
  annotation,
  annotationLoading,
  preprocessedDataset,
  preprocessedDatasetLoading
} from "../ducks/selectors";
import { SingleAnnotator } from "../components/annotation";
import { useNotifications } from "../notifications";

const useEnhancer = () => {
  const { preprocessedDatasetId, id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { ok, ko } = useNotifications();
  useEffect(() => {
    dispatch(getAnnotation({ id }));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getPreprocessedDataset({ id: preprocessedDatasetId }));
  }, [dispatch, preprocessedDatasetId]);

  const dataset = useSelector(preprocessedDataset);
  const datasetLoading = useSelector(preprocessedDatasetLoading);
  const annotationIdList = datasetLoading ? [] : dataset.annotation_set.map(({ id }) => `${id}`);
  const classList = dataset.detector.class_list;

  return {
    classList,
    annotation: useSelector(annotation),
    annotationLoading: useSelector(annotationLoading),
    datasetLoading,
    onAnnotationChange: async ({ next, image }) => {
      const { error } = await dispatch(
        updateAnnotation({
          id,
          annotation: {
            rgb_boxes: image.regions.map(({ cls, h, w, x, y }) => [
              x + w / 2,
              y + h / 2,
              w,
              h,
              classList.findIndex(tag => tag === cls)
            ])
          }
        })
      );
      if (error) {
        ko("Annotation not saved!");
      } else {
        ok("Annotation saved!");
        const mod = (n, m) => {
          const remain = n % m;
          return Math.floor(remain >= 0 ? remain : remain + m);
        };
        if (next !== undefined) {
          const newId =
            annotationIdList[
              mod(
                annotationIdList.findIndex(x => x === id) + (next ? 1 : -1),
                annotationIdList.length
              )
            ];
          history.push(`/preprocessed-datasets/${preprocessedDatasetId}/annotations/${newId}`);
        }
      }
    }
  };
};

const AnnotatePage = () => {
  const {
    classList,
    annotation,
    annotationLoading,
    datasetLoading,
    onAnnotationChange
  } = useEnhancer();
  return (
    <BaseLayout fullWidth>
      {annotationLoading || datasetLoading ? (
        <LinearProgress />
      ) : (
        <SingleAnnotator
          classList={classList}
          annotation={annotation}
          onAnnotationChange={onAnnotationChange}
        />
      )}
    </BaseLayout>
  );
};

export default AnnotatePage;
