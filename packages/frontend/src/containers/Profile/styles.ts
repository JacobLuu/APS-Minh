import styled from "styled-components";

import { Container, Tab, TabProps } from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";

import { HEADER_HEIGHT } from "../../constants/size";
import {
  BACKGROUND_COLOR,
  COLOR_PRIMARY,
  DARKER_GREY,
} from "../../themes/colors";
import { defaultFontFamily } from "../../themes/themes";

export const ProfileContainer = styled(Container)`
  background-color: ${BACKGROUND_COLOR};
  padding: 0 40px;
  font-family: ${defaultFontFamily}, sans-serif;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;

interface ProfileTabProps {
  $active: boolean;
}

export const ProfileTab = styled(Tab)<ProfileTabProps & TabProps>`
  color: ${(props) => (props.$active ? COLOR_PRIMARY : DARKER_GREY)};
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
  &:focus {
    outline: none;
  }
`;

export const ProfileTabPanel = styled(TabPanel)`
  margin-top: 24px;
  padding: 0;
`;
