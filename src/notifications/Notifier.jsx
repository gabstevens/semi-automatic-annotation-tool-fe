import { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { removeSnackbar, notifications } from "../ducks/notifications";

const Notifier = ({ notifications, enqueueSnackbar, removeSnackbar }) => {
  const [displayed, setDisplayed] = useState([]);

  const storeDisplayed = key => {
    setDisplayed([...displayed, key]);
  };

  notifications.forEach(notification => {
    setTimeout(() => {
      // If notification already displayed, abort
      if (displayed.indexOf(notification.key) > -1) return;
      // Display notification using notistack
      enqueueSnackbar(notification.message, {
        ...{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center"
          },
          ...notification.options
        }
      });
      // Add notification's key to the local state
      storeDisplayed(notification.key);
      if (notification.key) {
        removeSnackbar(notification.key);
      }
    }, 1);
  });

  return null;
};

const mapStateToProps = state => ({
  notifications: notifications(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Notifier));
