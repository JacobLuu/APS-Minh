import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

import {
  Box,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";

import {
  BoldText,
  CancelButton,
  DropZone,
  FileDialog,
  FileName,
  Header,
  OKButton,
} from "./styles";

interface Props {
  open: boolean;
  acceptFiles?: string[];
  handleOKButton: Function;
  handleCancelButton: Function;
}

const UploadDialog = (props: Props) => {
  const [uploadFile, setUploadFile] = useState<File>(null);
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      setUploadFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: props.acceptFiles,
  });

  const onClickOKButton = () => {
    props.handleOKButton(uploadFile);
    setUploadFile(null);
  };

  const onClickCancelButton = () => {
    props.handleCancelButton();
    setUploadFile(null);
  };

  return (
    <FileDialog open={props.open} maxWidth="md">
      <DialogContent>
        <Header>
          <Box p={1}>
            <Typography>{t("settings:upload_popup.upload")}</Typography>
          </Box>
        </Header>
        <Box mx={2.5} mt={3} mb={1.5}>
          <FileName>
            {uploadFile ? uploadFile.name : t("settings:upload_popup.file")}
          </FileName>
        </Box>
        <DropZone mx={2.5} {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography>{t("settings:upload_popup.drag_drop")}</Typography>
        </DropZone>
      </DialogContent>
      <DialogActions>
        <OKButton
          color="primary"
          variant="contained"
          onClick={onClickOKButton}
          disabled={!uploadFile}
        >
          <BoldText>{t("settings:upload_popup.ok")}</BoldText>
        </OKButton>
        <CancelButton onClick={onClickCancelButton} disableRipple>
          <BoldText textcolor="#7A99F8">
            {t("settings:upload_popup.cancel")}
          </BoldText>
        </CancelButton>
      </DialogActions>
    </FileDialog>
  );
};

UploadDialog.defaultProps = {
  acceptFiles: [],
};

export default React.memo(UploadDialog);
