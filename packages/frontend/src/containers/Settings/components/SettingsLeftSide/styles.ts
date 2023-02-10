import styled from "styled-components";

import { Grid, TableCell, TableRow } from "@material-ui/core";

import { HEADER_HEIGHT } from "../../../../constants/size";
import { WHITE } from "../../../../themes/colors";

export const Container = styled(Grid)`
  background-color: ${WHITE};
  // 64 = total margin of Box tag
  // 54 = height of Title + height of Description
  min-height: calc(100vh - ${HEADER_HEIGHT + 64 + 55}px);
  max-height: 100vh;
  border-right: 1px solid #d8d8d8;
  border-radius: 5px 0 0 5px;
  overflow: auto;
`;

export const WhatToMeasureRow = styled(TableRow)`
  div[class^="MuiBox-root"] {
    padding-top: 0;
    padding-left: 76px;
    padding-bottom: 12px;
  }
`;

export const Cell = styled(TableCell)`
  position: relative;
  border-bottom: none;
  padding: 0;
`;

export const SelectableCell = styled(Cell)<{ selected: boolean }>`
  display: block;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#D4DEFD" : "inherit")};
  border-radius: 5px;
`;

export const CollapseIconButton = styled.div`
  position: absolute;
  top: 14px;
  left: 30px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
