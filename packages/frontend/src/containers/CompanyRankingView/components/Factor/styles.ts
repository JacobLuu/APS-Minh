import styled from "styled-components";
import TableCell from "@material-ui/core/TableCell";
import { COLOR_TEXT_PRIMARY, COLOR_PRIMARY } from "../../../../themes/colors";

interface TableCellScoreProps {
  $isActive: boolean;
}

export const TableCellScore = styled(TableCell)<TableCellScoreProps>`
  font-size: 14px;
  ${({ $isActive }) =>
    $isActive &&
    `
    font-weight: 900;
    font-size: 15px;
  `}
  color: ${COLOR_PRIMARY};
  cursor: pointer;
`;

export const TableCellRank = styled(TableCell)`
  font-size: 14px;
  font-weight: 400;
  color: ${COLOR_TEXT_PRIMARY};
  white-space: nowrap;
  overflow: hidden;
`;

export const TableCellCompany = styled(TableCell)`
  font-size: 14px;
  font-weight: 400;
  width: 20%;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
