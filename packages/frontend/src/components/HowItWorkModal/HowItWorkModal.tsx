import React from "react";
import { useTranslation } from "react-i18next";
import { DialogContent, List } from "@material-ui/core";
import Text from "../Text";

import {
  HowItWorkDialog,
  OrderedItemText,
  StoreButton,
  TryButton,
  XIcon,
} from "./styles";

interface HowItWorkModalProps {
  open: boolean;
  setIsHowItWorkModalOpen: (open: boolean) => void;
}

const HowItWorkModal = (props: HowItWorkModalProps) => {
  const { t } = useTranslation();

  return (
    <HowItWorkDialog open={props.open} maxWidth={false}>
      <XIcon onClick={() => props.setIsHowItWorkModalOpen(false)} />
      <DialogContent>
        <Text $size="lg" $weight="bold">
          {t("plugin:how_it_works_popup.how_it_works")}
        </Text>
        <Text $size="md" $weight="bold" style={{ marginTop: 8 }}>
          {t("plugin:how_it_works_popup.the_ANAFES_web_plugin")}
        </Text>
        <List component="ol" style={{ marginTop: 16 }}>
          <OrderedItemText>
            {t("plugin:how_it_works_popup.download_the_ANAFES_web_plugin")}
          </OrderedItemText>
          <OrderedItemText>
            {t("plugin:how_it_works_popup.go_to_the_news_article")}
          </OrderedItemText>
          <OrderedItemText>
            {t("plugin:how_it_works_popup.open_the_ANAFES_web_plugin")}
          </OrderedItemText>
          <OrderedItemText>
            {t("plugin:how_it_works_popup.tag_the_article")}
          </OrderedItemText>
          <OrderedItemText>
            {t("plugin:how_it_works_popup.score_the_article")}
          </OrderedItemText>
        </List>

        <TryButton
          variant="contained"
          color="primary"
          style={{ marginTop: 8 }}
          onClick={() =>
            window
              .open(process.env.REACT_APP_EXTENSION_SOURCE_LINK, "_blank")
              .focus()
          }
        >
          {t("plugin:how_it_works_popup.try_it_now")}
        </TryButton>
        <Text $size="md" style={{ marginTop: 24 }}>
          {t("plugin:how_it_works_popup.no_firewall")}
        </Text>
        <StoreButton
          variant="text"
          color="primary"
          onClick={() =>
            window.open(process.env.REACT_APP_EXTENSION_LINK, "_blank").focus()
          }
          style={{ marginTop: 16 }}
        >
          {t("plugin:how_it_works_popup.go_to_store")}
        </StoreButton>
      </DialogContent>
    </HowItWorkDialog>
  );
};

export default React.memo(HowItWorkModal);
