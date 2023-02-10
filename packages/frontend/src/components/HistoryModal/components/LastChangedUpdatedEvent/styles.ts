import styled from "styled-components";

import { Grid, Typography } from "@material-ui/core";

import { TEXT_COLOR_GREY } from "../../../../themes/colors";

export const Box = styled.div`
  display: flex;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${TEXT_COLOR_GREY};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const HighLightText = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  height: fit-content;
  color: ${(props) => props.color};
`;

export const SmallText = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  height: fit-content;
` as typeof Typography;

export const GridItem = styled(Grid)``;
