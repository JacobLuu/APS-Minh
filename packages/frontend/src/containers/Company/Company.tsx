import React, { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, useLocation } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { TabContext, TabPanel } from "@material-ui/lab";

import BreadcrumbsHeader from "../../components/BreadcrumbsHeader";
import { DASHBOARD_PATH } from "../../constants/paths";
import { notFoundStatus } from "../../constants/status";
import {
  getCompanyDetailsRequested,
  selectCompany,
} from "../../reducers/company";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLabelTranslation, useSelectedTab } from "../../utils/customHooks";
import { capitalizeText } from "../../utils/miscellaneous";
import CategoryPage from "./components/CategoryPage";
import CompanyInformation from "./components/CompanyInformation";
import CompanyNews from "./components/CompanyNews";
import CompanyNewsDetail from "../CompanyNews/components/CompanyNewsDetail";
import CompanyScore from "./components/CompanyScore";
import EsgPerformance from "./components/EsgPerformance";
import EsgProgress from "./components/EsgProgress";
import { CompanyContainer, CompanyTab, CompanyTabs } from "./styles";

enum CompanyTabEnum {
  information = "1",
  esg = "2",
  news = "3",
}

const Company = () => {
  const { t } = useTranslation();
  const tabsRef = useRef(null);
  const selectedCompany = useAppSelector(selectCompany);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const initialSelectedTab = String(CompanyTabEnum.information);
  const { selectedTab, handleChangeTab } = useSelectedTab(initialSelectedTab);
  const { translateCompanyName } = useLabelTranslation();
  const params = useParams<{ companyId: string }>();

  useEffect(() => {
    if (notFoundStatus.test(String(selectedCompany.status))) {
      history.push(DASHBOARD_PATH);
    }
  }, [selectedCompany]);

  useEffect(() => {
    dispatch(
      getCompanyDetailsRequested({
        company_id: Number(params.companyId),
        category_id: 1,
      })
    );
  }, [params.companyId]);

  const breadCrumbs = useMemo(() => {
    return [
      { path: DASHBOARD_PATH, label: t("login:dashboard_header.dashboard") },
      { label: capitalizeText(translateCompanyName(selectedCompany)) },
    ];
  }, [selectedCompany]);

  const { pathname } = useLocation();
  useEffect(() => {
    handleChangeTab(undefined, initialSelectedTab);
  }, [pathname]);

  return (
    <CompanyContainer maxWidth={false}>
      <BreadcrumbsHeader items={breadCrumbs} />

      <Box my={2}>
        <TabContext value={selectedTab}>
          <CompanyTabs
            TabIndicatorProps={{
              style: Object.assign({ display: "none" }),
            }}
            value={selectedTab}
            onChange={(e, value) => {
              handleChangeTab(e, value);
            }}
            aria-label="tabs"
            ref={tabsRef}
          >
            <CompanyTab
              $active={selectedTab === CompanyTabEnum.information}
              value={CompanyTabEnum.information}
              label="Overall Information"
            />
            <CompanyTab
              $active={selectedTab === CompanyTabEnum.esg}
              value={CompanyTabEnum.esg}
              label="ESG Score"
            />
            <CompanyTab
              $active={selectedTab === CompanyTabEnum.news}
              value={CompanyTabEnum.news}
              label="News"
            />
          </CompanyTabs>

          <TabPanel
            value={CompanyTabEnum.information}
            style={{ padding: 0, marginTop: 16 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={4}>
                    <CompanyInformation />
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <CompanyScore />
                      </Grid>
                      <Grid item xs={6}>
                        <EsgProgress />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={5}>
                    <CompanyNews />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <EsgPerformance />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel
            value={CompanyTabEnum.esg}
            style={{ padding: 0, marginTop: 16 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} lg={4}>
                <CompanyInformation />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <CompanyScore />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <EsgProgress />
              </Grid>
              <Grid item xs={12}>
                <CategoryPage />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel
            value={CompanyTabEnum.news}
            style={{ padding: 0, marginTop: 16 }}
          >
            <CompanyNewsDetail />
          </TabPanel>
        </TabContext>
      </Box>
    </CompanyContainer>
  );
};

export default Company;
