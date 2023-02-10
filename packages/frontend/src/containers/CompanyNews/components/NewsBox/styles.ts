import styled from "styled-components";

import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import {
  COLOR_BOX_SHADOW,
  COLOR_TEXT_PRIMARY,
  FRAME_BACKGROUND,
} from "../../../../themes/colors";

export const Container = styled(Box)`
  cursor: pointer;
  box-shadow: ${COLOR_BOX_SHADOW};
  display: flex;
  &:hover {
    background-color: ${FRAME_BACKGROUND};
  }
`;

export const NewsTitle = styled(Typography)`
  color: ${COLOR_TEXT_PRIMARY};
  font-weight: 600;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.25rem;
  line-height: 1.5rem;
` as typeof Typography;

export const NewsImage = styled(CardMedia)`
  width: 122px;
  height: 122px;
`;
