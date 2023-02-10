import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

import { esg_default } from "../../../../assets/images";
import Text from "../../../../components/Text";
import { COMPANY_NEWS_PATH } from "../../../../constants/paths";
import {
  getNewsRequested,
  selectNews,
  getMockNewsRequested,
} from "../../../../reducers/news";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { COLOR_PRIMARY, WHITE } from "../../../../themes/colors";
import { RequestStates } from "../../../../types/request";
import { getFormattedDate } from "../../../../utils/date";

import type { News as NewsType } from "../../../../types";
import { listMockedCompanyId } from "../../../CompanyNews/components/CompanyNewsDetail/CompanyNewsDetail";

interface NewsProps {
  news: NewsType;
}

const NewsSkeleton = () => {
  return (
    <Box my={2} display="flex">
      <Box width="20%">
        <Skeleton variant="rect" height={60} width={60} />
      </Box>
      <Box width="80%">
        <Skeleton variant="rect" width="100%" height="100%" />
      </Box>
    </Box>
  );
};

const News = (props: NewsProps) => {
  const { news } = props;

  const handleClickUrl = () => {
    window.open(news.url, "_blank");
  };

  return (
    <Box my={2} display="flex">
      <Box
        display="flex"
        alignItems="center"
        mr={2}
        style={{ cursor: "pointer" }}
        onClick={handleClickUrl}
      >
        <img
          src={
            news.stock_pictures.length > 0 &&
            news.stock_pictures[0]?.s3_path.length > 0
              ? news.stock_pictures[0]?.s3_path
              : esg_default
          }
          height="60"
          width="60"
          alt="news"
        />
      </Box>

      <Box width="80%">
        <Box style={{ cursor: "pointer" }}>
          <Typography
            style={{
              fontSize: 16,
              fontWeight: 600,
              width: "100%",
              overflow: "hidden",
              lineHeight: "1.5em",
              height: "3em",
            }}
            onClick={handleClickUrl}
          >
            {news.title}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text $size="xs">{news?.source_name}</Text>
          <Text $size="xs">{getFormattedDate(news.published_at, "Today")}</Text>
        </Box>
      </Box>
    </Box>
  );
};

const CompanyNews = () => {
  const { news, requestState } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const params = useParams<{ companyId: string }>();

  useEffect(() => {
    if (listMockedCompanyId.includes(+params.companyId)) {
      dispatch(getMockNewsRequested(+params.companyId));
    } else {
      dispatch(
        getNewsRequested({
          companyId: Number(params.companyId),
          offset: 0,
          limit: 5,
        })
      );
    }
  }, [params.companyId]);

  return (
    <Box
      px={3}
      py={2}
      height="100%"
      bgcolor={WHITE}
      borderRadius={8}
      position="relative"
    >
      <Box>
        <Text $size="lg" $weight="bold">
          {t("company:latest_news.latest_news")}
        </Text>
      </Box>

      <Box>
        {requestState === RequestStates.Initial
          ? [1, 2, 3, 4].map((item) => <NewsSkeleton key={item} />)
          : news.map((news_item) => (
              <News key={news_item.id} news={news_item} />
            ))}
      </Box>

      <Box top={16} right={16} position="absolute">
        <Link to={COMPANY_NEWS_PATH.replace(":companyId", params.companyId)}>
          <Text $weight="bold" $color={COLOR_PRIMARY} $hasCursor>
            {t("company:latest_news.view_all")}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default React.memo(CompanyNews);
