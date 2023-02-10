import styled from "styled-components";

import { Box, CardActionArea, CardMedia, Typography } from "@material-ui/core";

export const CarouselImage = styled(CardMedia)`
  height: 322px;
  opacity: 0.3;
  display: block;
  transition: 0.5s ease;
  backface-visibility: hidden;
`;
export const CarouselLayout = styled(CardActionArea)`
  opacity: 1;
`;

export const NewsTitleBox = styled(Box)`
  position: absolute;
  top: 200px;
` as typeof Box;

export const NewsTitle = styled(Typography)`
  font-size: 1.25rem;
  line-height: 1.5rem;
  font-weight: 600;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
` as typeof Typography;
