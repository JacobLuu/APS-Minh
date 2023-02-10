import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../constants/enums";

import { RootState } from "../store/store";

import type { HistoriesState } from "../types";

const initialState: HistoriesState = {
  histories: [
    {
      after_value: "",
      before_value: "",
      change_reason: "",
      changed_item: "",
      created_at: 0,
      data_type: "",
      id: 0,
      label: "",
      member: {
        created_at: 0,
        email_address: "",
        first_name: "",
        id: "",
        last_name: "",
        organization_id: "",
        role: "",
        updated_at: 0,
        language: Language.english,
      },
    },
  ],
  pagination: {
    limit: 0,
    offset: 0,
    total_count: 0,
  },
};

const historiesSlice = createSlice({
  name: "histories",
  initialState,
  reducers: {
    getCategoryHistoriesRequested: (
      _state: HistoriesState,
      _action: PayloadAction<number>
    ) => {},
    getCategoryHistoriesSucceeded: (
      state: HistoriesState,
      action: PayloadAction<HistoriesState>
    ) => {
      const { payload } = action;
      state.histories = payload.histories;
      state.pagination = payload.pagination;
    },
    getCategoryHistoriesFailed: () => {},
    getFactorsByCategoryHistoriesRequested: (
      _state: HistoriesState,
      _action: PayloadAction<number>
    ) => {},
    getFactorsByCategoryHistoriesSucceeded: (
      state: HistoriesState,
      action: PayloadAction<HistoriesState>
    ) => {
      const { payload } = action;
      state.histories = payload.histories;
      state.pagination = payload.pagination;
    },
    getFactorsByCategoryHistoriesFailed: () => {},
    getFactorHistoriesRequested: (
      _state: HistoriesState,
      _action: PayloadAction<number>
    ) => {},
    getFactorHistoriesSucceeded: (
      state: HistoriesState,
      action: PayloadAction<HistoriesState>
    ) => {
      const { payload } = action;
      state.histories = payload.histories;
      state.pagination = payload.pagination;
    },
    getFactorHistoriesFailed: () => {},
    getQuantitativeHistoriesRequested: (
      _state: HistoriesState,
      _action: PayloadAction<number>
    ) => {},
    getQuantitativeHistoriesSucceeded: (
      state: HistoriesState,
      action: PayloadAction<HistoriesState>
    ) => {
      const { payload } = action;
      state.histories = payload.histories;
      state.pagination = payload.pagination;
    },
    getQuantitativeHistoriesFailed: () => {},
    getQualitativeHistoriesRequested: (
      _state: HistoriesState,
      _action: PayloadAction<number>
    ) => {},
    getQualitativeHistoriesSucceeded: (
      state: HistoriesState,
      action: PayloadAction<HistoriesState>
    ) => {
      const { payload } = action;
      state.histories = payload.histories;
      state.pagination = payload.pagination;
    },
    getQualitativeHistoriesFailed: () => {},
    getExtractedResultHistoriesRequested: (
      _state: HistoriesState,
      _action: PayloadAction<number>
    ) => {},
    getExtractedResultHistoriesSucceeded: (
      state: HistoriesState,
      action: PayloadAction<HistoriesState>
    ) => {
      const { payload } = action;
      state.histories = payload.histories;
      state.pagination = payload.pagination;
    },
    getExtractedResultHistoriesFailed: () => {},
  },
});

const { actions, reducer } = historiesSlice;

export const {
  getCategoryHistoriesRequested,
  getCategoryHistoriesSucceeded,
  getCategoryHistoriesFailed,
  getFactorsByCategoryHistoriesRequested,
  getFactorsByCategoryHistoriesSucceeded,
  getFactorsByCategoryHistoriesFailed,
  getFactorHistoriesRequested,
  getFactorHistoriesSucceeded,
  getFactorHistoriesFailed,
  getQuantitativeHistoriesRequested,
  getQuantitativeHistoriesSucceeded,
  getQuantitativeHistoriesFailed,
  getQualitativeHistoriesRequested,
  getQualitativeHistoriesSucceeded,
  getQualitativeHistoriesFailed,
  getExtractedResultHistoriesRequested,
  getExtractedResultHistoriesSucceeded,
  getExtractedResultHistoriesFailed,
} = actions;

export const selectHistories = (state: RootState) => state.histories;

export default reducer;
