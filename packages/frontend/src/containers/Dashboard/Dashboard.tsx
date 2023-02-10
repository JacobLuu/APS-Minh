import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Grid } from "@material-ui/core";

import { useLocation } from "react-router-dom";
import HowItWorkModal from "../../components/HowItWorkModal";
import { NEWS_PATH, RANK_PERFORMANCE_PATH } from "../../constants/paths";
import { IS_PLUGIN_NOTIFICATION_SHOWN } from "../../constants/sessionStorage";
import { getCompaniesRequested } from "../../reducers/companies";
import {
  getDashboardRequested,
  selectDashboard,
} from "../../reducers/dashboard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useExtensionInstalled } from "../../utils/extension";
import CompanyRankingView from "../CompanyRankingView";
import DashboardChart from "./components/DashboardChart";
import ESGResearchProgress from "./components/ESGResearchProgress";
import LastChangedCompanies from "./components/LastChangedCompanies/LastChangedCompanies";
import NotificationAlert from "./components/NotificationAlert";
import OverheadNews from "./components/OverheadNews";
import {
  LinkText,
  TitleBox,
  TitleHeadText,
  ViewAllNews,
} from "./components/OverheadNews/styles";
import { DashboardContainer } from "./styles";
import { COMPANY_SEARCH_KEYWORD } from "../../constants/localStorage";

const Dashboard = () => {
  const { isPluginNotificationShown, setIsPluginNotificationShown } =
    useExtensionInstalled();
  const [isHowItWorkModalOpen, setIsHowItWorkModalOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector(selectDashboard);
  const location = useLocation();
  if (location.pathname !== RANK_PERFORMANCE_PATH)
    localStorage.setItem(COMPANY_SEARCH_KEYWORD, "");

  useEffect(() => {
    dispatch(getCompaniesRequested(String("")));
    dispatch(getDashboardRequested());
  }, []);

  const handleCloseNotification = () => {
    setIsPluginNotificationShown(false);
    sessionStorage.setItem(IS_PLUGIN_NOTIFICATION_SHOWN, "false");
  };

  return (
    <DashboardContainer maxWidth={false}>
      <Box mt={3} style={{ marginTop: 0, paddingTop: "24px" }}>
        <TitleBox>
          <TitleHeadText>
            {t("plugin:dashboard_plugin_notification.latest_news")}
          </TitleHeadText>
          <ViewAllNews to={NEWS_PATH}>
            <LinkText>
              {t("plugin:dashboard_plugin_notification.view_all")}
            </LinkText>
          </ViewAllNews>
        </TitleBox>
        {isPluginNotificationShown && (
          <NotificationAlert
            handleCloseNotification={handleCloseNotification}
            setIsHowItWorkModalOpen={setIsHowItWorkModalOpen}
          />
        )}
        <OverheadNews news={dashboardState.overhead_news} />
      </Box>

      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <LastChangedCompanies />
          </Grid>
          <Grid item xs={12} lg={4}>
            <ESGResearchProgress />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <CompanyRankingView />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <DashboardChart />
          </Grid>
        </Grid>
      </Box>

      {isHowItWorkModalOpen && (
        <HowItWorkModal
          open={isHowItWorkModalOpen}
          setIsHowItWorkModalOpen={setIsHowItWorkModalOpen}
        />
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
