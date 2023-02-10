import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TableCell from "@material-ui/core/TableCell";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Pagination from "@material-ui/lab/Pagination";
import Tab, { TabProps } from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {
  BACKGROUND_COLOR,
  COLOR_BOX_SHADOW,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  FRAME_BACKGROUND,
  WHITE,
} from "../../themes/colors";

interface SettingsTabProps {
  $active: boolean;
}

interface ColumnHeadingProps extends TypographyProps {
  $isActive?: boolean;
}

export const RankPerformanceContainer = styled(Container)`
  background-color: ${BACKGROUND_COLOR};
`;

export const Title = styled(TableCell)`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR_TEXT_PRIMARY};
  background-color: ${FRAME_BACKGROUND};
`;

export const PaginationBox = styled(Box)`
  display: flex;
  justify-content: right;
  padding: 20px 0px 15px;
  margin: 10px 0px 30px;
  width: 100%;
  color: ${COLOR_TEXT_PRIMARY};
  && .MuiOutlinedInput-input {
    padding: 6px 30px 6px 10px;
  }

  .MuiOutlinedInput-root {
    height: 32px;
    position: relative;
    border-radius: 4px;
  }
`;

export const ColumnHeading = styled(Typography)<ColumnHeadingProps>`
  width: min-content;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  ${({ $isActive }) =>
    $isActive &&
    `
    font-weight: 900;
    font-size: 15px;
  `}
`;

export const ArrowBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ArrowDown = styled(ArrowDropDownIcon)`
  cursor: pointer;
  margin-top: -9px;
`;

export const ArrowUp = styled(ArrowDropUpIcon)`
  cursor: pointer;
  margin-bottom: -9px;
`;

export const RankPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    color: ${COLOR_TEXT_PRIMARY};
  }

  .Mui-selected {
    color: ${WHITE};
  }
`;

export const TabContainer = styled(Tabs)`
  display: flex;
  align-items: center;
  background-color: ${WHITE};
  width: 420px;
  height: 55px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: ${COLOR_BOX_SHADOW};
  .MuiTabs-flexContainer {
    justify-content: center;
  }
  .MuiTab-root {
    min-height: 35px;
    width: 103px;
    @media (min-width: 600px) {
      min-width: 103px;
    }
  }
`;

export const SettingsTab = styled(Tab)<SettingsTabProps & TabProps>`
  background-color: ${(props) => (props.$active ? COLOR_PRIMARY : WHITE)};
  color: ${(props) => (props.$active ? WHITE : COLOR_TEXT_PRIMARY)};
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  width: max-content;
  height: 35px;
  text-transform: capitalize;
  &:focus {
    outline: none;
  }
  .MuiTab-wrapper {
    min-width: 100px;
    color: inherit;
  }
`;
