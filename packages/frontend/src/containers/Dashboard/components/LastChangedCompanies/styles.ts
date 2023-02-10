import styled from "styled-components";

import { Container, TableHead, TableRow, Typography } from "@material-ui/core";

import {
  COLOR_BOX_SHADOW,
  DEFAULT_BORDER_RADIUS,
  TEXT_COLOR_GREY,
  WHITE,
} from "../../../../themes/colors";

interface ArrowColorProps {
  $is_arrow_up: boolean;
}

export const LastChangedCompaniesBox = styled(Container)`
  background: ${WHITE};
  width: 100%;
  padding: 10px 10px;
  overflow: hidden;
  max-width: 100%;
  min-height: 555px;
  box-shadow: ${COLOR_BOX_SHADOW};
  position: relative;
  border-radius: ${DEFAULT_BORDER_RADIUS};
`;

export const ChangedScoreBox = styled(Container)`
  background: unset;
  padding: 0;
  max-width: 100px;
  min-height: 24px;
`;

export const NumberOfChangedBox = styled(Container)`
  padding-left: 45%;
`;

export const Box = styled.div<ArrowColorProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 100px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${TEXT_COLOR_GREY};
  .text_overall_score {
    display: flex;
    align-items: center;
    width: 25px;
    justify-content: space-between;
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 20px;
    padding-left: 5px;
    color: ${(props) => (props.$is_arrow_up ? "#81BE37" : "#C62905")};
  }
  .is_arrow_up {
    width: 15px;
    stroke-width: 5px;
    font-weight: "bold";
    color: ${(props) => (props.$is_arrow_up ? "#81BE37" : "#C62905")};
    transform: rotate(${(props) => (props.$is_arrow_up ? "0deg" : "180deg")});
  }
`;

export const LinkText = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${TEXT_COLOR_GREY};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
` as typeof Typography;

export const THead = styled(TableHead)`
  .MuiTableCell-head {
    padding: 10px 10px 8px 10px;
  }
`;

export const TableRowStyle = styled(TableRow)`
  && .MuiTableCell-root {
    padding: 8px;
  }
`;
