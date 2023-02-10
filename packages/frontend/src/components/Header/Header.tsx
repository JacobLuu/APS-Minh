import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import {
  logo,
  logoNexus,
  faviconNexus,
  faviconAnafes,
} from "../../assets/images";
import {
  ACCESS_TOKEN,
  COMPANY_SEARCH_KEYWORD,
} from "../../constants/localStorage";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  RESET_PASSWORD_PATH,
  RANK_PERFORMANCE_PATH,
  SETTINGS_PATH,
} from "../../constants/paths";
import CompanySearch from "../../containers/Dashboard/components/CompanySearch";
import { selectCompanies } from "../../reducers/companies";
import { selectSharedState } from "../../reducers/shared";
import {
  logout as logoutAction,
  selectUser,
  verifyRequested as verifyRequestedAction,
} from "../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LoginStatus } from "../../types";
import {
  Container,
  MenuDivider,
  MenuItem,
  Title,
  UserInformationContainer,
} from "./styles";
import { organization1 } from "../../constants/framework";
import { toast } from "react-toastify";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import CustomToastContainer from "../../components/CustomToastContainer";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(selectCompanies);
  const { isTokenExpired } = useAppSelector(selectSharedState);
  const { t } = useTranslation();
  const { loginStatus, organization } = useAppSelector(selectUser);
  const hasAccessToken = localStorage.getItem(ACCESS_TOKEN);
  const [isOrg1Account, setIsOrg1Account] = useState(false);

  const changeFaviconToAnafes = (isOrg1Acc) => {
    let link = document.querySelector("link[rel~='icon']") as HTMLElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    if (isOrg1Acc) {
      link.href = faviconAnafes;
    } else {
      link.href = faviconNexus;
    }
  };

  useEffect(() => {
    if (
      !hasAccessToken ||
      loginStatus === LoginStatus.NotAuthorized ||
      location.pathname === RESET_PASSWORD_PATH
    ) {
      dispatch(logoutAction());
    } else {
      dispatch(verifyRequestedAction());
    }
  }, [hasAccessToken, location.pathname]);

  useEffect(() => {
    if (!organization || organization?.name === organization1) {
      setIsOrg1Account(true);
      // Change the favicon to the Nexus favicon
      changeFaviconToAnafes(false);
    } else {
      setIsOrg1Account(false);
      // Change the favicon to the ANAFES favicon
      changeFaviconToAnafes(true);
    }
  }, [organization]);

  const logout = () => {
    localStorage.setItem(COMPANY_SEARCH_KEYWORD, "");
    dispatch(logoutAction());
    history.push(LOGIN_PATH);
    changeFaviconToAnafes(false);
    setIsOrg1Account(true);
  };

  const handleClickHeader = () => {
    if (hasAccessToken) {
      history.push(DASHBOARD_PATH);
    } else {
      history.push(LOGIN_PATH);
    }
  };

  React.useEffect(() => {
    if (isTokenExpired) {
      localStorage.removeItem(ACCESS_TOKEN);
      toast(
        <CustomToastContainer
          Icon={<PriorityHighIcon />}
          title={"Session expired"}
          message={"Please log in again"}
        />,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
      history.push(LOGIN_PATH);
    }
  }, [isTokenExpired]);

  return (
    <Container>
      <Title onClick={handleClickHeader}>
        {isOrg1Account || !organization ? (
          <img src={logoNexus} alt="Logo of Nexus" className="logo_nexus" />
        ) : (
          <img src={logo} alt="Logo of ANAFES" />
        )}
      </Title>
      {hasAccessToken && location.pathname !== RESET_PASSWORD_PATH && (
        <UserInformationContainer>
          <CompanySearch companies={list} />
          <MenuItem
            $isActive={location.pathname === DASHBOARD_PATH}
            onClick={() => history.push(DASHBOARD_PATH)}
          >
            {t("login:dashboard_header.dashboard")}
          </MenuItem>
          <MenuDivider orientation="vertical" />
          <MenuItem
            $isActive={location.pathname === RANK_PERFORMANCE_PATH}
            onClick={() => history.push(RANK_PERFORMANCE_PATH)}
          >
            {t("login:dashboard_header.rank_performance")}
          </MenuItem>
          <MenuDivider orientation="vertical" />
          <MenuItem
            $isActive={location.pathname === SETTINGS_PATH}
            onClick={() => history.push(SETTINGS_PATH)}
          >
            {t("login:dashboard_header.settings")}
          </MenuItem>
          <MenuDivider orientation="vertical" />
          <MenuItem
            $isActive={location.pathname === PROFILE_PATH}
            onClick={() => history.push(PROFILE_PATH)}
          >
            {t("login:dashboard_header.profile")}
          </MenuItem>
          <MenuDivider orientation="vertical" />
          <MenuItem onClick={() => logout()}>
            {t("login:dashboard_header.logout")}
          </MenuItem>
        </UserInformationContainer>
      )}
    </Container>
  );
};

export default React.memo(Header);
