import throttle from "lodash/throttle";
import uniqBy from "lodash/uniqBy";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import HowItWorkModal from "../../../../components/HowItWorkModal";
import Text from "../../../../components/Text";
import { DASHBOARD_PATH } from "../../../../constants/paths";
import { IS_PLUGIN_NOTIFICATION_SHOWN } from "../../../../constants/sessionStorage";
import {
  getNewsRequested,
  getMockNewsRequested,
  selectNews,
} from "../../../../reducers/news";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { DEEP_BLUE } from "../../../../themes/colors";
import { News } from "../../../../types";
import { useExtensionInstalled } from "../../../../utils/extension";
import CompanyMoreNews from "../CompanyMoreNews";
import CompanyTopNews from "../CompanyTopNews";

export const listMockedCompanyId = [509, 510, 511, 512];

const CompanyNewsDetail = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [hasMoreNews, setHasMoreNews] = useState<boolean>(false);
  const [newsContents, setNewsContents] = useState<Array<News>>([]);
  const [initialize, setInitialize] = useState<boolean>(false);
  const { isPluginNotificationShown, setIsPluginNotificationShown } =
    useExtensionInstalled();
  const [isHowItWorkModalOpen, setIsHowItWorkModalOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { t } = useTranslation();

  const { news, pagination } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();
  const query = new URLSearchParams(useLocation().search);
  const companyId = query.get("company_id");

  const handleWindowScroll = () => {
    if (hasMoreNews && !showLoading) {
      const viewHeight = window.innerHeight;
      const targetY = loaderRef.current.getBoundingClientRect().bottom;
      const isLoaderVisible = targetY <= viewHeight + 1;
      if (isLoaderVisible) {
        setShowLoading(isLoaderVisible);
      }
    }
  };

  const handleCloseNotification = () => {
    setIsPluginNotificationShown(false);
    sessionStorage.setItem(IS_PLUGIN_NOTIFICATION_SHOWN, "false");
  };

  const isMoreNewsRendered = useMemo(() => {
    if (isPluginNotificationShown) return newsContents.length > 9;
    return newsContents.length > 10;
  }, [isPluginNotificationShown, newsContents]);

  const { pathname } = useLocation();
  useEffect(() => {
    let targetSearchCompanyId;
    if (companyId) {
      targetSearchCompanyId = companyId;
    } else {
      const REGEX_COMPANY_ID = /(?<=.*?company\/)\d+/g;
      targetSearchCompanyId = REGEX_COMPANY_ID.exec(pathname)?.[0];
    }
    if (listMockedCompanyId.includes(+targetSearchCompanyId)) {
      dispatch(getMockNewsRequested(+targetSearchCompanyId));
    } else {
      dispatch(
        getNewsRequested({
          companyId: Number(targetSearchCompanyId),
          offset: 0,
          limit: 16,
        })
      );
    }
    setInitialize(true);
  }, []);

  useEffect(() => {
    const updatedNewsContents = uniqBy(newsContents.concat(news), "id");
    if (initialize) {
      if (updatedNewsContents.length < 4) {
        history.replace(DASHBOARD_PATH);
      }
    }
    setShowLoading(false);
    setHasMoreNews(pagination.total_count > updatedNewsContents.length);
    setNewsContents(updatedNewsContents);
  }, [news]);

  useEffect(() => {
    const wrappedHandler = throttle(handleWindowScroll, 1000, {
      leading: true,
      trailing: false,
    });
    window.addEventListener("wheel", wrappedHandler);
    return () => {
      window.removeEventListener("wheel", wrappedHandler);
    };
  }, [hasMoreNews]);

  useEffect(() => {
    if (showLoading) {
      const sendRequest = async () => {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
        if (listMockedCompanyId.includes(+companyId)) {
          dispatch(getMockNewsRequested(+companyId));
        } else {
          dispatch(
            getNewsRequested({
              companyId: Number(companyId),
              offset: newsContents.length,
              limit: 6,
            })
          );
        }
      };
      sendRequest();
    }
  }, [showLoading]);

  return (
    <React.Fragment>
      <Box
        mt={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text $weight="bold" $size="lg" $color={DEEP_BLUE}>
          {t("plugin:company_news_pages.latest_news")}
        </Text>
      </Box>

      <CompanyTopNews
        news={
          isPluginNotificationShown
            ? newsContents.slice(0, 9)
            : newsContents.slice(0, 10)
        }
        isPluginNotificationShown={isPluginNotificationShown}
        handleCloseNotification={handleCloseNotification}
        setIsHowItWorkModalOpen={setIsHowItWorkModalOpen}
      />

      {isMoreNewsRendered && (
        <>
          <Box mt={5}>
            <Text $weight="bold" $size="lg" $color={DEEP_BLUE}>
              {t("plugin:company_news_pages.more_news")}
            </Text>
          </Box>
          <CompanyMoreNews
            news={
              isPluginNotificationShown
                ? newsContents.slice(9)
                : newsContents.slice(10)
            }
          />
        </>
      )}

      <Grid container justifyContent="center" ref={loaderRef}>
        {showLoading && (
          <Box mt={1} mb={2}>
            <CircularProgress />
          </Box>
        )}
      </Grid>

      <HowItWorkModal
        open={isHowItWorkModalOpen}
        setIsHowItWorkModalOpen={setIsHowItWorkModalOpen}
      />
    </React.Fragment>
  );
};

export default React.memo(CompanyNewsDetail);
