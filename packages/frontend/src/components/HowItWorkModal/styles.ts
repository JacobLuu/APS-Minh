import styled from "styled-components";

import { Button, Dialog, ListItemText } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export const HowItWorkDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 70%;
    max-width: 880px;
    padding: 50px 50px 60px;
  }
`;

export const OrderedItemText = styled(ListItemText)`
  font-size: 16px;
  font-weight: 400;
`;

export const TryButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px;
`;

export const StoreButton = styled(Button)`
  font-size: 14px;
  font-weight: 600;
`;

export const XIcon = styled(CloseIcon)`
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-left: -3px;
`;
