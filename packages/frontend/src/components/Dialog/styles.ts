import styled from "styled-components";

import { Box, Button, Dialog } from "@material-ui/core";

export const DialogContainer = styled(Dialog)`
  .MuiDialogContent-root {
    background-color: #fafafa;
    padding: 60px 20px;
  }
  .MuiDialogActions-root {
    background-color: #eeeeee;
  }
`;

export const Content = styled(Box)`
  text-align: center;
  max-width: 600px;
  margin: auto;
`;

export const LogoutButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 40px;
  height: 36px;
  display: flex;
  margin: 20px auto;
`;
