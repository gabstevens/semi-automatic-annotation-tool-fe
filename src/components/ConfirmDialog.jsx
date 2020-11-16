import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from "@material-ui/core";
import { Close as CloseIcon, Check as CheckIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  dialogActions: {
    "& > :not(:first-child)": {
      marginLeft: 0
    }
  }
}));

const ConfirmDialog = ({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  confirmButtonContent,
  cancelButtonContent
}) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      {title !== "" && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onConfirm} role="button" aria-label="confirm">
          {confirmButtonContent}
        </Button>
        <Button onClick={onCancel} role="button" aria-label="cancel">
          {cancelButtonContent}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmButtonContent: PropTypes.element,
  cancelButtonContent: PropTypes.element
};

ConfirmDialog.defaultProps = {
  title: "",
  message: "Are you sure?",
  confirmButtonContent: <CheckIcon />,
  cancelButtonContent: <CloseIcon />
};

export default ConfirmDialog;
