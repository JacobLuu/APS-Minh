import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container, Typography } from "@material-ui/core";

import {
  COLOR_PRIMARY,
  TEXT_COLOR_DARKER_GREY,
} from "../../../../themes/colors";

interface ValueProps {
  $isLinkColor?: boolean;
}

export const DraggableContainer = styled(Container)`
  width: auto;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4ff;
  margin: 10px;
  &.company__single__static {
    //use important because styles of lib inject inline style to this class
    transform: none !important;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const Text = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  color: ${TEXT_COLOR_DARKER_GREY};
`;

export const Value = styled(Typography)<ValueProps>`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) =>
    props.$isLinkColor ? COLOR_PRIMARY : TEXT_COLOR_DARKER_GREY};
`;

export const LinkText = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  color: ${COLOR_PRIMARY};
`;

export const LinkTextColor = styled(Link)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR_PRIMARY};
`;
