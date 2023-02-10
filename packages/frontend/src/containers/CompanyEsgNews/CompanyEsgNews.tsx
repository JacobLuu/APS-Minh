import throttle from "lodash/throttle";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";

import BreadcrumbsHeader from "../../components/BreadcrumbsHeader";
import HowItWorkModal from "../../components/HowItWorkModal";
import Text from "../../components/Text";
import { COMPANY_PATH, DASHBOARD_PATH } from "../../constants/paths";
import { IS_PLUGIN_NOTIFICATION_SHOWN } from "../../constants/sessionStorage";
import { getEsgNewsRequested, selectEsgNews } from "../../reducers/esg_news";
import {
  getEsgNewsFactorsRequested,
  selectEsgNewsFactors,
} from "../../reducers/esg_news_factors";
import { selectNews } from "../../reducers/news";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { COLOR_PRIMARY, DEEP_BLUE } from "../../themes/colors";
import { News } from "../../types";
import { useLabelTranslation } from "../../utils/customHooks";
import { useExtensionInstalled } from "../../utils/extension";
import { capitalizeText } from "../../utils/miscellaneous";
import CompanyMoreNews from "../CompanyNews/components/CompanyMoreNews";
import CompanyTopNews from "../CompanyNews/components/CompanyTopNews";
import {
  Container,
  FactorOptionBox,
  NewsAutocomplete,
  SearchBox,
} from "./styles";

const CompanyNews = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [hasMoreNews, setHasMoreNews] = useState<boolean>(false);
  const [newsContents, setNewsContents] = useState<Array<News>>([]);
  const [selectedEsgNewsFactorId, setSelectedEsgNewsFactorId] =
    useState<number>(null);
  const { isPluginNotificationShown, setIsPluginNotificationShown } =
    useExtensionInstalled();
  const [isHowItWorkModalOpen, setIsHowItWorkModalOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { translateCompanyName } = useLabelTranslation();

  const { company } = useAppSelector(selectNews);
  const { list: esgNewsFactors } = useAppSelector(selectEsgNewsFactors);
  const { esg_news, pagination: esg_news_pagination } =
    useAppSelector(selectEsgNews);
  const dispatch = useAppDispatch();

  const breadcrumbs = useMemo(() => {
    if (company) {
      return [
        {
          label: t("login:dashboard_header.dashboard"),
          path: DASHBOARD_PATH,
        },
        {
          label: capitalizeText(translateCompanyName(company)),
          path: COMPANY_PATH.replace(":companyId", String(company.id)),
        },
        {
          label: t("login:bread_crumb.news"),
        },
      ];
    }
    return [
      {
        label: t("login:dashboard_header.dashboard"),
        path: DASHBOARD_PATH,
      },
      {
        label: t("login:bread_crumb.news"),
      },
    ];
  }, [company]);

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

  const filterOptions = (options, state) => {
    if (state.inputValue === "") return options;

    return options.filter((option) => {
      return option.esg_news_keywords.find((keyword) =>
        keyword.name.toLowerCase().includes(state.inputValue.toLowerCase())
      );
    });
  };

  const handleChangeEsgNewsFactor = (_, value) => {
    setNewsContents([]);
    setSelectedEsgNewsFactorId(value ? value.id : null);
    dispatch(
      getEsgNewsRequested({
        esg_news_factor_id: value ? value.id : 0,
        offset: 0,
        limit: 16,
      })
    );
  };

  const isMoreNewsRendered = useMemo(() => {
    if (isPluginNotificationShown) return newsContents.length > 9;
    return newsContents.length > 10;
  }, [isPluginNotificationShown, newsContents]);

  useEffect(() => {
    dispatch(getEsgNewsFactorsRequested());
    dispatch(
      getEsgNewsRequested({
        esg_news_factor_id: selectedEsgNewsFactorId || 0,
        offset: 0,
        limit: 16,
      })
    );
  }, []);

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
        dispatch(
          getEsgNewsRequested({
            esg_news_factor_id: selectedEsgNewsFactorId || 0,
            offset: newsContents.length,
            limit: 6,
          })
        );
      };
      sendRequest();
    }
  }, [showLoading]);

  useEffect(() => {
    setShowLoading(false);
    setNewsContents((prevState) => prevState.concat(esg_news));
    setHasMoreNews(esg_news_pagination.total_count > newsContents.length);
  }, [esg_news]);

  return (
    <Container>
      <Box ml={4.5} mr={3} mb={2}>
        <BreadcrumbsHeader items={breadcrumbs} />

        <Box
          mt={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text $weight="bold" $size="lg" $color={DEEP_BLUE}>
            {t("plugin:company_news_pages.latest_news")}
          </Text>

          <NewsAutocomplete
            id="news filter"
            autoComplete
            filterOptions={filterOptions}
            options={esgNewsFactors}
            renderGroup={(params) => {
              return (
                <Box mt={params.key === 0 ? 0 : 0.75} key={params.key}>
                  <Box pl={2}>
                    <Text $weight="bold">{params.group}</Text>
                  </Box>
                  <FactorOptionBox>{params.children}</FactorOptionBox>
                </Box>
              );
            }}
            groupBy={(option) => option.esg_news_category.title}
            getOptionLabel={(option) => capitalizeText(option.title)}
            popupIcon={<SearchIcon style={{ color: `${COLOR_PRIMARY}` }} />}
            style={{ width: 300 }}
            onChange={handleChangeEsgNewsFactor}
            renderInput={(params) => (
              <SearchBox
                {...params}
                placeholder="Search Thematic Keywords"
                variant="outlined"
              />
            )}
          />
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
      </Box>

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
    </Container>
  );
};

export default React.memo(CompanyNews);
