import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import mockData from "../containers/FrameworkSettingsReview/mockData";
import {
  IFrameworkSettingsState,
  IUnitWeightTableMasterState,
} from "../types/frameworkSettings";

export const initialState: IFrameworkSettingsState = {
  isContainerLoading: false,
  frameworkName: "Framework Name",
  unitWeightTableMasterState: mockData,
};

const frameworkSettingsSlice = createSlice({
  name: "framworkSettings",
  initialState,
  reducers: {
    setIsContainerLoading: (
      state: IFrameworkSettingsState,
      action: PayloadAction<boolean, undefined>
    ) => {
      if (typeof action.payload === "boolean") {
        state.isContainerLoading = action.payload;
      } else {
        state.isContainerLoading = !state.isContainerLoading;
      }
    },
    setFrameworkName: (
      state: IFrameworkSettingsState,
      action: PayloadAction<string>
    ) => {
      state.frameworkName = action.payload;
    },
    setUnitWeightTableMasterState: (
      state: IFrameworkSettingsState,
      action: PayloadAction<IUnitWeightTableMasterState>
    ) => {
      state.unitWeightTableMasterState = action.payload;
    },
  },
});

const { actions, reducer } = frameworkSettingsSlice;

export const {
  setIsContainerLoading,
  setUnitWeightTableMasterState,
  setFrameworkName,
} = actions;

export const selectFrameworkSettings = (state: RootState) =>
  state.frameworkSettings;

export default reducer;
