import styled from "styled-components";

import { Button, Tab, TabProps, Tabs } from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";

import { COLOR_PRIMARY, WHITE } from "../../../../themes/colors";

interface RankingTabProps {
  $active?: boolean;
}

export const RankingContainerTabs = styled(Tabs)`
  width: 450px;
  .MuiTab-root {
    margin-top: 15px;
    padding: 0;
  }
  .MuiTabs-indicator {
    height: 0px;
  }
  .Mui-selected {
    color: ${WHITE};
    background-color: ${COLOR_PRIMARY};
  }
  .MuiTab-wrapper {
    align-items: flex-start;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ClearAllButton = styled(Button)`
  width: 100px;
  height: 35px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

export const DoneButton = styled(Button)`
  width: 100px;
  height: 35px;
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px;
  line-height: 24px;
`;

export const RankingTab = styled(Tab)<RankingTabProps & TabProps>`
  color: ${COLOR_PRIMARY};
  opacity: 1;
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
  &:focus {
    outline: none;
  }
  .MuiTab-wrapper {
    width: auto;
    color: inherit;
  }
`;

export const RankingTabPanel = styled(TabPanel)`
  padding: 0;
  margin: 0;
  border: 5px solid ${COLOR_PRIMARY};
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
