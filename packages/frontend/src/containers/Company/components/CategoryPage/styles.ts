import styled from "styled-components";

import Container from "@material-ui/core/Container";
import MuiInputLabel from "@material-ui/core/InputLabel";
import Tab, { TabProps } from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import MuiTabPanel from "@material-ui/lab/TabPanel";

import {
  BACKGROUND_COLOR,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  WHITE,
} from "../../../../themes/colors";

export const CompanyContainer = styled(Container)`
  background-color: ${BACKGROUND_COLOR};
  padding: 0 40px;
`;

interface CategoryTabProps {
  $active: boolean;
}

export const CategoryTab = styled(Tab)<CategoryTabProps & TabProps>`
  font-size: 16px;
  text-transform: capitalize;
  color: ${(props) => (props.$active ? WHITE : COLOR_TEXT_PRIMARY)};
  background-color: ${(props) => (props.$active ? COLOR_PRIMARY : WHITE)};
  border-radius: 4px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: 6px 16px;
  min-height: 40px;
  min-width: 0px;
`;

export const CategoryTabs = styled(Tabs)`
  display: inline-flex;
  column-gap: 10px;
  background-color: white;
  padding: 8px;
`;

export const InputLabel = styled(MuiInputLabel)`
  cursor: pointer;
  color: ${COLOR_PRIMARY};
  font-weight: 600;
`;

export const TabPanel = styled(MuiTabPanel)`
  margin-top: 8px;
  padding: 0;
  font-weight: 600;
  color: ${COLOR_PRIMARY};
`;
