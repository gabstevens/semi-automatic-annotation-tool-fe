import React, { useEffect, useState } from "react";
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
import { DoubleAnnotator, SingleAnnotator } from "../components/annotation";
import { useNotifications } from "../notifications";

const mod = (n, m) => {
  const remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
};

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

  const [save, setSave] = useState(true);

  const dataset = useSelector(preprocessedDataset);
  const datasetLoading = useSelector(preprocessedDatasetLoading);
  const annotationIdList = datasetLoading ? [] : dataset.annotation_set.map(({ id }) => `${id}`);
  const classList = dataset.detector.class_list;
  return {
    classList,
    annotation: useSelector(annotation),
    annotationLoading: useSelector(annotationLoading),
    datasetLoading,
    save,
    onSaveToggle: () => {
      setSave(!save);
    },
    onAnnotationChange: async ({
      next,
      thermalImage = { regions: [] },
      rgbImage = { regions: [] }
    }) => {
      const { error } =
        save || next === undefined
          ? await dispatch(
              updateAnnotation({
                id,
                annotation: {
                  rgb_boxes: rgbImage.regions.map(({ cls, h, w, x, y }) => [
                    x + w / 2,
                    y + h / 2,
                    w,
                    h,
                    1,
                    1,
                    classList.findIndex(tag => tag === cls)
                  ]),
                  thermal_boxes: thermalImage.regions.map(({ cls, h, w, x, y }) => [
                    x + w / 2,
                    y + h / 2,
                    w,
                    h,
                    1,
                    1,
                    classList.findIndex(tag => tag === cls)
                  ])
                }
              })
            )
          : { error: false };
      if (error) {
        ko("Annotation not saved!");
      } else {
        if (save) ok("Annotation saved!");

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
    save,
    onSaveToggle,
    onAnnotationChange
  } = useEnhancer();

  const annotator =
    annotation.rgb_url === null || annotation.thermal_url === null ? (
      <SingleAnnotator
        type={annotation.rgb_url === null ? "thermal" : "rgb"}
        classList={classList}
        annotation={annotation}
        onAnnotationChange={onAnnotationChange}
        save={save}
        onSaveToggle={onSaveToggle}
      />
    ) : (
      <DoubleAnnotator
        classList={classList}
        annotation={annotation}
        onAnnotationChange={onAnnotationChange}
        save={save}
        onSaveToggle={onSaveToggle}
      />
    );

  return (
    <BaseLayout fullWidth>
      {annotationLoading || datasetLoading ? <LinearProgress /> : annotator}
    </BaseLayout>
  );
};

export default AnnotatePage;
