import styled from "styled-components";

import { Box, Button, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export const NotificationAlertContainer = styled(Box)`
  background: linear-gradient(90deg, #d4defd 33.47%, #ffffff 101.99%);
`;

export const NotificationText = styled(Typography)`
  font-size: 16px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

export const DownloadButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px;
`;

export const HowButton = styled(Button)`
  font-size: 14px;
  font-weight: 600;
`;

export const XIcon = styled(CloseIcon)`
  height: 16px;
  width: 16px;
  cursor: pointer;
  margin-left: -3px;
`;
