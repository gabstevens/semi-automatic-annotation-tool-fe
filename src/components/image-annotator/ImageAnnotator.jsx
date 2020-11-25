import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import historyHandler from "./react-image-annotate/Annotator/reducers/history-handler";
import combineReducers from "./react-image-annotate/Annotator/reducers/combine-reducers";
import Annotator from "./react-image-annotate";
import imageReducer from "./react-image-annotate/Annotator/reducers/image-reducer";
import generalReducer from "./react-image-annotate/Annotator/reducers/general-reducer";

import RegionEditLabel from "./RegionEditLabel";

const useEnhancer = ({ image, classList, callback }) => {
  const callbackHandler = (callback, reducer) => (state, action) => {
    const nextState = reducer(state, action);
    callback(action, nextState);
    return nextState;
  };

  const [state, dispatchToReducer] = useReducer(
    callbackHandler(callback, historyHandler(combineReducers(imageReducer, generalReducer))),
    {
      annotationType: "image",
      showTags: true,
      images: [image],
      selectedImage: 0,
      allowedArea: false,
      showPointDistances: false,
      pointDistancePrecision: undefined,
      enabledTools: ["select", "create-box", "show-mask"],
      selectedTool: "select",
      fullImageSegmentationMode: false,
      mode: null,
      showMask: true,
      labelImages: false,
      regionTagList: undefined,
      regionClsList: classList || [],
      imageTagList: undefined,
      imageClsList: [],
      keyframes: undefined,
      history: [],
      currentVideoTime: 0,
      taskDescription: "",
      videoName: undefined,
      videoTime: 0,
      keypointDefinitions: undefined,
      autoSegmentationOptions: { type: "autoseg" }
    }
  );

  useEffect(() => {
    dispatchToReducer({
      type: "SELECT_IMAGE",
      image
    });
  }, [image]);

  return {
    state,
    dispatchToReducer
  };
};

const ImageAnnotator = ({ image, classList, callback, onCopy, type }) => {
  const { state, dispatchToReducer } = useEnhancer({ image, classList, callback });
  return (
    <Annotator
      state={state}
      dispatchToReducer={dispatchToReducer}
      RegionEditLabel={RegionEditLabel({ onCopy, type })}
    />
  );
};

ImageAnnotator.propTypes = {
  image: PropTypes.shape({}).isRequired,
  classList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCopy: PropTypes.func,
  callback: PropTypes.func,
  type: PropTypes.string
};

ImageAnnotator.defaultProps = {
  // eslint-disable-next-line no-console
  onCopy: console.log,
  // eslint-disable-next-line no-console
  callback: console.log,
  type: "none"
};

export default ImageAnnotator;
