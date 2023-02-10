import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Card, Typography } from "@material-ui/core";

import {
  COLOR_BOX_SHADOW,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  WHITE,
} from "../../../../themes/colors";

interface ImageProps {
  readonly backgroundUrl: string;
}

export const CarouselBox = styled(Carousel)`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: unset;
  margin: 0 -10px;
  .react-multiple-carousel__arrow {
    background-color: ${WHITE};
    min-width: 25px;
    min-height: 25px;
    &::before {
      color: ${COLOR_PRIMARY};
      font-size: 15px;
    }
  }
  .react-multiple-carousel__arrow--right {
    right: calc(0.5% + 1px);
  }
  .react-multiple-carousel__arrow--left {
    left: calc(0.5% + 1px);
  }
`;

export const TitleHeadText = styled(Typography)`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  float: left;
`;
export const ViewAllNews = styled(Link)`
  float: right;
  text-align: right;
`;
export const LinkText = styled(Typography)`
  font-size: 16px;
  color: ${COLOR_PRIMARY};
  display: inline-block;
` as typeof Typography;

export const Title = styled(Typography)`
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: ${COLOR_TEXT_PRIMARY};
  cursor: pointer;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
`;

export const PublishDate = styled(Typography)`
  padding-top: 8px;
  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
  color: ${COLOR_TEXT_PRIMARY};
`;

export const CardItem = styled(Card)`
  margin-left: 10px;
  margin-right: 10px;
  &.MuiPaper-rounded {
    border-radius: 0;
    box-shadow: ${COLOR_BOX_SHADOW};
  }
`;

export const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 5px;
`;

export const Image = styled.div<ImageProps>`
  width: 100%;
  height: 100%;
  padding-top: 50%;
  background: url(${(props) => props.backgroundUrl}) top / cover no-repeat;
`;

export const CardContent = styled.div`
  padding: 12px 8px;
  display: flex;
  height: 80px;
  flex-direction: column;
  justify-content: space-between;
`;

export const NewsBox = styled.div``;
