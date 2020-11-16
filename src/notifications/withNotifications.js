/* eslint-disable no-shadow */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { enqueueSnackbar } from "../ducks/notifications";

const enhance = compose(
  connect(null, dispatch => bindActionCreators({ enqueueSnackbar }, dispatch)),
  withHandlers({
    ok: ({ enqueueSnackbar }) => message =>
      enqueueSnackbar({
        message,
        options: {
          variant: "success"
        }
      }),
    ko: ({ enqueueSnackbar }) => message =>
      enqueueSnackbar({
        message,
        options: {
          variant: "error"
        }
      })
  })
);

export default enhance;
