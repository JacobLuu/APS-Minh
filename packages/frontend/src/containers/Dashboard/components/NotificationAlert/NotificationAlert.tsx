import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";

import { LIGHT_GREEN } from "../../../../themes/colors";
import { isFromChina } from "../../../../utils/status";
import {
  DownloadButton,
  HowButton,
  NotificationAlertContainer,
  NotificationText,
  XIcon,
} from "./styles";

interface NotificationAlertProps {
  handleCloseNotification: () => void;
  setIsHowItWorkModalOpen: (open: boolean) => void;
}

const NotificationAlert = (props: NotificationAlertProps) => {
  const { handleCloseNotification, setIsHowItWorkModalOpen } = props;

  const { t } = useTranslation();

  const handleDownloadExtension = useCallback(() => {
    if (isFromChina()) {
      window
        .open(process.env.REACT_APP_EXTENSION_SOURCE_LINK, "_blank")
        .focus();
    } else {
      window.open(process.env.REACT_APP_EXTENSION_LINK, "_blank").focus();
    }
  }, []);

  return (
    <NotificationAlertContainer
      height={60}
      mt={1}
      mb={2}
      px={2}
      py={1}
      display="flex"
      justifyContent="space-between"
      style={{ backgroundColor: LIGHT_GREEN }}
    >
      <Box display="flex" alignItems="center">
        <XIcon onClick={() => handleCloseNotification()} />
        <NotificationText style={{ margin: "0 8px" }}>
          {t("plugin:dashboard_plugin_notification.download_the_ANAFES")}
        </NotificationText>
      </Box>
      <Box display="flex" alignItems="center">
        <DownloadButton
          variant="contained"
          color="primary"
          onClick={() => handleDownloadExtension()}
        >
          {t("plugin:dashboard_plugin_notification.download_now")}
        </DownloadButton>
        <HowButton
          variant="text"
          color="primary"
          onClick={() => setIsHowItWorkModalOpen(true)}
        >
          {t("plugin:dashboard_plugin_notification.how_it_works")}
        </HowButton>
      </Box>
    </NotificationAlertContainer>
  );
};

export default React.memo(NotificationAlert);
