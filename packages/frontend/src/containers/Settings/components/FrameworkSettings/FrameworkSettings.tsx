import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import SetUpFrameworkModal from "../SetUpFrameworkModal";
import Container from "./styles";
import { CustomFramework } from "../../../../types/settings";
import { SELECTED_FRAMEWORK } from "../../../../constants/enums";
import FrameworkSettingsReview from "../../../FrameworkSettingsReview";

const FrameworkSettings = () => {
  const { t } = useTranslation();
  const [frameworkSelected, setFrameworkSelected] = useState<string>("");
  const [isSetUpFrameworkOpen, setIsSetUpFrameworkOpen] = useState(false);
  const [frameworkApplied, setFrameworkApplied] = useState<string>(
    SELECTED_FRAMEWORK.GRI
  );
  const [isAlreadyUploaded, setIsAlreadyUploaded] = useState(false);
  const defaultCustomFrameworkName = t(
    "settings:custom_framework.custom_framework"
  );
  const defaultCustomFrameworkDescription = t(
    "settings:custom_framework.if_you_have"
  );
  const [isOnFrameworkReview, setIsOnFrameworkReview] =
    useState<boolean>(false);
  const [customFrameworkInfo, setCustomFrameworkInfo] =
    useState<CustomFramework>({
      name: defaultCustomFrameworkName,
      description: defaultCustomFrameworkDescription,
    });

  const handleOpenModal = () => {
    setIsSetUpFrameworkOpen(true);
  };

  const handleCloseModal = () => {
    setIsSetUpFrameworkOpen(false);
  };

  const handleApplyFramework = (selectedFramework: string) => {
    setFrameworkApplied(selectedFramework);
  };

  const UploadNewFramework = () => (
    <Container>
      <Typography className="language-setting-title">
        {t("settings:framework_view_mode.if_you_have")}
      </Typography>
      <div className="frameworks-wrapper">
        <div
          role="presentation"
          className={
            frameworkSelected === SELECTED_FRAMEWORK.GRI
              ? "framework-container-selected"
              : "framework-container"
          }
          onClick={() => setFrameworkSelected(SELECTED_FRAMEWORK.GRI)}
          onKeyDown={() => setFrameworkSelected(SELECTED_FRAMEWORK.GRI)}
        >
          <div className="framework-inner">
            <div className="name">
              <div>{t("settings:gri_standards.gri_standards")}</div>
              <div>{t("settings:gri_standards.default")}</div>
            </div>
            <p className="content">
              {t("settings:gri_standards.the_gri_standards_represent")}
            </p>
            <Button
              className={
                frameworkApplied === SELECTED_FRAMEWORK.GRI
                  ? "applied-button"
                  : ""
              }
              onClick={() => handleApplyFramework(SELECTED_FRAMEWORK.GRI)}
              onKeyDown={() => handleApplyFramework(SELECTED_FRAMEWORK.GRI)}
            >
              {frameworkApplied === SELECTED_FRAMEWORK.GRI
                ? t("settings:gri_standards.applied")
                : t("settings:gri_standards.apply")}
            </Button>
          </div>
        </div>
        <div
          role="presentation"
          className={
            frameworkSelected === SELECTED_FRAMEWORK.CUSTOM
              ? "framework-container-selected"
              : "framework-container"
          }
          onClick={() => setFrameworkSelected(SELECTED_FRAMEWORK.CUSTOM)}
          onKeyDown={() => setFrameworkSelected(SELECTED_FRAMEWORK.CUSTOM)}
        >
          <div className="framework-inner">
            <div className="name">{customFrameworkInfo.name}</div>
            <p className="content">{customFrameworkInfo.description}</p>
            {isAlreadyUploaded ? (
              <div className="buttons-wrapper">
                <Button
                  className={
                    frameworkApplied === SELECTED_FRAMEWORK.CUSTOM
                      ? "applied-button"
                      : ""
                  }
                  onClick={() =>
                    handleApplyFramework(SELECTED_FRAMEWORK.CUSTOM)
                  }
                >
                  {frameworkApplied === SELECTED_FRAMEWORK.CUSTOM
                    ? t("settings:custom_framework.applied")
                    : t("settings:custom_framework.apply")}
                </Button>
                <Button
                  className="edit-button"
                  onClick={() => setIsOnFrameworkReview(true)}
                >
                  {t("settings:custom_framework.edit_setting")}
                </Button>
              </div>
            ) : (
              <Button onClick={handleOpenModal}>
                {t("settings:custom_framework.create")}
              </Button>
            )}
          </div>
        </div>
      </div>
      <SetUpFrameworkModal
        isOpenDialog={isSetUpFrameworkOpen}
        setIsAlreadyUploaded={setIsAlreadyUploaded}
        setCustomFrameworkInfo={setCustomFrameworkInfo}
        handleClose={handleCloseModal}
      />
    </Container>
  );

  return (
    <>
      {!isOnFrameworkReview ? (
        <UploadNewFramework />
      ) : (
        <FrameworkSettingsReview />
      )}
    </>
  );
};

export default React.memo(FrameworkSettings);
