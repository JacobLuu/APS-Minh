import styled from "styled-components";

import {
  Paper,
  TableBody,
  TableHead,
  TablePagination,
  Typography,
} from "@material-ui/core";

import {
  COLOR_PRIMARY,
  TABLE_BORDER_COLOR,
  TABLE_TITLE_COLOR,
  TEXT_COLOR_GREY,
} from "../../../../themes/colors";

interface TextProps {
  $color?: boolean;
}

export const ComponentContainer = styled(Paper)`
  width: 100%;
  overflow: auto;
`;

export const THead = styled(TableHead)`
  .MuiTableCell-head {
    padding: 10px;
    div {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: ${TEXT_COLOR_GREY};
    }
  }
`;

export const TBody = styled(TableBody)`
  .MuiTableCell-root {
    padding: 10px;
  }
`;

export const CommonTablePagination = styled(TablePagination)`
  border-bottom: none;
  overflow: hidden;

  .MuiSelect-selectMenu {
    border: 1px solid ${TABLE_BORDER_COLOR};
    padding-right: 36px;
  }
  .MuiTablePagination-toolbar {
    padding-left: 0;
  }
` as typeof TablePagination;

export const Title = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  padding-left: 16px;
` as typeof Typography;

export const SubTitle = styled(Typography)`
  font-size: 12px;
  font-weight: 600;
  padding-left: 16px;
` as typeof Typography;

export const BoldText = styled(Typography)`
  color: ${TABLE_TITLE_COLOR};
  font-size: 14px;
  font-weight: 600;
` as typeof Typography;

export const Text = styled(Typography)<TextProps>`
  color: ${(props) => props.$color && "#F60101"};
  font-size: 12px;
` as typeof Typography;

export const LinkText = styled(Typography)`
  font-size: 14px;
  text-transform: uppercase;
  min-width: 220px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  color: ${COLOR_PRIMARY};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
` as typeof Typography;

interface BlueBarProps {
  $value: number;
}

export const BlueBar = styled.span<BlueBarProps>`
  display: inline-block;
  width: 200px;
  width: ${(props) => `${props.$value * 200}px`};
  height: 4px;
  background-color: ${COLOR_PRIMARY};
  margin-right: 4px;
`;
