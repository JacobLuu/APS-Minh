import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Box, Grid, Typography } from "@material-ui/core";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

import CustomToastContainer from "../../../../components/CustomToastContainer";
import {
  ConflictErrorMessage,
  FrameworkImportErrorMessage,
  FrameworkImportFactorLengthErrorMessage,
} from "../../../../components/ErrorMessage";
import MessageDialog from "../../../../components/MessageDialog";
import UploadDialog from "../../../../components/UploadDialog";
import { FrameworkStatusType, UserRoleType } from "../../../../constants/enums";
import {
  activateTemporaryDataSetsRequested as activateTemporaryDataSetsRequestedAction,
  cancelTemporaryDataSetsRequested as cancelTemporaryDataSetsRequestedAction,
  getCategoriesRequested as getCategoriesRequestedAction,
  resetRequestState,
  selectCategories,
  uploadFrameworkFileRequested as uploadFrameworkFileRequestedAction,
} from "../../../../reducers/settings/categories";
import {
  getTemplateFileRequested as getTemplateFileRequestedAction,
  selectTemplateFile,
} from "../../../../reducers/settings/template";
import { selectUser } from "../../../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RequestStates } from "../../../../types";
import { ActionType, ErrorType, Factor } from "../../../../types/settings";
import SettingsLeftSide from "../SettingsLeftSide";
import SettingsRightSide from "../SettingsRightSide";
import Text from "../../../../components/Text";
import {
  ActionButton,
  ButtonGroup,
  CancelButton,
  ErrorMessageBox,
} from "./styles";
import { TEXT_COLOR_GREY } from "../../../../themes/colors";

