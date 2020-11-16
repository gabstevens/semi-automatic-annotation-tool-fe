const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ENQUEUE_SNACKBAR":
      return [...state, action.notification];

    case "REMOVE_SNACKBAR":
      return state.filter(notification => notification.key !== action.key);

    default:
      return state;
  }
};
