import React from "react";

import Box from "@material-ui/core/Box";

import { esg_default } from "../../../../assets/images";
import Text from "../../../../components/Text";
import { COLOR_TEXT_SECONDARY } from "../../../../themes/colors";
import { News } from "../../../../types";
import { getFromNow } from "../../../../utils/date";
import { Container, NewsImage, NewsTitle } from "./styles";

interface Props {
  news: News;
  shouldShowImage?: boolean;
}

const NewsBox = (props: Props) => {
  const { news, shouldShowImage } = props;

  const handleClickUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container px={2}>
      <Box display="flex" alignItems="center">
        {shouldShowImage && (
          <NewsImage
            image={
              news.stock_pictures.length > 0
                ? news.stock_pictures[0].s3_path
                : esg_default
            }
          />
        )}
      </Box>
      <Box
        ml={shouldShowImage ? 2 : 0}
        py={1}
        onClick={() => handleClickUrl(news.url)}
        display="flex"
        flexDirection="column"
        height={150}
      >
        <Box>
          <Text $size="sm">{getFromNow(news.published_at)}</Text>
        </Box>
        <Box mt={1}>
          <NewsTitle>{news.title}</NewsTitle>
        </Box>
        <Box mt="auto">
          <Text $size="sm" $color={COLOR_TEXT_SECONDARY}>
            {news.source_name}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

NewsBox.defaultProps = {
  shouldShowImage: false,
};

export default React.memo(NewsBox);
