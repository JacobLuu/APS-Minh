import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { RequestStates } from "../types";

import type { LastChangedCompaniesState } from "../types";

const initialState: LastChangedCompaniesState = {
  last_changed_companies: [],
  pagination: {
    direction: "desc",
    limit: null,
    offset: null,
    total_count: 0,
  },
  requestState: RequestStates.Initial,
};

const lastChangedCompaniesSlice = createSlice({
  name: "lastChangedCompanies",
  initialState,
  reducers: {
    getLastChangedCompaniesRequested: (
      state: LastChangedCompaniesState,
      _action: PayloadAction<{ offset: number; limit: number }>
    ) => {
      state.requestState = RequestStates.Requested;
    },
    getLastChangedCompaniesSucceeded: (
      state: LastChangedCompaniesState,
      action: PayloadAction<LastChangedCompaniesState>
    ) => {
      const { payload } = action;
      state.last_changed_companies = payload.last_changed_companies;
      state.pagination = payload.pagination;
      state.requestState = RequestStates.Succeeded;
    },
    getLastChangedCompaniesFailed: (state: LastChangedCompaniesState) => {
      state.requestState = RequestStates.Failed;
    },
  },
});

const { actions, reducer } = lastChangedCompaniesSlice;

export const {
  getLastChangedCompaniesRequested,
  getLastChangedCompaniesSucceeded,
  getLastChangedCompaniesFailed,
} = actions;

export const selectLastChangedCompanies = (state: RootState) =>
  state.lastChangedCompanies;

export default reducer;
