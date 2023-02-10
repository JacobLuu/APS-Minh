import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";

import type { CompaniesState } from "../types";

const initialState: CompaniesState = {
  direction: "",
  limit: 0,
  list: [],
  total_count: 0,
  offset: 0,
  order: "",
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    getCompaniesRequested: (
      _state: CompaniesState,
      _action: PayloadAction<CompaniesState>
    ) => {},
    getCompaniesSucceeded: (
      _state: CompaniesState,
      action: PayloadAction<CompaniesState>
    ) => {
      return action.payload;
    },
    getCompaniesFailed: () => {},
  },
});

const { actions, reducer } = companySlice;

export const {
  getCompaniesSucceeded,
  getCompaniesRequested,
  getCompaniesFailed,
} = actions;

export const selectCompanies = (state: RootState) => state.companies;

export default reducer;
