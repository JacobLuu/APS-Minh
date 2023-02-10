import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabPanel from "@material-ui/lab/TabPanel";

import { COLOR_PRIMARY } from "../../../../themes/colors";

export const GroupSelect = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const ScoreGradient = styled.div`
  display: flex;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const CategoriesGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.img``;

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  .MuiOutlinedInput-input {
    width: 200px;
    padding: 8px 12px;
    color: ${COLOR_PRIMARY};
  }
`;

export const SectorSelect = styled(Select)`
  display: flex;
  align-items: center;
  .MuiOutlinedInput-input {
    width: 200px;
    padding: 8px 12px;
    color: ${COLOR_PRIMARY};
  }
`;

export const CompanyRankingTabs = styled(Tabs)`
  width: 100%;
  .MuiTab-root {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    padding: 0;
    width: 50%;
  }
  .MuiTabs-indicator {
    height: 5px;
    background-color: #7a99f8;
    border-radius: 10px;
  }
  .Mui-selected {
    color: #7a99f8;
  }
`;

export const CompanyRankingTab = styled(Tab)`
  text-transform: capitalize;
`;

export const CompanyRankingTabPanel = styled(TabPanel)`
  height: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TabPanelBox = styled(Container)`
  width: 100%;
  height: 550px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;
`;

export const RankNowButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px;
  line-height: 24px;
`;
