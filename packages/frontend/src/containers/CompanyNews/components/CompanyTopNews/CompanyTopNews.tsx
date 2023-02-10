import React, { useMemo } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { News } from "../../../../types";
import CarouselNewsBanner from "../CarouselNewsBanner";
import NewsBox from "../NewsBox";
import NotificationAlert from "../NotificationAlert";

interface Props {
  news: News[];
  isPluginNotificationShown: boolean;
  handleCloseNotification: () => void;
  setIsHowItWorkModalOpen: (open: boolean) => void;
}

const CompanyTopNews = (props: Props) => {
  const {
    isPluginNotificationShown,
    handleCloseNotification,
    setIsHowItWorkModalOpen,
    news,
  } = props;

  const renderedRightSideNewsCard = useMemo(() => {
    if (isPluginNotificationShown) return news.slice(5, 6);
    return news.slice(5, 7);
  }, [isPluginNotificationShown, news]);

  const renderedBottomNewsCard = useMemo(() => {
    if (isPluginNotificationShown) return news.slice(6, 9);
    return news.slice(7, 10);
  }, [isPluginNotificationShown, news]);

  return (
    <Box mt={2.5}>
      <Grid container>
        <Grid item xs={7}>
          <CarouselNewsBanner news={news.slice(0, 5)} />
        </Grid>
        <Grid item xs={5}>
          <Box
            ml={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            {isPluginNotificationShown && (
              <NotificationAlert
                handleCloseNotification={handleCloseNotification}
                setIsHowItWorkModalOpen={setIsHowItWorkModalOpen}
              />
            )}
            {renderedRightSideNewsCard.map((news) => {
              return <NewsBox news={news} shouldShowImage key={news.id} />;
            })}
          </Box>
        </Grid>
      </Grid>
      <Box mt={2.5}>
        <Grid container>
          {renderedBottomNewsCard.map((news) => {
            return (
              <Grid item xs={4} key={news.id}>
                <NewsBox news={news} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default React.memo(CompanyTopNews);
