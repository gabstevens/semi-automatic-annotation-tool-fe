import moment from "moment";

export const enqueueSnackbar = notification => ({
  type: "ENQUEUE_SNACKBAR",
  notification: {
    key: moment().format("x"),
    ...notification
  }
});

export const removeSnackbar = key => ({
  type: "REMOVE_SNACKBAR",
  key
});
