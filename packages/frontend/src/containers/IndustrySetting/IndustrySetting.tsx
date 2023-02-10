import React, { memo, useState, createContext } from "react";
import { produce } from "immer";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import MenuItem from "@material-ui/core/MenuItem";
import TabContext from "@material-ui/lab/TabContext";
import {
  TypeUnitText,
  ChildTabValue,
  IFrameworkSettingsState,
  IHandleSelectChangeParam,
} from "../../types/frameworkSettings";
import ContentTables from "./ContentTables";
import {
  setIsContainerLoading,
  selectFrameworkSettings,
  setUnitWeightTableMasterState,
  initialState as initialStateFromSlice,
} from "../../reducers/frameworkSettings";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  SettingsTab,
  TabContainerESG,
} from "../FrameworkSettingsReview/styles";

export const frameworkSettingContext = createContext({
  isTableOnEditMode: false,
  isContentOnLoading: false,
  setIsTableOnEditMode: (isTableOnEditMode) =>
    !isTableOnEditMode as Dispatch<SetStateAction<boolean>>,
  handleChangeSpecificTableCell: (
    _handleSelectChangeParam: IHandleSelectChangeParam
  ) => {
    return undefined as Dispatch<
      SetStateAction<IFrameworkSettingsState["unitWeightTableMasterState"]>
    >;
  },
});

const IndustrySetting = () => {
  const dispatch = useAppDispatch();
  const { unitWeightTableMasterState: unitWeightTableMasterStateFromSlice } =
    useAppSelector(selectFrameworkSettings);
  const [isContentOnLoading, setIsContentOnLoading] = useState(false); // 🔴 REDUX ~ Will move to redux when integrate BE
  const [isTableOnEditMode, setIsTableOnEditMode] = useState<boolean>(false);
  const [viewType, setViewType] = useState<TypeUnitText>(
    TypeUnitText.UnitWeight
  );
  const [activeChildTabValue, setActiveChildTabValue] = useState<TabValue>(
    ChildTabValue.tabEnvironment
  );
  const [unitWeightTableMasterStateForUI, setUnitWeightTableMasterStateForUI] =
    useState<IFrameworkSettingsState["unitWeightTableMasterState"]>(
      initialStateFromSlice.unitWeightTableMasterState
    );
  const handleChangeViewType = (e) => {
    setViewType(e.target.value);
    // ⏰ dispatch action to change table contents to appropriate type
  };
  const handleCancelEditingTable = () => {
    setUnitWeightTableMasterStateForUI(unitWeightTableMasterStateFromSlice);
    setIsTableOnEditMode(false);
  };

  const handleSaveTableToDB = () => {
    // ⏰ Will move setLoading to reducer when it comes to the BE integration
    dispatch(setIsContainerLoading(true));
    // ⏰ Will change to another action for API request when it comes to the BE integration
    dispatch(setUnitWeightTableMasterState(unitWeightTableMasterStateForUI));
    dispatch(setIsContainerLoading(false));
    setIsTableOnEditMode(false);
  };
  const handleChangeSpecificTableCell = React.useCallback(
    (handleSelectChangeParam: IHandleSelectChangeParam) => {
      const { childTableIndex, metricIndex, unitWeightIndex, value } =
        handleSelectChangeParam;
      setUnitWeightTableMasterStateForUI((prevState) =>
        produce(prevState, (draft) => {
          draft.tableContents[childTableIndex].metrics[
            metricIndex
          ].metricUnitWeights[unitWeightIndex] = value;
        })
      );
    },
    []
  );

  return (
    <frameworkSettingContext.Provider
      value={{
        isContentOnLoading,
        isTableOnEditMode,
        setIsTableOnEditMode,
        handleChangeSpecificTableCell,
      }}
    >
      <div>
        {/* <Children tabs> */}
        <TabContext value={activeChildTabValue}>
          {/* ⏰ dispatch API request and loading when onChange */}
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
        </TabContext>
        {/* </Children tabs> */}
        <div className="content_header">
          <div>
            <span>Unit Weights</span>
            <Button
              type="button"
              onClick={() => setIsTableOnEditMode(!isTableOnEditMode)}
            >
              <EditIcon />
            </Button>
          </div>
          <div>
            <span>0 - Not Material</span>
            <span>1 - Material</span>
            <span>2 - Very Material</span>
          </div>
          <div>
            <span className={`${isTableOnEditMode && "hidden"}`}>
              <span>View type</span>
              <Select
                labelId="select-unit-type"
                id="select-unit-type"
                value={viewType}
                variant="outlined"
                autoComplete="off"
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
                onChange={handleChangeViewType}
              >
                <MenuItem value={TypeUnitText.UnitWeight}>
                  {TypeUnitText.UnitWeight}
                </MenuItem>
                <MenuItem value={TypeUnitText.UnitPercentage}>
                  {TypeUnitText.UnitPercentage}
                </MenuItem>
              </Select>
            </span>
          </div>
        </div>
      </div>
      {/* All child tables */}
      <ContentTables
        unitWeightMasterState={unitWeightTableMasterStateForUI}
        activeChildTab={activeChildTabValue}
      />
      <div className={`group_btn_decision ${!isTableOnEditMode && "hidden"}`}>
        <Button
          type="button"
          variant="outlined"
          onClick={handleCancelEditingTable}
        >
          Cancel
        </Button>
        <Button type="button" variant="contained" onClick={handleSaveTableToDB}>
          Save
        </Button>
      </div>
    </frameworkSettingContext.Provider>
  );
};

export default memo(IndustrySetting);
