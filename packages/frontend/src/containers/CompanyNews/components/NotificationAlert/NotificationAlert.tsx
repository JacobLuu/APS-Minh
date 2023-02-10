import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";

import { COLOR_BOX_SHADOW, LIGHT_GREEN } from "../../../../themes/colors";
import { isFromChina } from "../../../../utils/status";
import {
  DownloadButton,
  HowButton,
  NotificationAlertContainer,
  NotificationText,
  XIcon,
} from "./styles";

interface Props {
  handleCloseNotification: () => void;
  setIsHowItWorkModalOpen: (open: boolean) => void;
}

const NotificationAlert = (props: Props) => {
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
      px={2}
      py={1}
      style={{ backgroundColor: LIGHT_GREEN, boxShadow: `${COLOR_BOX_SHADOW}` }}
    >
      <XIcon onClick={() => handleCloseNotification()} />
      <NotificationText style={{ fontWeight: 600 }}>
        {t("plugin:news_screen_plugin_notification.download_the_ANAFES")}
      </NotificationText>
      <NotificationText
        style={{ textOverflow: "ellipsis", overflow: "hidden" }}
      >
        {t("plugin:news_screen_plugin_notification.when_browsing")}
      </NotificationText>
      <Box mt={1}>
        <DownloadButton
          variant="contained"
          color="primary"
          onClick={() => handleDownloadExtension()}
        >
          {t("plugin:news_screen_plugin_notification.download_now")}
        </DownloadButton>
        <HowButton
          variant="text"
          color="primary"
          onClick={() => setIsHowItWorkModalOpen(true)}
        >
          {t("plugin:news_screen_plugin_notification.how_it_works")}
        </HowButton>
      </Box>
    </NotificationAlertContainer>
  );
};

export default React.memo(NotificationAlert);
