import styled from "styled-components";
import Box from "@material-ui/core/Box";
import {
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
} from "../../../../themes/colors";

const InputField = styled.input`
  font-family: "Source Sans Pro";
  font-style: normal;
  width: 65px;
  height: 27px;
  border-radius: 5px;
  width: 100%;
  padding-left: 10px;
  outline: none;
  border: 1px solid ${COLOR_BORDER};
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px ${COLOR_PRIMARY};
    border: 2px solid ${COLOR_PRIMARY};
  }
`;

export const Container = styled(Box)`
  font-family: "Source Sans Pro";
  .title {
    width: max-content;
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 0 30px;
    color: ${COLOR_TEXT_PRIMARY};
  }

  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    font-family: "Source Sans Pro";
    margin-top: -30px;
  }

  .input-wrapper {
    height: 80%;
    min-width: 28%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    @media (max-width: 1536px) {
      margin-right: -80px;
      z-index: 1;
    }
    @media (max-width: 965px) {
      margin-right: -190px;
      z-index: 1;
    }
    @media (max-width: 1280px) {
      margin-right: -185px;
      z-index: 1;
    }
  }

  .input-row {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${COLOR_TEXT_PRIMARY};

    .input-left {
      width: 65%;
      height: 25%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
    }

    .input-right {
      margin-left: 10px;
      width: 85px;
      height: 25%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .maker {
    height: 10px;
    width: 10px;
    margin-right: 5px;
  }
`;

export default InputField;
