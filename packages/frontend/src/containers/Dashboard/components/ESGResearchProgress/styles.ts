import styled from "styled-components";

import {
  Box,
  Container,
  LinearProgress,
  TableBody,
  TableHead,
  TablePagination,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import {
  COLOR_BOX_SHADOW,
  COLOR_PRIMARY,
  DEFAULT_BORDER_RADIUS,
  TABLE_BORDER_COLOR,
  TEXT_COLOR_GREY,
  WHITE,
} from "../../../../themes/colors";

export const Header = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  padding: 20px 0 5px 20px;
` as typeof Typography;

export const TextHeader = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${TEXT_COLOR_GREY};
` as typeof Typography;

export const Text = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
  text-transform: uppercase;
  .companyNameLink {
    color: ${COLOR_PRIMARY};
  }
`;

export const ContainerESG = styled(Container)`
  background: ${WHITE};
  width: 100%;
  padding: 9.5px 10px;
  overflow: hidden;
  max-width: 100%;
  min-height: 555px;
  box-shadow: ${COLOR_BOX_SHADOW};
  position: relative;
  border-radius: ${DEFAULT_BORDER_RADIUS};
`;

export const THead = styled(TableHead)`
  .MuiTableCell-head {
    padding: 10px;
  }
`;

export const ESGTable = styled(TableHead)`
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
    padding: 11px;
  }
`;

export const ArrowBox = styled(Box)`
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

export const TablePaginationESG = styled(TablePagination)`
  border-bottom: none;
  position: relative;
  overflow: hidden;
  .MuiSelect-selectMenu {
    border: 1px solid ${TABLE_BORDER_COLOR};
    padding-right: 36px;
  }
  .MuiTablePagination-toolbar {
    padding-left: 0;
  }
` as typeof TablePagination;

export const PaginationBox = styled(Box)`
  display: flex;
  justify-content: right;
  margin-top: 15px;
  position: absolute;
  top: 88%;
  left: 24%;
  width: 75%;
`;
interface LineProgressProps {
  $percentage: number;
}

export const LineProgress = styled(LinearProgress)<LineProgressProps>`
  height: 14px;
  border-radius: 20px;
  background-image: ${(props) => {
    let gradient = "";
    let isLastColor = true;

    if (props.$percentage >= 70) {
      if (isLastColor) {
        isLastColor = false;
        gradient = `#7A99F8 ${props.$percentage}%`;
      } else {
        gradient = `#7A99F8 80%, ${gradient}`;
      }
    }

    if (props.$percentage >= 60) {
      if (isLastColor) {
        isLastColor = false;
        gradient = `#8896F6 ${props.$percentage}%`;
      } else {
        gradient = `#8896F6 70%, ${gradient}`;
      }
    }

    if (props.$percentage >= 50) {
      if (isLastColor) {
        isLastColor = false;
        gradient = `#9492F2 ${props.$percentage}%`;
      } else {
        gradient = `#9492F2 60%, ${gradient}`;
      }
    }

    if (props.$percentage >= 40) {
      if (isLastColor) {
        isLastColor = false;
        gradient = `#A08FEF ${props.$percentage}%`;
      } else {
        gradient = `#A08FEF 50%, ${gradient}`;
      }
    }

    if (props.$percentage >= 30) {
      if (isLastColor) {
        isLastColor = false;
        gradient = `#B288E6 ${props.$percentage}%`;
      } else {
        gradient = `#B288E6 40%, ${gradient}`;
      }
    }

    if (props.$percentage >= 20) {
      if (isLastColor) {
        isLastColor = false;
        gradient = `#D977C8 ${props.$percentage}%`;
      } else {
        gradient = `#D977C8 30%, ${gradient}`;
      }
    }

    if (props.$percentage >= 10) {
      if (isLastColor) {
        isLastColor = false;
        gradient = `#EF6AA2 ${props.$percentage}%`;
      } else {
        gradient = `#EF6AA2 20%, ${gradient}`;
      }
    }

    if (props.$percentage >= 0) {
      if (isLastColor) {
        isLastColor = false;
        gradient = `#F46879 ${props.$percentage}%`;
      } else {
        gradient = `#F46879 10%, ${gradient}`;
      }
    }

    gradient = `linear-gradient(to right, ${gradient}, #E2E2E2 ${props.$percentage}%)`;
    return gradient;
  }};
`;
