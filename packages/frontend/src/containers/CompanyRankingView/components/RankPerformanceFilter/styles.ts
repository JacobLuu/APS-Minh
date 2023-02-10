import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { COLOR_TEXT_PRIMARY } from "../../../../themes/colors";

export const Title = styled(Typography)`
  min-width: 65px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  padding-right: 5px;
  color: ${COLOR_TEXT_PRIMARY};
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
  justify-content: end;
  @media only screen and (max-width: 1280px) {
    display: flex;
    justify-content: flex-start;
    &:last-child {
      margin-right: 0px;
    }
  }
`;

export const SelectBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .MuiOutlinedInput-input {
    padding: 8px 12px;
    color: ${COLOR_TEXT_PRIMARY};
  }
`;

export const SectorSelect = styled(Select)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  .MuiOutlinedInput-input {
    padding: 8px 12px;
    color: ${COLOR_TEXT_PRIMARY};
  }
`;

export const RankingSearchBox = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 5px 0px;
  .MuiAutocomplete-inputRoot {
    padding: 0;
  }
  .MuiAutocomplete-hasClearIcon
    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding-right: 9px;
  }
`;

export const CategoryFilterBox = styled.div``;

export const FactorFilterBox = styled(Container)``;
