import React from "react";
import Carousel from "react-material-ui-carousel";

import { Card } from "@material-ui/core";

import { esg_default } from "../../../../assets/images";
import Text from "../../../../components/Text";
import { WHITE } from "../../../../themes/colors";
import { News } from "../../../../types";
import { getFromNow } from "../../../../utils/date";
import {
  CarouselImage,
  CarouselLayout,
  NewsTitle,
  NewsTitleBox,
} from "./styles";

interface Props {
  news: News[];
}

const CarouselNewsBanner = (props: Props) => {
  const handleClickUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Carousel
      indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "20px",
        },
      }}
      indicatorIconButtonProps={{
        style: {
          color: WHITE,
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: `${WHITE}`,
          outline: "solid 1px #FFFFFF",
          outlineOffset: "-2px",
        },
      }}
    >
      {props.news.map((news) => {
        return (
          <Card key={news.id}>
            <CarouselLayout onClick={() => handleClickUrl(news.url)}>
              {news.stock_pictures.length > 0 ? (
                <CarouselImage image={news.stock_pictures[0].s3_path} />
              ) : (
                <CarouselImage image={esg_default} />
              )}
              <NewsTitleBox mx={2}>
                <Text $size="sm">{getFromNow(news.published_at)}</Text>
                <NewsTitle>{news.title}</NewsTitle>
              </NewsTitleBox>
            </CarouselLayout>
          </Card>
        );
      })}
    </Carousel>
  );
};

export default React.memo(CarouselNewsBanner);
