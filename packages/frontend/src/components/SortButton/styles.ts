import styled from "styled-components";

import Box from "@material-ui/core/Box";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export const ArrowBox = styled(Box)`
  width: 9px;
  height: 12px;
  display: flex;
  position: relative;
`;
export const ArrowDown = styled(ArrowDropDownIcon)`
  position: absolute;
  cursor: pointer;
  top: 0px;
  left: 0px;
`;
export const ArrowUp = styled(ArrowDropUpIcon)`
  position: absolute;
  cursor: pointer;
  top: -7px;
  left: 0px;
`;
