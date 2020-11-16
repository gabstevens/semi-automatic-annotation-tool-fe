import { getIn } from "seamless-immutable";

export default state => {
  if (state.annotationType === "image") {
    const currentImageIndex = state.selectedImage;
    if (state.selectedImage === -1) {
      return { currentImageIndex: null, activeImage: null };
    }
    const pathToActiveImage = ["images", currentImageIndex];
    return {
      currentImageIndex,
      pathToActiveImage,
      activeImage: getIn(state, pathToActiveImage)
    };
  }
  if (state.annotationType === "video") {
    const pathToActiveImage = ["keyframes", state.currentVideoTime || 0];
    return {
      pathToActiveImage,
      activeImage: getIn(state, pathToActiveImage || null)
    };
  }
  return {};
};
