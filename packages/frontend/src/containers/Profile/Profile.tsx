import React from "react";
import { useTranslation } from "react-i18next";

import Tabs from "@material-ui/core/Tabs";
import { TabContext } from "@material-ui/lab";

import { useLocation } from "react-router-dom";
import { selectUser } from "../../reducers/user";
import { useAppSelector } from "../../store/hooks";
import { COLOR_PRIMARY } from "../../themes/colors";
import { useSelectedTab } from "../../utils/customHooks";
import ProfileDetails from "./components/ProfileDetails";
import ProfileMaintenance from "./components/ProfileMaintenance";
import ProfileTeam from "./components/ProfileTeam";
import { ProfileContainer, ProfileTab, ProfileTabPanel } from "./styles";
import { UserRoleType } from "../../constants/enums";
import { RANK_PERFORMANCE_PATH } from "../../constants/paths";
import { COMPANY_SEARCH_KEYWORD } from "../../constants/localStorage";

enum ProfileTabValue {
  Details = 1,
  Team = 2,
  Maintenance = 3,
}

const Profile = () => {
  const { selectedTab, handleChangeTab } = useSelectedTab(
    String(ProfileTabValue.Details)
  );
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const location = useLocation();
  if (location.pathname !== RANK_PERFORMANCE_PATH)
    localStorage.setItem(COMPANY_SEARCH_KEYWORD, "");

  const isAllowedMaintenance =
    user.email_address.includes("@off function now") &&
    user.role === UserRoleType.admin;
  return (
    <ProfileContainer maxWidth={false}>
      <TabContext value={selectedTab}>
        <Tabs
          TabIndicatorProps={{
            style: { background: COLOR_PRIMARY, height: 6, borderRadius: 10 },
          }}
          value={selectedTab}
          onChange={handleChangeTab}
          aria-label="tabs"
        >
          <ProfileTab
            $active={selectedTab === `${ProfileTabValue.Details}`}
            label={t("profile:my_details.my_details")}
            value={`${ProfileTabValue.Details}`}
          />
          <ProfileTab
            $active={selectedTab === `${ProfileTabValue.Team}`}
            label={t("profile:my_team.my_team")}
            value={`${ProfileTabValue.Team}`}
          />
          {isAllowedMaintenance && (
            <ProfileTab
              $active={selectedTab === `${ProfileTabValue.Maintenance}`}
              label={`${ProfileTabValue[ProfileTabValue.Maintenance]}`}
              value={`${ProfileTabValue.Maintenance}`}
            />
          )}
        </Tabs>

        <ProfileTabPanel
          value={`${ProfileTabValue.Details}`}
          style={{ marginTop: "0px" }}
        >
          <ProfileDetails />
        </ProfileTabPanel>
        <ProfileTabPanel
          value={`${ProfileTabValue.Team}`}
          style={{ marginTop: "0px" }}
        >
          <ProfileTeam />
        </ProfileTabPanel>
        {isAllowedMaintenance && (
          <ProfileTabPanel
            value={`${ProfileTabValue.Maintenance}`}
            style={{ marginTop: "0px" }}
          >
            <ProfileMaintenance />
          </ProfileTabPanel>
        )}
      </TabContext>
    </ProfileContainer>
  );
};

export default Profile;
