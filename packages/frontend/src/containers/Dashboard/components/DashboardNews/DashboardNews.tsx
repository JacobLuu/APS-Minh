import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Divider, Grid, Link, Paper, Typography } from "@material-ui/core";
import GetAppSharpIcon from "@material-ui/icons/GetAppSharp";

import { esg_default } from "../../../../assets/images";
import { LIGHT_GREEN } from "../../../../themes/colors";
import { getFromNow } from "../../../../utils/date";
import Text from "../../../../components/Text";
import { NewsImage, Title } from "./styles";

import type { News } from "../../../../types";

interface DashboardNewsProps {
  data: News[];
}

const DashboardNews = (props: DashboardNewsProps) => {
  const { t } = useTranslation();
  return (
    <Paper style={{ height: "100%" }}>
      <Box px={2} py={1.5} height="100%">
        <Text $size="md" style={{ marginBottom: "12px" }}>
          {t("plugin:dashboard_plugin_notification.latest_news")}
        </Text>
        <Box display="flex" flexDirection="column" height="98%">
          {props.data.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <Divider />
                {index === 0 && (
                  <Box
                    color="#204C74"
                    bgcolor={LIGHT_GREEN}
                    mt={1}
                    px={1}
                    py={0.25}
                    display="flex"
                    alignItems="center"
                  >
                    <GetAppSharpIcon />
                    <Typography
                      style={{ fontSize: 14, marginLeft: 6, color: "#204C74" }}
                    >
                      {t(
                        "plugin:dashboard_plugin_notification.install_our_plugin"
                      )}
                      &nbsp;
                      <Link
                        style={{ fontSize: 14, fontWeight: 600 }}
                        href={process.env.REACT_APP_EXTENSION_LINK}
                        target="_blank"
                      >
                        {t("plugin:dashboard_plugin_notification.anafes_here")}
                      </Link>
                      &nbsp;
                      {t(
                        "plugin:dashboard_plugin_notification.to_get_fully_feature"
                      )}
                    </Typography>
                  </Box>
                )}
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  height="27%"
                >
                  <Grid container style={{ margin: 0 }} wrap="nowrap">
                    <Box ml={1} mr={2} display="flex" alignItems="center">
                      {item.stock_pictures.length > 0 ? (
                        <NewsImage
                          src={item.stock_pictures[0].s3_path}
                          onClick={() => window.open(item.url, "_blank")}
                        />
                      ) : (
                        <NewsImage
                          src={esg_default}
                          onClick={() => window.open(item.url, "_blank")}
                        />
                      )}
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      height="100%"
                    >
                      <Title>
                        <Link
                          href={item.url}
                          target="_blank"
                          id={`news-link-${item.title}`}
                        >
                          {item.title}
                        </Link>
                      </Title>
                      <Text $size="xs" $weight="bold" $color="#A0A0A0">
                        {getFromNow(item.published_at)}
                      </Text>
                    </Box>
                  </Grid>
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default React.memo(DashboardNews);
