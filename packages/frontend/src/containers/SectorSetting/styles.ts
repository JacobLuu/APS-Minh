import styled from "styled-components";
import Select from "@material-ui/core/Select";
import {
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  WHITE,
} from "../../themes/colors";

export const StyledContainer = styled.div`
  width: 100%;
  margin-top: 0px;
  min-height: 500px;
  background-color: ${WHITE};
  border-radius: 8px;
  .sort-by-sector {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-wrap: wrap;
  }

  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
    flex-wrap: wrap;
    button {
      width: 90px;
      height: 45px;
      text-transform: capitalize;
    }
    button:last-child {
      margin-left: 15px;
    }
  }

  .sort-label {
    width: 90px;
    margin-right: 20px;
    padding-top: 15px;
  }

  .propotion-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .propotion {
    width: 49%;
    height: 200px;
    border-radius: 8px;
    background-color: ${WHITE};
    border: 1px solid ${COLOR_BORDER};
    @media (max-width: 900px) {
      width: 100%;
      margin-top: 10px;
    }
  }

  .MuiTabs-indicator {
    height: 2px;
    background-color: ${COLOR_PRIMARY};
  }

  .MuiTab-root {
    @media (min-width: 600px) {
      min-width: 95px;
    }
  }
`;

export const SelectBox = styled.div`
  width: 30%;
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
  .MuiOutlinedInput-input {
    padding: 8px 12px;
    color: ${COLOR_TEXT_PRIMARY};
  }
`;
