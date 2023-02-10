import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";

import { Tabs } from "@material-ui/core";
import { TabContext } from "@material-ui/lab";

import { COLOR_PRIMARY } from "../../themes/colors";
import { useSelectedTab } from "../../utils/customHooks";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import LoginForm from "./components/LoginForm";
import {
  Box,
  FormContainer,
  LoginContainer,
  LoginTab,
  LoginTabPanel,
} from "./styles";

enum LoginTabValue {
  Login = 1,
}

const Login = () => {
  const { selectedTab, handleChangeTab } = useSelectedTab(
    String(LoginTabValue.Login)
  );
  const [loginFormShown, setLoginFormShown] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <LoadingOverlay
      style={{ backgroundColor: "#FFFFFF" }}
      active={false}
      spinner
    >
      <LoginContainer maxWidth={false}>
        <Box>
          <FormContainer>
            <TabContext value={selectedTab}>
              <Tabs
                TabIndicatorProps={{
                  style: {
                    background: COLOR_PRIMARY,
                    height: 6,
                    borderRadius: 10,
                  },
                }}
                value={selectedTab}
                onChange={handleChangeTab}
                aria-label="tabs"
              >
                <LoginTab
                  $active={selectedTab === `${LoginTabValue.Login}`}
                  label={t("login:login.login")}
                  value={`${LoginTabValue.Login}`}
                />
              </Tabs>

              <LoginTabPanel value={`${LoginTabValue.Login}`}>
                {loginFormShown ? (
                  <LoginForm setLoginFormShown={setLoginFormShown} />
                ) : (
                  <ForgetPasswordForm setLoginFormShown={setLoginFormShown} />
                )}
              </LoginTabPanel>
            </TabContext>
          </FormContainer>
        </Box>
      </LoginContainer>
    </LoadingOverlay>
  );
};

export default React.memo(Login);
