import styled from "styled-components";

import Box from "@material-ui/core/Box";

import {
  STATE_ON,
  COLOR_ACTIVE_BACKGROUND,
  STATE_OFF,
  COLOR_INACTIVE_BACKGROUND,
} from "../../themes/colors";
import { ChipStatusProps } from "./ChipStatus";

export const MuiBox = styled(Box)<ChipStatusProps>`
  background-color: ${(props) =>
    props.children === "active"
      ? COLOR_ACTIVE_BACKGROUND
      : COLOR_INACTIVE_BACKGROUND};
  border-radius: 4px;
  color: ${(props) => (props.children === "active" ? STATE_ON : STATE_OFF)};
  font-weight: 500;
  font-size: 13px;
  text-transform: capitalize;
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
`;
