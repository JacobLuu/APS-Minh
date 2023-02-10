import { Link } from "react-router-dom";
import styled from "styled-components";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

import {
  COLOR_PRIMARY,
  SONIC_GRAY,
  TABLE_TITLE_COLOR,
  TEXT_COLOR_GREY,
  WHITE,
} from "../../themes/colors";

interface HeatMapProps {
  yAxisWidth?: string;
  xAxisHeatMap?: string;
  yAxisHeatMap?: string;
  isHeatmapVisible: boolean;
}

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .arrowBox {
    padding: 10px;
    background: ${WHITE};
    border: 1px solid ${TABLE_TITLE_COLOR};
    box-sizing: border-box;
    border-radius: 5px;
  }
`;

export const Companies = styled.div<HeatMapProps>`
  display: inline-flex;
  width: ${({ isHeatmapVisible }) => (isHeatmapVisible ? "unset" : "100%")};
  .companiesColumn {
    z-index: 9;
    padding-top: 28px;
    box-sizing: border-box;
    position: sticky;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    background-color: ${WHITE};
    .box {
      width: ${({ yAxisWidth }) => `${yAxisWidth}px`};
      height: ${({ yAxisHeatMap }) =>
        yAxisHeatMap ? `${yAxisHeatMap}px` : "60px"};
    }
  }
`;

export const Image = styled.img``;

export const FilterGroup = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.img`
  width: 9px;
  height: 12px;
  cursor: pointer;
`;

export const ScoreGradient = styled.div`
  display: flex;
`;

export const Text = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  padding-right: 5px;
  color: ${TEXT_COLOR_GREY};
` as typeof Typography;

export const BoldText = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${SONIC_GRAY};
` as typeof Typography;

export const HeaderText = styled(Typography)`
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: ${TEXT_COLOR_GREY};
` as typeof Typography;

export const XaxisText = styled(Typography)<HeatMapProps>`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${SONIC_GRAY};
  width: ${({ xAxisHeatMap }) => `${xAxisHeatMap}px`};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-right: 5px;
  box-sizing: border-box;
` as typeof Typography;

export const YaxisLinkText = styled(Link)<HeatMapProps>`
  &&:hover {
    text-decoration: none;
  }
  text-decoration: none;
  color: ${COLOR_PRIMARY};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  width: fit-content;
  color: ${COLOR_PRIMARY};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
`;

export const GroupSelect = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const ChartHeader = styled.div<HeatMapProps>`
  display: inline-flex;
  position: sticky;
  height: auto;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: ${WHITE};
  .container {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    box-sizing: border-box;
    width: ${({ yAxisWidth }) => `${yAxisWidth}px`};
    min-width: ${({ yAxisWidth }) => `${yAxisWidth}px`};
    position: sticky;
    left: 0;
    background-color: ${WHITE};
    z-index: 10;
    padding-bottom: 10px;
  }
  .factorBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 25px;
    background-color: ${WHITE};
    padding-bottom: 10px;
  }
  .factorRows {
    display: flex;
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: ${({ xAxisHeatMap }) => `${xAxisHeatMap}px`};
      padding-right: 20px;
      box-sizing: border-box;
    }
  }
`;

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  .MuiOutlinedInput-input {
    width: 200px;
    padding: 8px 12px;
    color: ${COLOR_PRIMARY};
  }
`;

export const SectorSelect = styled(Select)`
  display: flex;
  align-items: center;
  .MuiOutlinedInput-input {
    width: 200px;
    padding: 8px 12px;
    color: ${COLOR_PRIMARY};
  }
`;

export const RankNowButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px;
  line-height: 24px;
`;

export const DataNotFound = styled.div`
  width: 100%;
  height: calc(550px - 58px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${COLOR_PRIMARY};
`;
