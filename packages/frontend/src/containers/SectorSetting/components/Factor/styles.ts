import styled from "styled-components";
import {
  COLOR_ACTIVE_BACKGROUND,
  COLOR_BORDER,
  COLOR_INACTIVE_BACKGROUND,
  COLOR_TEXT_PRIMARY,
  STATE_OFF,
  STATE_ON,
} from "../../../../themes/colors";

const Container = styled.div`
  font-style: normal;
  width: 100%;
  min-height: 135px;
  border: 1px solid ${COLOR_BORDER};
  border-radius: 8px;
  margin-top: 15px;
  padding: 15px 30px;
  .metric-name {
    font-weight: 600;
    width: 100%;
    text-align: left;
  }

  .box-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .status-box {
    width: 75px;
    height: 28px;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 28px;
    text-align: center;
    text-transform: capitalize;
  }

  .active {
    background-color: ${COLOR_ACTIVE_BACKGROUND};
    color: ${STATE_ON};
  }

  .inactive {
    background-color: ${COLOR_INACTIVE_BACKGROUND};
    color: ${STATE_OFF};
  }

  .weights-select {
    width: 70px;
  }

  .MuiTableCell-root {
    border-bottom: none;
  }

  .MuiTableCell-head {
    color: ${COLOR_TEXT_PRIMARY};
  }

  .MuiTableCell-body {
    color: ${COLOR_TEXT_PRIMARY};
  }

  && .MuiOutlinedInput-input {
    padding: 8px 30px 8px 20px;
  }
`;

export default Container;
