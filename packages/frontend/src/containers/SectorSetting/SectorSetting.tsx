import React, { useState, createContext } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import Typography from "@material-ui/core/Typography";
import Propotion from "./components/Propotion";
import UnitWeights from "./components/UnitWeights";
import { KIND_OF_PROPOTION } from "../../constants/enums";
import { ChildTabValue } from "../../types/frameworkSettings";
import { getSectorsRequested, selectSectors } from "../../reducers/sectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { StyledContainer, SectorSelect, SelectBox } from "./styles";
import Dialog from "./components/Dialog";
import {
  SettingsTab,
  TabContainerESG,
} from "../FrameworkSettingsReview/styles";

export interface ISectorSettingContext {
  isTableOnEditMode: boolean;
  setIsTableOnEditMode: (boolean) => void;
}

const defaultContextValue = {
  isTableOnEditMode: false,
  setIsTableOnEditMode: () => {},
};

export const sectorSettingContext =
  createContext<ISectorSettingContext>(defaultContextValue);

const SectorSetting = () => {
  const [activeChildTabValue, setActiveChildTabValue] = useState<ChildTabValue>(
    ChildTabValue.tabEnvironment
  );
  const dispatch = useAppDispatch();
  const defaultSelectedSector = "Consumer Good";
  const [selectedSector, setSelectedSector] = useState(defaultSelectedSector);
  const [isTableOnEditMode, setIsTableOnEditMode] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const categoriesDropdownListState = useAppSelector(selectSectors);
  const sectors = categoriesDropdownListState.sectors;
  React.useEffect(() => {
    dispatch(getSectorsRequested());
  }, []);
  return (
    <sectorSettingContext.Provider
      value={{ isTableOnEditMode, setIsTableOnEditMode }}
    >
      <StyledContainer>
        <Box className="sort-by-sector">
          <Typography className="sort-label">Sort by Sector</Typography>
          <SelectBox>
            <SectorSelect
              value={selectedSector}
              variant="outlined"
              autoComplete="off"
              onChange={(e) => setSelectedSector(e.target.value)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              {sectors.map((sector) => (
                <MenuItem key={sector.id} value={sector.name}>
                  {sector.name}
                </MenuItem>
              ))}
            </SectorSelect>
          </SelectBox>
        </Box>
        <Box className="propotion-wrapper">
          <Propotion kindOfPropotion={KIND_OF_PROPOTION.ESG} />
        </Box>
        <TabContext value={activeChildTabValue}>
          <TabContainerESG
            onChange={(_, tabValue) => setActiveChildTabValue(tabValue)}
            aria-label="Tab list of framework and language"
          >
            <SettingsTab
              $active={
                activeChildTabValue === `${ChildTabValue.tabEnvironment}`
              }
              label="Environment"
              value={ChildTabValue.tabEnvironment}
            />
            <SettingsTab
              $active={activeChildTabValue === `${ChildTabValue.tabSocial}`}
              label="Social"
              value={ChildTabValue.tabSocial}
            />
            <SettingsTab
              $active={activeChildTabValue === `${ChildTabValue.tabGovernance}`}
              label="Governance"
              value={ChildTabValue.tabGovernance}
            />
          </TabContainerESG>
          <TabPanel
            value={ChildTabValue.tabEnvironment}
            style={{ padding: "0" }}
          >
            <UnitWeights />
          </TabPanel>

          <TabPanel
            value={ChildTabValue.tabSocial}
            style={{ padding: "0", height: "calc(100% - 48px)" }}
          >
            <UnitWeights />
          </TabPanel>
          <TabPanel
            value={ChildTabValue.tabGovernance}
            style={{ padding: "0", height: "calc(100% - 48px)" }}
          >
            <UnitWeights />
          </TabPanel>
        </TabContext>
        {isTableOnEditMode && (
          <Box className="button-wrapper">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setIsTableOnEditMode(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setIsDialogOpen(true)}
            >
              Save
            </Button>
          </Box>
        )}
        <Dialog open={isDialogOpen} handleClose={setIsDialogOpen} />
      </StyledContainer>
    </sectorSettingContext.Provider>
  );
};

export default SectorSetting;
