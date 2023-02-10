import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";

import type { CompaniesState } from "../types";

interface ICompanies {
  limit: number;
  offset: number;
  keyword: string;
}

const initialState: CompaniesState = {
  direction: "",
  limit: 0,
  list: [],
  total_count: 0,
  offset: 0,
  order: "",
};

const rankingCompanySlice = createSlice({
  name: "rankingCompanies",
  initialState,
  reducers: {
    getCompaniesRequested: (
      _state: CompaniesState,
      _action: PayloadAction<ICompanies>
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

const { actions, reducer } = rankingCompanySlice;

export const {
  getCompaniesSucceeded,
  getCompaniesRequested,
  getCompaniesFailed,
} = actions;

export const selectRankingCompanies = (state: RootState) =>
  state.rankingCompanies;

export default reducer;
