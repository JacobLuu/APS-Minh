import styled from "styled-components";

import { Box, Button, Dialog, Typography } from "@material-ui/core";

import { TEXT_COLOR_GREY, WHITE } from "../../themes/colors";

export const FileDialog = styled(Dialog)`
  .MuiDialogContent-root {
    width: 712px;
    height: 262px;
    background-color: #fafafa;
    padding: 0;
  }
  .MuiDialogActions-root {
    background-color: #eeeeee;
  }
`;

export const Header = styled.div`
  width: 712px;
  height: 42px;
  background-color: #9b9b9b;
  & p {
    font-size: 1.125rem;
    color: ${WHITE};
    font-weight: 600;
  }
`;

export const OKButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  width: 53px;
  height: 36px;
  text-transform: capitalize;
`;

export const BoldText = styled(Typography)<{ textcolor?: string }>`
  font-weight: 600;
  color: ${({ textcolor }) => textcolor || WHITE};
`;

export const CancelButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  width: 87px;
  height: 36px;
  text-transform: capitalize;
`;

export const DropZone = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 666px;
  height: 115px;
  border-radius: 2px;
  border: 1px dashed #c4c4c4;
  background-color: ${WHITE};
  color: ${TEXT_COLOR_GREY};
  cursor: pointer;
`;

export const FileName = styled(Typography)`
  font-weight: 600;
  font-size: 1.025rem;
  height: 25px;
`;
