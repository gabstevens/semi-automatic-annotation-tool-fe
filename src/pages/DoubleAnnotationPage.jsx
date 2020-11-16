import React, { useState } from "react";
import { isEqual, uniqueId } from "lodash";
import { Box, Grid, IconButton, Tooltip } from "@material-ui/core";
import { ArrowBack, ArrowForward, ChevronLeft, ChevronRight } from "@material-ui/icons";
import dataset1 from "../datasets/dataset1.json";
import { BaseLayout } from "../components";
import ImageAnnotator from "../components/image-annotator/ImageAnnotator";

const getImage = (dataset, imageIndex) => {
  const selectedImage = dataset.imageList[imageIndex];
  const regions = dataset.boxes[selectedImage].map((box, index) => {
    return {
      cls: dataset.classList[parseInt(box[4], 10)],
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
    src: `${dataset.base}${selectedImage}`,
    name: `${dataset.base}${selectedImage}`,
    regions
  };
};

const useEnhancer = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const [leftImage, setLeftImage] = useState(getImage(dataset1, imageIndex));
  const [rightImage, setRightImage] = useState(getImage(dataset1, imageIndex));

  return {
    classList: dataset1.classList,
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
      console.log("SAVED IMAGES", leftImage, rightImage);
      const newImageIndex = (imageIndex - 1) % dataset1.imageList.length;
      setLeftImage(getImage(dataset1, newImageIndex));
      setRightImage(getImage(dataset1, newImageIndex));
      setImageIndex(newImageIndex);
    },
    onNextImage: () => {
      console.log("SAVED IMAGES", leftImage, rightImage);
      const newImageIndex = (imageIndex + 1) % dataset1.imageList.length;
      setLeftImage(getImage(dataset1, newImageIndex));
      setRightImage(getImage(dataset1, newImageIndex));
      setImageIndex(newImageIndex);
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

const AnnotatePage = () => {
  const {
    leftImage,
    rightImage,
    classList,
    onLeftImageChange,
    onRightImageChange,
    onPrevImage,
    onNextImage,
    onLeftToRightCopy,
    onRightToLeftCopy,
    onCopyAllLeft,
    onCopyAllRight
  } = useEnhancer();

  return (
    <BaseLayout>
      <Grid container spacing={2} style={{ height: "90%" }}>
        <Grid item xs={12}>
          <Tooltip arrow placement="top" title="Prev image">
            <IconButton onClick={onPrevImage}>
              <ChevronLeft />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="top" title="Next image">
            <IconButton onClick={onNextImage}>
              <ChevronRight />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6} style={{ height: "100%" }}>
          <Box display="flex" justifyContent="flex-end">
            <Tooltip placement="top" title="Copy regions to right" arrow>
              <IconButton onClick={onCopyAllRight}>
                <ArrowForward />
              </IconButton>
            </Tooltip>
          </Box>
          <ImageAnnotator
            image={leftImage}
            classList={classList}
            callback={onLeftImageChange}
            onCopy={onLeftToRightCopy}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ height: "100%" }}>
          <Box display="flex" justifyContent="flex-start">
            <Tooltip placement="top" title="Copy regions to left" arrow>
              <IconButton onClick={onCopyAllLeft}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </Box>
          <ImageAnnotator
            image={rightImage}
            classList={classList}
            callback={onRightImageChange}
            onCopy={onRightToLeftCopy}
          />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default AnnotatePage;
