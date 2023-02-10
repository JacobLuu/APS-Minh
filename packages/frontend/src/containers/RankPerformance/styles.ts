import styled from "styled-components";

import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

import {
  BACKGROUND_COLOR,
  COLOR_PRIMARY,
  TEXT_COLOR_GREY,
} from "../../themes/colors";

export const RankPerformanceContainer = styled(Container)`
  background-color: ${BACKGROUND_COLOR};
  padding: 0 40px;
`;

export const Image = styled.img``;

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

export const YaxisText = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  width: ${({ yAxisHeatMap }) => `${yAxisHeatMap}px`};
  color: ${COLOR_PRIMARY};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
` as typeof Typography;

export const GroupSelect = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const ChartContainer = styled.div`
  min-height: 600px;
  max-height: 600px;
  overflow: auto;
`;

export const FactorCategories = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
