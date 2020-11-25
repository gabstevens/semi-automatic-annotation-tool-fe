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
import { ChevronLeft, ChevronRight, Save } from "@material-ui/icons";
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

const useEnhancer = ({ annotation, classList, onAnnotationChange, type }) => {
  const [image, setImage] = useState({});

  useEffect(() => {
    if (annotation.id) {
      setImage(getImage(annotation, classList, type));
    }
  }, [annotation, classList, type]);

  return {
    image,
    onImageChange: (action, state) => {
      if (
        !["MOUSE_MOVE", "SELECT_IMAGE"].includes(action.type) &&
        !isEqual(state.images[0], image)
      ) {
        setTimeout(() => setImage(state.images[0]));
      }
    },
    onPrevImage: () => {
      onAnnotationChange({ next: false, [`${type}Image`]: image });
    },
    onNextImage: () => {
      onAnnotationChange({ next: true, [`${type}Image`]: image });
    },
    onSave: () => {
      onAnnotationChange({ [`${type}Image`]: image });
    }
  };
};

const SingleAnnotator = ({
  type,
  classList,
  annotation,
  onAnnotationChange,
  save,
  onSaveToggle
}) => {
  const { image, onImageChange, onPrevImage, onNextImage, onSave } = useEnhancer({
    onAnnotationChange,
    classList,
    annotation,
    type
  });
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
      </Toolbar>
      <Box height="calc(100% - 64px)">
        <ImageAnnotator
          image={image}
          classList={classList}
          callback={onImageChange}
          onCopy={() => {}}
        />
      </Box>
    </Box>
  );
};

export default SingleAnnotator;
