import styled from "styled-components";

import Container from "@material-ui/core/Container";
import Tab, { TabProps } from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { HEADER_HEIGHT } from "../../constants/size";
import {
  BACKGROUND_COLOR,
  COLOR_BOX_SHADOW,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  WHITE,
} from "../../themes/colors";

interface SettingsTabProps {
  $active: boolean;
}

export const SettingsContainer = styled(Container)`
  background-color: ${BACKGROUND_COLOR};
  padding: 0 40px;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;

export const TabContainer = styled(Tabs)`
  display: flex;
  align-items: center;
  background-color: ${WHITE};
  width: 220px;
  height: 55px;
  border-radius: 4px;
  margin-bottom: 15px;
  box-shadow: ${COLOR_BOX_SHADOW};
  .MuiTabs-flexContainer {
    justify-content: center;
  }
  .MuiTab-root {
    min-height: 35px;
    width: 103px;
    @media (min-width: 600px) {
      min-width: 103px;
    }
  }
`;

export const SettingsTab = styled(Tab)<SettingsTabProps & TabProps>`
  background-color: ${(props) => (props.$active ? COLOR_PRIMARY : WHITE)};
  color: ${(props) => (props.$active ? WHITE : COLOR_TEXT_PRIMARY)};
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  width: 100px;
  height: 35px;
  text-transform: capitalize;
  &:focus {
    outline: none;
  }
  .MuiTab-wrapper {
    width: 100px;
    color: inherit;
  }
`;
