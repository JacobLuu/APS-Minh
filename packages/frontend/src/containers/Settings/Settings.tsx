import React from "react";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";

import { useLocation } from "react-router-dom";
import { useSelectedTab } from "../../utils/customHooks";
import FrameworkSettings from "./components/FrameworkSettings/index";
import LanguageSettings from "./components/LanguageSettings";
import { SettingsContainer, SettingsTab, TabContainer } from "./styles";
import { RANK_PERFORMANCE_PATH } from "../../constants/paths";
import { COMPANY_SEARCH_KEYWORD } from "../../constants/localStorage";

enum SettingsTabValue {
  Framework = 1,
  Language = 2,
}

const Settings = () => {
  const { selectedTab, handleChangeTab } = useSelectedTab(
    String(SettingsTabValue.Framework)
  );
  const { t } = useTranslation();
  const location = useLocation();
  if (location.pathname !== RANK_PERFORMANCE_PATH)
    localStorage.setItem(COMPANY_SEARCH_KEYWORD, "");
  return (
    <SettingsContainer maxWidth={false}>
      <Box pt={2.5}>
        <TabContext value={selectedTab}>
          <TabContainer
            TabIndicatorProps={{ style: { display: "none" } }}
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label="tabs"
          >
            <SettingsTab
              $active={selectedTab === `${SettingsTabValue.Framework}`}
              label={t("settings:language.framework")}
              value={`${SettingsTabValue.Framework}`}
              style={{ width: "100px" }}
            />
            <SettingsTab
              $active={selectedTab === `${SettingsTabValue.Language}`}
              label={t("settings:language.language")}
              value={`${SettingsTabValue.Language}`}
            />
          </TabContainer>

          <TabPanel
            value={`${SettingsTabValue.Framework}`}
            style={{ padding: "0 0" }}
          >
            <FrameworkSettings />
          </TabPanel>

          <TabPanel
            value={`${SettingsTabValue.Language}`}
            style={{ padding: "0 0", height: "calc(100% - 48px)" }}
          >
            <LanguageSettings />
          </TabPanel>
        </TabContext>
      </Box>
    </SettingsContainer>
  );
};

export default React.memo(Settings);
