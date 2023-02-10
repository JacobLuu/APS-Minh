import styled from "styled-components";

import TableCell from "@material-ui/core/TableCell";

import { COLOR_PRIMARY, COLOR_TEXT_PRIMARY } from "../../../../themes/colors";

interface TableCellScoreProps {
  $isActive?: boolean;
}

export const TableCellScore = styled(TableCell)<TableCellScoreProps>`
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  font-size: 14px;
  color: ${COLOR_PRIMARY};
  cursor: pointer;
`;

export const DashboardTableCellScore = styled(TableCell)`
  font-size: 14px;
  font-weight: 400;
  color: ${COLOR_PRIMARY};
`;

export const TableCellRank = styled(TableCell)<TableCellScoreProps>`
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  font-size: 14px;
  color: ${COLOR_TEXT_PRIMARY};
  white-space: nowrap;
  overflow: hidden;
`;

export const TableCellCompany = styled(TableCell)`
  font-size: 14px;
  font-weight: 400;
  width: 310px;
  cursor: pointer;
`;
