/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import ConfirmDialog from "./ConfirmDialog";

const useEnhancer = ({ onConfirm }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  return {
    confirmModalOpen,
    openConfirmModal: e => {
      e.stopPropagation();
      setConfirmModalOpen(true);
    },
    closeConfirmModal: () => {
      setConfirmModalOpen(false);
    },
    onConfirmCloseModal: () => {
      if (onConfirm) onConfirm();
      setConfirmModalOpen(false);
    }
  };
};

const ButtonWithConfirmation = ({
  children,
  onConfirm,
  dialogComponent: DialogComponent,
  confirmDialogProps,
  ...rest
}) => {
  const {
    confirmModalOpen,
    openConfirmModal,
    closeConfirmModal,
    onConfirmCloseModal
  } = useEnhancer({ onConfirm });

  return (
    <>
      <Button onClick={openConfirmModal} {...rest}>
        {children}
      </Button>
      <DialogComponent
        {...confirmDialogProps}
        open={confirmModalOpen}
        onConfirm={onConfirmCloseModal}
        onCancel={closeConfirmModal}
      />
    </>
  );
};
ButtonWithConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  dialogComponent: PropTypes.func,
  confirmDialogProps: PropTypes.shape({})
};

ButtonWithConfirmation.defaultProps = {
  dialogComponent: ConfirmDialog,
  confirmDialogProps: {}
};

export default React.forwardRef((props, ref) => (
  <ButtonWithConfirmation {...props} innerRef={ref} />
));
