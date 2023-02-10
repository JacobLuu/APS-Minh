import styled from "styled-components";

import { Button, Dialog, Typography } from "@material-ui/core";

import { WHITE } from "../../themes/colors";

export const DialogContainer = styled(Dialog)`
  .MuiDialogContent-root {
    width: 489px;
    max-height: 200px;
  }
`;

export const OKButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7a99f8;
  border-radius: 40px;
  color: ${WHITE};
  width: 53px;
  height: 36px;

  :hover {
    p {
      color: #7a99f8;
    }
  }
`;

export const BoldText = styled(Typography)<{ textColor?: string }>`
  font-weight: 600;
  color: ${({ textColor }) => textColor || WHITE};
`;

export const CancelButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 87px;
  height: 36px;
`;
