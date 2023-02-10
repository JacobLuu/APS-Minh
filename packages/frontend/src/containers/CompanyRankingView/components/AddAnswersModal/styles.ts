import styled from "styled-components";
import ReactLoadingOverlay from "react-loading-overlay";

import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  WHITE,
  COLOR_PRIMARY,
  ERROR_COLOR,
  COLOR_TEXT_PRIMARY,
} from "../../../../themes/colors";

export const LoadingOverlay = styled(ReactLoadingOverlay)`
  background: ${WHITE};
`;

export const ScoreDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 700px;
  }
  .default-overall-score {
    width: 140px;
  }
`;

export const ScoreForm = styled.form`
  padding: 25px 0px 25px 35px;
`;

export const ScoreDialogContent = styled(DialogContent)`
  max-height: 700px;
  &:first-child {
    padding: 0;
  }
  overflow-y: inherit;
`;

export const CancelButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  margin: 10px;
  min-height: 40px;
  color: ${COLOR_PRIMARY};
  border-color: ${COLOR_PRIMARY};
  text-transform: capitalize;
`;

export const UpdateButton = styled(Button)`
  font-size: 14px;
  font-weight: 600;
  margin: 10px;
  min-height: 40px;
  color: ${WHITE};
  background-color: ${COLOR_PRIMARY};
  text-transform: capitalize;
`;

export const SmallText = styled(Typography)`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${COLOR_TEXT_PRIMARY};
`;

export const CompanyText = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: ${COLOR_PRIMARY};
  margin-bottom: 20px;
`;

export const ErrorMessage = styled(Typography)`
  color: ${ERROR_COLOR};
  font-size: 14px;
  font-weight: 600;
`;

export const WarningText = styled(Typography)`
  color: ${ERROR_COLOR};
  font-size: 12px;
  font-weight: 600;
`;

export const Title = styled(Typography)`
  font-size: 12px;
  font-weight: 600;
  &.capitalized {
    text-transform: capitalize;
  }
`;

export const FactorText = styled(Typography)`
  font-size: 12px;
  font-weight: 600;
`;

export const TextAreaField = styled(TextField)`
  width: 100%;
  .MuiInputBase-multiline {
    padding: 10px 15px;
    align-items: flex-start;
  }
`;

export const ScoreField = styled(TextField)`
  width: 80px;
  .MuiOutlinedInput-input {
    padding: 12.5px 25px;
  }
`;