const FrameworkSettings = () => {
  const [selectedFactor, setSelectedFactor] = useState<Factor>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState<boolean>(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] =
    useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [hasTemporaryData, setHasTemporaryData] = useState<boolean>(false);
  const [isApplyingFramework, setIsApplyingFramework] =
    useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    categories,
    requestState,
    actionType,
    isRequesting,
    isProcessing,
    isConflicted,
    errorType,
  } = useAppSelector(selectCategories);

  const { fileData, fileName } = useAppSelector(selectTemplateFile);

  useEffect(() => {
    dispatch(getCategoriesRequestedAction());
    setInitialized(true);
    return () => {
      dispatch(resetRequestState());
    };
  }, []);

  useEffect(() => {
    if (user.organization.framework) {
      dispatch(
        getTemplateFileRequestedAction({
          framework: user.organization.framework,
        })
      );
    }
  }, [user.organization.framework]);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    if (isRequesting) {
      return;
    }
    if (
      requestState === RequestStates.Failed ||
      requestState === RequestStates.Conflict
    ) {
      setShowErrorMessage(true);
    } else if (requestState === RequestStates.Succeeded) {
      setShowErrorMessage(false);
      let toastMessage = "";
      if (actionType === ActionType.uploadFrameworkFile) {
        toastMessage = t("settings:framwork_preview_mode.framework_imported");
      }
      if (toastMessage !== "") {
        toast(
          <CustomToastContainer
            Icon={<PriorityHighIcon />}
            title="Info"
            message={toastMessage}
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
      }
    }
  }, [categories, actionType, requestState]);

  useEffect(() => {
    const temporaryFactor = categories?.find((category) =>
      category?.factors?.find(
        (factor) => factor?.status === FrameworkStatusType.temporary
      )
    );
    setHasTemporaryData(!!temporaryFactor);
    const existing_categories = categories?.find((category) =>
      category?.factors?.find((factor) => factor !== null)
    );
    if (existing_categories?.factors) {
      setSelectedFactor(existing_categories?.factors[0]);
    }
  }, [categories]);

  const handleUploadFile = (file) => {
    setIsUploadDialogOpen(false);
    if (file) {
      dispatch(uploadFrameworkFileRequestedAction({ file }));
    }
  };

  const handleDownloadFile = () => {
    if (fileData) {
      const fileLink = document.createElement("a");
      const downloadUrl = window.URL.createObjectURL(
        new Blob([fileData], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      fileLink.download = fileName || "ESG Framework.xlsx";
      fileLink.href = downloadUrl;
      document.body.appendChild(fileLink);
      fileLink.click();
      document.body.removeChild(fileLink);
    }
  };

  const handleActivateData = () => {
    setShowErrorMessage(false);
    setIsMessageDialogOpen(false);
    setIsApplyingFramework(true);
    dispatch(activateTemporaryDataSetsRequestedAction());
  };

  const handleCancelData = () => {
    dispatch(cancelTemporaryDataSetsRequestedAction());
  };

  const renderErrorMessage = (
    _showErrorMessage: boolean,
    _isConflicted: boolean,
    _errorType: ErrorType
  ) => {
    if (_showErrorMessage) {
      if (_isConflicted) {
        return (
          <ErrorMessageBox>
            <ConflictErrorMessage />
          </ErrorMessageBox>
        );
      }
      if (_errorType === ErrorType.FrameworkImportFactorLengthErrorMessage) {
        return (
          <ErrorMessageBox>
            <FrameworkImportFactorLengthErrorMessage />
          </ErrorMessageBox>
        );
      }
      return (
        <ErrorMessageBox>
          <FrameworkImportErrorMessage />
        </ErrorMessageBox>
      );
    }
    return null;
  };

  const renderButtons = () => {
    if (user?.role !== UserRoleType.admin) {
      return null;
    }
    if (isConflicted) {
      return null;
    }
    if (isProcessing || isApplyingFramework) {
      return null;
    }
    if (hasTemporaryData) {
      return (
        <React.Fragment>
          <Box ml={1}>
            <ActionButton
              color="primary"
              variant="contained"
              style={{ minWidth: "66px" }}
              onClick={() => setIsMessageDialogOpen(true)}
              disabled={isRequesting}
            >
              <Typography>
                {t("settings:framwork_preview_mode.save")}
              </Typography>
            </ActionButton>
          </Box>
          <Box ml={0.5}>
            <CancelButton
              color="default"
              variant="contained"
              style={{ minWidth: "83px" }}
              onClick={handleCancelData}
              disabled={isRequesting}
            >
              <Typography>
                {t("settings:framwork_preview_mode.cancel")}
              </Typography>
            </CancelButton>
          </Box>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Box ml={1}>
          <ActionButton
            color="primary"
            variant="contained"
            style={{ minWidth: "172px" }}
            onClick={handleDownloadFile}
            disabled={!fileData || isRequesting}
          >
            <Typography>
              {t("settings:framework_view_mode.download_template")}
            </Typography>
          </ActionButton>
        </Box>
        <Box ml={0.5}>
          <ActionButton
            color="primary"
            variant="contained"
            style={{ minWidth: "83px" }}
            onClick={() => setIsUploadDialogOpen(true)}
            disabled={isRequesting}
          >
            <Typography>{t("settings:framework_view_mode.upload")}</Typography>
          </ActionButton>
        </Box>
      </React.Fragment>
    );
  };

  return (
    <Box mx={4.5} mt={2.5} mb={1} style={{ minHeight: "100%", margin: 0 }}>
      <Box mt={1}>
        <Grid container alignItems="center">
          <Box flexGrow="1">
            <Text $color={TEXT_COLOR_GREY} style={{ height: "25px" }}>
              {t("settings:framework_view_mode.if_you_have")}
            </Text>
          </Box>
          <ButtonGroup>{renderButtons()}</ButtonGroup>
        </Grid>
      </Box>
      <Box mt={2.5}>
        <Grid container style={{ position: "relative" }}>
          <SettingsLeftSide
            categories={categories}
            selectedFactor={selectedFactor}
            onChangeFactor={setSelectedFactor}
          />
          <SettingsRightSide selectedFactor={selectedFactor} />
          {renderErrorMessage(showErrorMessage, isConflicted, errorType)}
        </Grid>
      </Box>
      <UploadDialog
        open={isUploadDialogOpen}
        handleOKButton={handleUploadFile}
        handleCancelButton={() => setIsUploadDialogOpen(false)}
        acceptFiles={[".xlsx"]}
      />
      <MessageDialog
        open={isMessageDialogOpen}
        handleOKButton={handleActivateData}
        handleCancelButton={() => setIsMessageDialogOpen(false)}
        showCancelButton
        child={
          <React.Fragment>
            <Typography>
              {t("settings:popup_message_to_confirm.clicking_ok")}
            </Typography>
          </React.Fragment>
        }
      />
    </Box>
  );
};

export default React.memo(FrameworkSettings);
