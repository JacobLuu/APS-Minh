import "react-multi-carousel/lib/styles.css";

import React from "react";

import CardActionArea from "@material-ui/core/CardActionArea";

import { esg_default } from "../../../../assets/images";
import { News } from "../../../../types";
import { getDateTimeFromUnixTimestamp } from "../../../../utils/date";
import {
  CardContent,
  CardItem,
  CarouselBox,
  Image,
  NewsBox,
  PublishDate,
  Title,
} from "./styles";
import { DEFAULT_BORDER_RADIUS } from "../../../../themes/colors";

interface OverheadNewsProps {
  news: News[];
}

const OverheadNews = (props: OverheadNewsProps) => {
  const handleClickUrl = (url) => {
    window.open(url, "_blank");
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <NewsBox>
      <CarouselBox
        responsive={responsive}
        keyBoardControl
        partialVisible={false}
      >
        {props.news?.map((news) => {
          return (
            <CardItem
              style={{ borderRadius: DEFAULT_BORDER_RADIUS }}
              key={news.id}
            >
              <CardActionArea onClick={() => handleClickUrl(news.url)}>
                <div>
                  {news.stock_pictures.length > 0 ? (
                    <Image backgroundUrl={news.stock_pictures[0].s3_path} />
                  ) : (
                    <Image backgroundUrl={esg_default} />
                  )}
                  <CardContent>
                    <Title>{news.title}</Title>
                    <PublishDate>
                      {getDateTimeFromUnixTimestamp(news.published_at)}
                    </PublishDate>
                  </CardContent>
                </div>
              </CardActionArea>
            </CardItem>
          );
        })}
      </CarouselBox>
    </NewsBox>
  );
};

export default React.memo(OverheadNews);
