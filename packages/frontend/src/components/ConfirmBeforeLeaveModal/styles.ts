import styled from "styled-components";

import { Button, Dialog, DialogActions } from "@material-ui/core";
import Text from "../Text";

import { COLOR_PRIMARY, COLOR_TEXT_PRIMARY, WHITE } from "../../themes/colors";

export const Title = styled(Text)`
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_TEXT_PRIMARY};
`;

export const DialogContainer = styled(Dialog)`
  display: flex;
  flex-direction: column;
  align-items: center;
  .MuiDialog-container {
    height: unset;
  }
  .MuiDialog-paper {
    padding: 12px 20px 18px;
  }
  .MuiDialogTitle-root {
    padding: 18px 24px 10px;
  }
`;

export const StayButton = styled(Button)`
  color: ${COLOR_PRIMARY};
  font-weight: 700;
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
  margin-left: 10px;
`;

export const LeaveButton = styled(Button)`
  background-color: ${COLOR_PRIMARY};
  padding: 6px 34px;
  border-radius: 40px;
  box-shadow: none;
  color: ${WHITE};
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
`;

export const ActionBox = styled(DialogActions)`
  display: flex;
  justify-content: space-around;
`;
