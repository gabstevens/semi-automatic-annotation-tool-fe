import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { Box, Button, IconButton, Toolbar, Tooltip } from "@material-ui/core";
import { ChevronLeft, ChevronRight, Save } from "@material-ui/icons";
import ImageAnnotator from "../image-annotator/ImageAnnotator";
import config from "../../config";

const getImage = (annotation, classList) => {
  const regions = (annotation.rgb_boxes || []).map((box, index) => {
    return {
      cls: classList[parseInt(box[4], 10)],
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
    src: `${config.apiBaseUrl}/media/${annotation.rgb_url}`,
    name: `${config.apiBaseUrl}/media/${annotation.rgb_url}`,
    regions
  };
};

const useEnhancer = ({ annotation, classList, onAnnotationChange }) => {
  const [image, setImage] = useState({});

  useEffect(() => {
    if (annotation.id) {
      setImage(getImage(annotation, classList));
    }
  }, [annotation, classList]);

  return {
    classList,
    image,
    onImageChange: (action, state) => {
      if (
        !["MOUSE_MOVE", "SELECT_IMAGE", "MOUSE_UP", "MOUSE_DOWN"].includes(action.type) &&
        !isEqual(state.images[0], image)
      ) {
        setTimeout(() => setImage(state.images[0]));
      }
    },
    onPrevImage: () => {
      onAnnotationChange({ next: true, image });
    },
    onNextImage: () => {
      onAnnotationChange({ next: false, image });
    },
    onSave: () => {
      onAnnotationChange({ image });
    }
  };
};

const SingleAnnotator = ({ classList, annotation, onAnnotationChange }) => {
  const { image, onImageChange, onPrevImage, onNextImage, onSave } = useEnhancer({
    onAnnotationChange,
    classList,
    annotation
  });
  return (
    <Box display="flex" flexDirection="column" height="calc(100% - 64px)">
      <Toolbar disableGutters>
        <Button onClick={onSave} variant="contained" color="primary">
          <Save />
          &nbsp;Save
        </Button>
        &nbsp;
        <Tooltip arrow placement="top" title="Prev image" color="primary">
          <IconButton onClick={onPrevImage}>
            <ChevronLeft />
          </IconButton>
        </Tooltip>
        &nbsp;
        <Tooltip arrow placement="top" title="Next image">
          <IconButton onClick={onNextImage} color="primary">
            <ChevronRight />
          </IconButton>
        </Tooltip>
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
