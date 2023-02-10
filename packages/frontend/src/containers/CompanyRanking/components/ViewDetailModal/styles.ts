import styled from "styled-components";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import {
  BLUE,
  COLOR_PRIMARY,
  SONIC_GRAY,
  TEXT_COLOR_GREY,
  WHITE,
} from "../../../../themes/colors";

export const ViewDetailDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 70%;
    max-width: 880px;
  }
  position: relative;
`;

export const ViewDetailDialogContent = styled(DialogContent)`
  flex-wrap: wrap;
  height: 550px;
` as typeof DialogContent;

export const TextBold = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${TEXT_COLOR_GREY};
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${COLOR_PRIMARY};
  }
` as typeof Typography;

export const TextItalic = styled(Typography)`
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
` as typeof Typography;

export const ViewDetailCollapse = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: auto;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  margin-bottom: 10px;
  border-bottom: 1px solid ${SONIC_GRAY};

  .arrowCollapse {
    display: flex;
  }
`;

export const Collapse = styled(Box)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const TextAreaField = styled(TextField)`
  width: 100%;

  .MuiInputBase-multiline {
    min-height: 120px;
    padding: 18px 12px;
    align-items: flex-start;
  }
`;

export const SourceTextField = styled(TextField)`
  width: 100%;

  .MuiOutlinedInput-input {
    padding: 8px 12px;
  }
`;

export const AddAnswerButton = styled(Button)`
  margin: 0 0 15px 40px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  padding: 0;
  text-transform: capitalize;
`;

export const SaveButton = styled(Button)`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-transform: capitalize;
`;

export const CancelButton = styled(Button)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-transform: capitalize;
`;

export const Title = styled(Typography)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  width: 100%;
`;

export const Reason = styled(Title)`
  margin-top: 30px;
`;

export const AddAnswer = styled(Box)`
  margin: 0 0 20px 40px;
  padding: 10px;
  background-color: ${BLUE};
  .buttonGroup {
    display: flex;
    justify-content: flex-end;
  }
`;

export const AddAnswerForm = styled.form`
  .MuiInputBase-root {
    background-color: white;
  }
`;

export const DocumentSelect = styled(Select)`
  font-size: 14px;
  word-break: break-word;
  width: 100%;
  height: 35px;
  background-color: ${WHITE};

  .MuiSelect-selectMenu {
    padding: 0 32px 0 14px;

    &:focus {
      background-color: ${WHITE};
    }
  }

  .MuiSelect-select {
    &:focus {
      background-color: ${WHITE};
    }
  }

  .MuiSelect-iconOpen {
    &:target {
      top: 126px;
    }
  }
  .MuiOutlinedInput-input {
    padding: 8px 12px;
  }
`;
