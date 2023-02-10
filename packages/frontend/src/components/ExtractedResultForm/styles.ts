import styled from "styled-components";

import { Button, TextField } from "@material-ui/core";

import { INPUT_BACKGROUND_COLOR } from "../../themes/colors";

export const Form = styled.form`
  position: relative;
`;

export const ScoreTextField = styled(TextField)`
  width: 44px;
  .MuiInputBase-input {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  input {
    background-color: ${INPUT_BACKGROUND_COLOR};
    border: #d8d8d8;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const TextAreaField = styled(TextField)`
  width: 100%;
  background-color: ${INPUT_BACKGROUND_COLOR};

  .MuiInputBase-multiline {
    min-height: 82px;
    padding: 8px 14px;
    align-items: flex-start;
    border: #d8d8d8;
  }
`;

export const EditContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: -40px;
  right: 0px;
`;

export const CancelButton = styled(Button)`
  font-weight: 700;
  font-size: 16px;
  border-radius: 20px;
`;

export const SaveButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  width: 84px;
  border-radius: 20px;
  text-transform: capitalize;
`;

export const OverallScoreContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorMessageContainer = styled.div`
  margin-left: 10px;
`;

/* keep error message and and indicator key label in the different line */
export const IndicatorKeyLabelContainer = styled.div`
  display: block;
  clear: both;
`;

export const ErrorMessageTextContainer = styled.div`
  display: inline-block;
  clear: both;
`;

export const ScoreTextLabel = styled.div`
  width: 34px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
`;
