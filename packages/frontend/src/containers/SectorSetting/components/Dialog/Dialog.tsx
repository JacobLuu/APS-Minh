import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { DialogContainer } from "./styles";
import { sectorSettingContext } from "../../SectorSetting";

export interface IDialog {
  open: boolean;
  handleClose: (boolean) => void;
}

const Dialog = (props: IDialog) => {
  const { open, handleClose } = props;
  const { isTableOnEditMode, setIsTableOnEditMode } =
    React.useContext(sectorSettingContext);

  const handleApply = () => {
    handleClose(false);
    setIsTableOnEditMode((prevState) => !prevState);
  };

  const handleCancel = () => {
    handleClose(false);
    setIsTableOnEditMode((prevState) => !prevState);
  };

  return (
    <DialogContainer
      open={open}
      onClose={() => handleClose(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Save changes?</DialogTitle>
      <CloseIcon className="close-icon" onClick={() => handleClose(false)} />
      <DialogContent>
        <Box className="content">
          <Box className="field-name-container">
            <Typography>
              Changes you made will affect all portfolio score and weightage.
              Please note that this process will take a few hours to complete.
              Are you sure you want to apply these changes?
            </Typography>
          </Box>
        </Box>
        <Box className="action">
          <Button
            onClick={handleCancel}
            color="primary"
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            color="primary"
            variant="contained"
            autoFocus
          >
            Apply
          </Button>
        </Box>
      </DialogContent>
    </DialogContainer>
  );
};

export default React.memo(Dialog);
