import styled from "styled-components";

import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";

import { COLOR_PRIMARY } from "../../themes/colors";

export const HistoryDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 70%;
    max-width: 880px;
    padding: 50px 50px 60px;
  }
  position: relative;
`;

export const HistoryDialogTitle = styled(DialogTitle)``;

export const HistoryDialogContent = styled(DialogContent)`
  display: flex;
  flex-wrap: wrap;
  max-height: 310px;
`;

export const GridItem = styled(Grid)``;

export const UserAvatar = styled(Avatar)`
  background-color: ${COLOR_PRIMARY};
  margin-top: 6px;
`;

export const CloseIcon = styled.img`
  position: absolute;
  top: 40px;
  left: 40px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
