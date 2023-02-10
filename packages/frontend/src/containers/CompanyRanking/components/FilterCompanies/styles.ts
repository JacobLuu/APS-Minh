import styled from "styled-components";

import { Container, Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";

import { COLOR_PRIMARY, TEXT_COLOR_GREY } from "../../../../themes/colors";

export const Text = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
` as typeof Typography;

export const Title = styled(Text)`
  min-width: 45px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  padding-right: 10px;
  color: ${TEXT_COLOR_GREY};
`;

export const FilterContainer = styled(Container)`
  margin-bottom: 20px;
  padding: 0;
` as typeof Container;

export const FilterBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InlineBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1280px) {
    &:last-child {
      margin-right: 0px;
    }
  }
`;

export const SelectBox = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  .MuiOutlinedInput-input {
    padding: 8px 12px;
    color: ${COLOR_PRIMARY};
  }
`;

export const SectorSelect = styled(Select)`
  display: flex;
  align-items: center;
  width: 100%;
  .MuiOutlinedInput-input {
    padding: 8px 12px;
    color: ${COLOR_PRIMARY};
  }
`;

export const RankingSearchBox = styled.div`
  width: 100%;
  .MuiAutocomplete-inputRoot {
    padding: 0;
  }
`;

export const CategoryFilterBox = styled.div``;

export const FactorFilterBox = styled(Container)``;
