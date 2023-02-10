import React, { memo, useState, useEffect, KeyboardEvent } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import EditIcon from "@material-ui/icons/Edit";
import TabPanel from "@material-ui/lab/TabPanel";
import TextField from "@material-ui/core/TextField";
import TabContext from "@material-ui/lab/TabContext";
import { StyledContainer, SettingsTab, TabContainer } from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ParentTabValue } from "../../types/frameworkSettings";
import {
  selectFrameworkSettings,
  setFrameworkName as setFrameworkNameInSlice,
} from "../../reducers/frameworkSettings";
import SectorSetting from "../SectorSetting";
import IndustrySetting from "../IndustrySetting";

const FrameworkSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { frameworkName: frameworkNameFromSlice } = useAppSelector(
    selectFrameworkSettings
  );
  const [frameworkNameOnUI, setFrameworkNameOnUI] = useState("Framework Name");
  const [isFrameworkNameOnEdit, setIsFrameworkNameOnEdit] =
    useState<boolean>(false);
  const [activeParentTabValue, setActiveParentTabValue] = useState<TabValue>(
    ParentTabValue.tabAllSectors
  );

  const handleEnterEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setFrameworkNameOnUI(frameworkNameFromSlice);
      setIsFrameworkNameOnEdit(false);
    }
    if (e.key === "Enter") {
      dispatch(setFrameworkNameInSlice(frameworkNameOnUI));
      setIsFrameworkNameOnEdit(false);
    }
  };
  const handleTextOnBlur = () => {
    dispatch(setFrameworkNameInSlice(frameworkNameOnUI));
    setIsFrameworkNameOnEdit(false);
  };
  useEffect(() => {
    setFrameworkNameOnUI(frameworkNameFromSlice);
  }, [frameworkNameFromSlice]);

  return (
    <StyledContainer maxWidth={false}>
      <Box>
        {isFrameworkNameOnEdit ? (
          <TextField
            autoFocus
            className="txt_framework_name"
            value={frameworkNameOnUI}
            onChange={(e) => setFrameworkNameOnUI(e.target.value)}
            onKeyDown={handleEnterEscape}
            onBlur={handleTextOnBlur}
          />
        ) : (
          <TextField
            className="txt_framework_name"
            disabled
            value={frameworkNameOnUI}
          />
        )}
        <Button
          type="button"
          onClick={() => setIsFrameworkNameOnEdit(!isFrameworkNameOnEdit)}
        >
          <EditIcon />
        </Button>
        <p className="txt_desc">Description</p>
      </Box>
      <Grid>
        <Box>
          <TabContext value={activeParentTabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              {/* ⏰ dispatch API request and loading for the data of initial tab when onChange */}
              <TabContainer
                TabIndicatorProps={{ style: { display: "none" } }}
                value={activeParentTabValue}
                onChange={(_, tabValue) => setActiveParentTabValue(tabValue)}
                aria-label="Tab list of framework and language"
              >
                <SettingsTab
                  $active={
                    activeParentTabValue === `${ParentTabValue.tabAllSectors}`
                  }
                  label="All sectors"
                  value={ParentTabValue.tabAllSectors}
                />
                <SettingsTab
                  $active={
                    activeParentTabValue === `${ParentTabValue.tabSector}`
                  }
                  label="Sector"
                  value={ParentTabValue.tabSector}
                />
              </TabContainer>
            </Box>
            <TabPanel
              className="container_panel"
              value={ParentTabValue.tabAllSectors}
            >
              <IndustrySetting />
            </TabPanel>
            <TabPanel
              className="container_panel"
              value={ParentTabValue.tabSector}
            >
              <SectorSetting />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </StyledContainer>
  );
};

export default memo(FrameworkSettings);
