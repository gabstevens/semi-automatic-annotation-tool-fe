/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";
import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
  Toolbar,
  Tooltip
} from "@material-ui/core";
import {
  ArrowBack,
  ArrowForward,
  ChevronLeft,
  ChevronRight,
  FileCopy,
  Save
} from "@material-ui/icons";
import ImageAnnotator from "../image-annotator/ImageAnnotator";
import config from "../../config";

const getImage = (annotation, classList, type) => {
  const regions = (annotation[`${type}_boxes`] || []).map((box, index) => {
    return {
      cls: classList[parseInt(box[6], 10)],
      color: "#f44336",
      editingLabels: false,
      h: box[3],
      id: index,
      type: "box",
      w: box[2],
      x: box[0] - box[2] / 2,
      y: box[1] - box[3] / 2
    };
  });
  return {
    src: `${config.apiBaseUrl}/media/${annotation[`${type}_url`]}`,
    name: `${config.apiBaseUrl}/media/${annotation[`${type}_url`]}`,
    regions
  };
};

const useEnhancer = ({ annotation, classList, onAnnotationChange }) => {
  const [leftImage, setLeftImage] = useState({});
  const [rightImage, setRightImage] = useState({});

  useEffect(() => {
    if (annotation.id) {
      setLeftImage(getImage(annotation, classList, "thermal"));
      setRightImage(getImage(annotation, classList, "rgb"));
    }
  }, [annotation, classList]);

  return {
    leftImage,
    rightImage,
    onLeftImageChange: (action, state) => {
      // console.log("onLeftImageChange", state.images[0]);
      if (
        !["MOUSE_MOVE", "SELECT_IMAGE"].includes(action.type) &&
        !isEqual(state.images[0], leftImage)
      ) {
        setTimeout(() => setLeftImage(state.images[0]));
      }
    },
    onRightImageChange: (action, state) => {
      if (
        !["MOUSE_MOVE", "SELECT_IMAGE"].includes(action.type) &&
        !isEqual(state.images[0], rightImage)
      ) {
        setTimeout(() => setRightImage(state.images[0]));
      }
    },
    onPrevImage: () => {
      onAnnotationChange({ next: false, thermalImage: leftImage, rgbImage: rightImage });
    },
    onNextImage: () => {
      onAnnotationChange({ next: true, thermalImage: leftImage, rgbImage: rightImage });
    },
    onSave: () => {
      onAnnotationChange({ thermalImage: leftImage, rgbImage: rightImage });
    },
    onLeftToRightCopy: region => {
      setRightImage({
        ...rightImage,
        regions: rightImage.regions.find(({ id }) => id === region.id)
          ? rightImage.regions.map(r =>
              r.id === region.id ? { ...region, editingLabels: false } : r
            )
          : [...rightImage.regions, region]
      });
    },
    onRightToLeftCopy: region => {
      setLeftImage({
        ...leftImage,
        regions: leftImage.regions.map(r =>
          r.id === region.id ? { ...region, editingLabels: false } : r
        )
      });
    },
    onCopyAllLeft: () => {
      setLeftImage({
        ...leftImage,
        regions: rightImage.regions.map(r => ({ ...r, editingLabels: false }))
      });
    },
    onCopyAllRight: () => {
      // console.log("onCopyAllRight", leftImage);
      setRightImage({
        ...rightImage,
        regions: leftImage.regions.map(r => ({ ...r, editingLabels: false }))
      });
    }
  };
};

const AnnotatePage = ({ annotation, classList, onAnnotationChange, save, onSaveToggle }) => {
  const {
    leftImage,
    rightImage,
    onLeftImageChange,
    onRightImageChange,
    onPrevImage,
    onNextImage,
    onSave,
    onLeftToRightCopy,
    onRightToLeftCopy,
    onCopyAllLeft,
    onCopyAllRight
  } = useEnhancer({ annotation, classList, onAnnotationChange });

  return (
    <Box display="flex" flexDirection="column" height="calc(100% - 64px)">
      <Toolbar disableGutters>
        <Button onClick={onSave} variant="contained" color="primary">
          <Save />
          &nbsp;Save
        </Button>
        &nbsp;
        <ButtonGroup variant="contained">
          <Tooltip arrow placement="top" title="Prev image">
            <Button onClick={onPrevImage}>
              <ChevronLeft />
              Prev
            </Button>
          </Tooltip>
          <Tooltip arrow placement="top" title="Next image">
            <Button onClick={onNextImage}>
              Next
              <ChevronRight />
            </Button>
          </Tooltip>
        </ButtonGroup>
        &nbsp;
        <FormControlLabel
          control={<Switch checked={save} onChange={onSaveToggle} />}
          label="Auto save"
        />
        <Box flexGrow="1" />
        <ButtonGroup variant="contained">
          <Tooltip placement="top" title="Copy regions to left" arrow>
            <Button onClick={onCopyAllLeft}>
              <ArrowBack />
              <FileCopy />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Copy regions to right" arrow>
            <Button onClick={onCopyAllRight}>
              <FileCopy />
              <ArrowForward />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Toolbar>
      <Box display="flex" height="calc(100% - 64px)">
        <ImageAnnotator
          image={leftImage}
          classList={classList}
          callback={onLeftImageChange}
          onCopy={onLeftToRightCopy}
          type="left"
        />
        <ImageAnnotator
          image={rightImage}
          classList={classList}
          callback={onRightImageChange}
          onCopy={onRightToLeftCopy}
          type="right"
        />
      </Box>
    </Box>
  );
};

export default AnnotatePage;
