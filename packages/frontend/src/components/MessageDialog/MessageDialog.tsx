import React from "react";
import { useTranslation } from "react-i18next";
import { DialogContent, DialogActions, Box } from "@material-ui/core";
import { DialogContainer, OKButton, CancelButton, BoldText } from "./styles";

interface Props {
  open: boolean;
  child: any;
  handleOKButton: Function;
  showCancelButton: boolean;
  handleCancelButton?: Function;
}

const MessageDialog = (props: Props) => {
  const { t } = useTranslation();
  const onClickOKButton = () => {
    props.handleOKButton();
  };
  const onClickCancelButton = () => {
    if (props.handleCancelButton) {
      props.handleCancelButton();
    }
  };

  return (
    <DialogContainer open={props.open}>
      <DialogContent>
        <Box mx={4} mt={2}>
          {props.child}
        </Box>
      </DialogContent>
      <Box mb={4.5} mr={2}>
        <DialogActions>
          <OKButton onClick={onClickOKButton}>
            <BoldText>{t("settings:popup_message_to_confirm.ok")}</BoldText>
          </OKButton>
          {props.showCancelButton ? (
            <CancelButton onClick={onClickCancelButton}>
              <BoldText textColor="#7A99F8">
                {t("settings:popup_message_to_confirm.cancel")}
              </BoldText>
            </CancelButton>
          ) : null}
        </DialogActions>
      </Box>
    </DialogContainer>
  );
};

MessageDialog.defaultProps = {
  handleCancelButton: null,
};

export default React.memo(MessageDialog);
