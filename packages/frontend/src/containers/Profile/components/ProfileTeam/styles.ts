import styled from "styled-components";
import {
  Container,
  TableContainer,
  TableRow,
  TableCell,
  Avatar,
  Button,
  TablePagination,
} from "@material-ui/core";
import {
  TABLE_BORDER_COLOR,
  DARK_RED,
  DEEP_BLUE,
  JADE,
  ORANGE,
} from "../../../../themes/colors";

export const ProfileTeamContainer = styled(Container)`
  position: relative;
  padding: 0;
`;

export const TeamTableContainer = styled(TableContainer)`
  // header is 57, table head and pagination is 48 each, bottom margin is 22 => 175px
  height: calc(100vh - 175px);
  padding: 0 36px;
`;

export const TableBodyRow = styled(TableRow)`
  &:last-child {
    .MuiTableCell-body {
      border-bottom: 1px solid ${TABLE_BORDER_COLOR};
    }
  }
`;

export const TableBodyCell = styled(TableCell)`
  border-bottom: none;
`;

export const TeamTablePagination = styled(TablePagination)`
  border-bottom: none;

  .MuiSelect-selectMenu {
    border: 1px solid ${TABLE_BORDER_COLOR};
    padding-right: 36px;
  }
` as typeof TablePagination;

export const SaveButton = styled(Button)`
  width: 120px;
  margin-bottom: 18px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 20px;
  text-transform: capitalize;
`;

interface UserAvatarProps {
  $index: number;
}

const avatarColors = [DARK_RED, DEEP_BLUE, JADE, ORANGE];

export const UserAvatar = styled(Avatar)<UserAvatarProps>`
  background-color: ${(props) => {
    let colorIndex;
    if (props.$index >= 4) colorIndex = props.$index % 4;
    else colorIndex = props.$index;
    return avatarColors[colorIndex];
  }};
`;
