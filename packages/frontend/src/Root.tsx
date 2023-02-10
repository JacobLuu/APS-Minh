import "@fontsource/source-sans-pro";
import "@fontsource/source-sans-pro/600.css";
import "react-toastify/dist/ReactToastify.css";

import React, { lazy } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { zhCN } from "@material-ui/core/locale";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";

import ProtectedRoute from "./components/ProtectedRoute";
import SuspendLoadingOverlay from "./components/SuspendLoadingOverlay";
import { Language } from "./constants/enums";
import PATHS from "./constants/paths";
import { enUS } from "./i18n/mui/enUS";
import { selectCategories } from "./reducers/settings/categories";
import { selectUser } from "./reducers/user";
import { useAppSelector } from "./store/hooks";
import useGlobalStyles from "./themes/globalStyles";
import theme from "./themes/themes";
import WrappedToastContainer from "./themes/toast";
import { useLanguage, useViewerCountry } from "./utils/customHooks";
import GetFrameworkSettingsStatus from "./utils/GetFrameworkSettingsStatus";

const Login = lazy(() => import("./containers/login"));
const Dialog = lazy(() => import("./components/Dialog"));
const Header = lazy(() => import("./components/Header"));
const Company = lazy(() => import("./containers/Company"));
const CompanyNews = lazy(() => import("./containers/CompanyNews"));
const CompanyEsgNews = lazy(() => import("./containers/CompanyEsgNews"));
const CompanyRanking = lazy(() => import("./containers/CompanyRanking"));
const CompanyRankingView = lazy(
  () => import("./containers/CompanyRankingView")
);
const Dashboard = lazy(() => import("./containers/Dashboard"));
const PrivacyPolicy = lazy(() => import("./containers/PrivacyPolicy"));
const Profile = lazy(() => import("./containers/Profile"));
const RankPerformance = lazy(() => import("./containers/RankPerformance"));
const ProfileUpdatePassword = lazy(
  () => import("./containers/ProfileUpdatePassword")
);
const ResetPassword = lazy(() => import("./containers/ResetPassword"));
const Settings = lazy(() => import("./containers/Settings"));

const Root = () => {
  const { language } = useAppSelector(selectUser);
  const { isProcessing } = useAppSelector(selectCategories);

  useViewerCountry();
  useLanguage();
  useGlobalStyles();

  const themeWithLocale = React.useMemo(() => {
    if (language === Language.chinese) {
      return Object.assign(theme, zhCN);
    }
    return Object.assign(theme, enUS);
  }, [language]);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={themeWithLocale}>
        <BrowserRouter>
          <React.Suspense fallback={<SuspendLoadingOverlay />}>
            <WrappedToastContainer />
            <Route>
              <Header />
              <GetFrameworkSettingsStatus />
              <Switch>
                <Route exact path={PATHS.LOGIN_PATH} component={Login} />
                <Route
                  exact
                  path={PATHS.RESET_PASSWORD_PATH}
                  component={ResetPassword}
                />
                <Route
                  exact
                  path={PATHS.PRIVACY_POLICY_PATH}
                  component={PrivacyPolicy}
                />
                <ProtectedRoute
                  path={PATHS.COMPANY_PATH}
                  component={Company}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.COMPANY_NEWS_PATH}
                  component={CompanyNews}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.NEWS_PATH}
                  component={CompanyNews}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.ESG_NEWS_PATH}
                  component={CompanyEsgNews}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.RANK_PERFORMANCE}
                  component={RankPerformance}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.PROFILE_PATH}
                  component={Profile}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.PROFILE_UPDATE_PASSWORD_PATH}
                  component={ProfileUpdatePassword}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.DASHBOARD_PATH}
                  component={Dashboard}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.RANK_PERFORMANCE_PATH}
                  component={CompanyRankingView}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.SETTINGS_PATH}
                  component={Settings}
                  exact
                />
                <ProtectedRoute
                  path={PATHS.COMPANY_RANKING_PATH}
                  component={CompanyRanking}
                  exact
                />
                <Route render={() => <Redirect to={PATHS.DASHBOARD_PATH} />} />
              </Switch>
              <Dialog open={isProcessing} />
            </Route>
          </React.Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
