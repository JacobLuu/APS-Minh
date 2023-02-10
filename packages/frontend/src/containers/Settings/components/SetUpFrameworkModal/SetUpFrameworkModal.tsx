import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import {
  DialogContainer,
  FrameworkNameField,
  DescriptionField,
} from "./styles";
import ExcelLogo from "../../../../assets/images/Excel.png";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  getTemplateFileRequested as getTemplateFileRequestedAction,
  selectTemplateFile,
} from "../../../../reducers/settings/template";
import { selectUser } from "../../../../reducers/user";
import {
  AnswerLengthErrorMessage,
  RequiredErrorMessage,
  SourceLengthErrorMessage,
} from "../../../../components/ErrorMessage";
import { CustomFramework } from "../../../../types/settings";
import {
  MAX_200_CHARACTERS_VALIDATION_RULES,
  MAX_500_CHARACTERS_OPTIONAL_RULES,
} from "../../../../utils/formValidator";

export interface ISetUpFrameworkModal {
  isOpenDialog: boolean;
  handleClose: (boolean) => void;
  setIsAlreadyUploaded: (boolean) => void;
  setCustomFrameworkInfo: (string) => void;
}

const REQUIRED = "required";
const MAXLENGTH = "maxLength";

const SetUpFrameworkModal = (props: ISetUpFrameworkModal) => {
  const { t } = useTranslation();
  const {
    isOpenDialog,
    handleClose,
    setIsAlreadyUploaded,
    setCustomFrameworkInfo,
  } = props;
  const dispatch = useAppDispatch();
  const { fileData, fileName } = useAppSelector(selectTemplateFile);
  const user = useAppSelector(selectUser);
  const [progress, setProgress] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomFramework>({
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  // this effect just is used to show uploading progress UI, not for logic.
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
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
    return () => {
      reset();
    };
  }, [isOpenDialog]);

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

  const submit = async (data) => {
    await setCustomFrameworkInfo(data);
    await setIsAlreadyUploaded((prevState) => !prevState);
    await handleClose(false);
  };

  return (
    <DialogContainer
      open={isOpenDialog}
      onClose={() => handleClose(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {t("settings:create_framework_popup.set_up_framework")}
      </DialogTitle>
      <CloseIcon className="close-icon" onClick={() => handleClose(false)} />
      <DialogContent>
        <form onSubmit={handleSubmit(submit)}>
          <Box className="action">
            <Controller
              control={control}
              name="name"
              rules={MAX_200_CHARACTERS_VALIDATION_RULES}
              render={({ field, fieldState }) => (
                <Box className="field-name-container">
                  <Typography className="form-label">
                    {t("settings:create_framework_popup.framework_name")}
                  </Typography>
                  <FrameworkNameField
                    className={fieldState.invalid ? "error" : "input-name"}
                    value={field.value}
                    onChange={field.onChange}
                    name="name"
                  />
                  {fieldState.error?.type === REQUIRED && (
                    <RequiredErrorMessage />
                  )}
                  {fieldState.error?.type === MAXLENGTH && (
                    <SourceLengthErrorMessage />
                  )}
                </Box>
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={MAX_500_CHARACTERS_OPTIONAL_RULES}
              render={({ field, fieldState }) => (
                <Box className="field-description-container">
                  <Typography className="form-label">
                    {t("settings:create_framework_popup.description")}
                  </Typography>
                  <DescriptionField
                    className={fieldState.invalid ? "error" : "input-name"}
                    onChange={field.onChange}
                    rows={5}
                    name="description"
                  />
                  {fieldState.error?.type === MAXLENGTH && (
                    <AnswerLengthErrorMessage />
                  )}
                </Box>
              )}
            />
            <Typography className="form-label">
              1. Download the&nbsp;
              <span
                role="presentation"
                onClick={handleDownloadFile}
                onKeyDown={handleDownloadFile}
              >
                Framework template
              </span>
              &nbsp;and fill in yourframework details.
            </Typography>
            <Typography className="form-label">
              {t("settings:create_framework_popup.import")}
            </Typography>
            <Button
              className="browsing-button"
              color="primary"
              variant="outlined"
            >
              {t("settings:create_framework_popup.browser_file")}
            </Button>
            <Box className="upload-wrapper">
              <img src={ExcelLogo} alt="" width={40} height={40} />
              <Box className="upload-detail">
                <Typography>Sample_file.xslx</Typography>
                <Typography>
                  {t("settings:create_framework_popup.completed")}
                </Typography>
                <Box style={{ width: "100%" }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              </Box>
            </Box>
            <Button type="submit" color="primary" variant="contained" autoFocus>
              {t("settings:create_framework_popup.submit")}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </DialogContainer>
  );
};

export default React.memo(SetUpFrameworkModal);
