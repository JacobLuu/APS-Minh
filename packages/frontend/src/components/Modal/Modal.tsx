import React, { ReactElement } from "react";

import Box from "@material-ui/core/Box";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { ActionContainer, ClearIcon } from "./styles";

export interface ModalProps {
  isOpen: boolean;
  headerJSX: ReactElement;
  bodyJSX: ReactElement;
  actionJSX?: ReactElement;
  handleSubmit?: (event) => void;
  handleClose: () => void;
  fullWidth?: DialogProps["fullWidth"];
  maxWidth?: DialogProps["maxWidth"];
  actionContainerPosition?: string;
}

const Modal = (props: ModalProps) => {
  const {
    isOpen,
    headerJSX,
    bodyJSX,
    actionJSX,
    handleSubmit,
    handleClose,
    fullWidth,
    maxWidth,
    actionContainerPosition,
  } = props;

  return (
    <Dialog open={isOpen} fullWidth={fullWidth} maxWidth={maxWidth}>
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
        }}
      >
        <Box>{headerJSX}</Box>

        <DialogContent>{bodyJSX}</DialogContent>

        <ActionContainer
          $hasChildren={actionJSX !== null}
          $actionContainerPosition={actionContainerPosition}
        >
          {actionJSX}
          <ClearIcon onClick={handleClose} />
        </ActionContainer>
      </form>
    </Dialog>
  );
};

Modal.defaultProps = {
  actionJSX: null,
  handleSubmit: () => {},
  fullWidth: true,
  maxWidth: "sm",
  actionContainerPosition: "flex-end",
};

export default Modal;
