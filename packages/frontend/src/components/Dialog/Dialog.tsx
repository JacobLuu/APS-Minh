import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DialogContent } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { ACCESS_TOKEN } from "../../constants/localStorage";
import { LOGIN_PATH, RESET_PASSWORD_PATH } from "../../constants/paths";
import { checkProcessStatusRequested as checkProcessStatusRequestedAction } from "../../reducers/settings/categories";
import {
  logout as logoutAction,
  selectUser,
  verifyRequested as verifyRequestedAction,
} from "../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LoginStatus } from "../../types";
import Text from "../Text";
import { Content, DialogContainer, LogoutButton } from "./styles";
import { COLOR_PRIMARY } from "../../themes/colors";

interface Props {
  open: boolean;
}

const Dialog = (props: Props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loginStatus } = useAppSelector(selectUser);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      !accessToken ||
      loginStatus === LoginStatus.NotAuthorized ||
      location.pathname === RESET_PASSWORD_PATH
    ) {
      dispatch(logoutAction());
    } else {
      dispatch(verifyRequestedAction());
    }
  }, [accessToken, location.pathname]);

  const logout = () => {
    dispatch(checkProcessStatusRequestedAction({ isTooltipStatus: false }));
    dispatch(logoutAction());
    history.push(LOGIN_PATH);
  };
  return (
    <DialogContainer open={props.open}>
      <DialogContent>
        <Content>
          <CircularProgress />
          <Text
            $size="xl"
            $weight="bold"
            $color={COLOR_PRIMARY}
            style={{
              lineHeight: "50px",
              paddingBottom: "20px",
            }}
          >
            {t("settings:upload_framework_processing.just_few_minutes")}
          </Text>
          <Text>
            {t(
              "settings:upload_framework_processing.upload_framework_description"
            )}
          </Text>
        </Content>
        <LogoutButton
          variant="contained"
          color="primary"
          onClick={() => logout()}
        >
          {t("settings:upload_framework_processing.log_out")}
        </LogoutButton>
      </DialogContent>
    </DialogContainer>
  );
};

export default React.memo(Dialog);
