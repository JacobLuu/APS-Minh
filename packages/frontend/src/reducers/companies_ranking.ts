import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { GetCompaniesRankingPayload } from "../types/category";
import {
  CompaniesRankingState,
  CompaniesState,
  GetRankedCompaniesPayload,
  UpdateRankingPayload,
} from "../types/company";
import { RequestStates } from "../types/request";

import type { CompanyBase } from "../types";

const initialState: CompaniesRankingState = {
  list: [],
  notNullList: [],
  rankedCompaniesTop: [],
  rankedCompaniesBottom: [],
  order: "",
  offset: 0,
  limit: 0,
  direction: "",
  total_count: 0,
  rankingStatusMessage: "",
  requestState: RequestStates.Initial,
  updateRankingStatus: RequestStates.Initial,
  getCompaniesRankingStatus: RequestStates.Initial,
};

const companySlice = createSlice({
  name: "companiesRanking",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
    resetUpdateRankingStatus: (state) => {
      state.updateRankingStatus = RequestStates.Initial;
    },
    getCompaniesRankingRequested: (
      state,
      _action: PayloadAction<GetCompaniesRankingPayload>
    ) => {
      state.requestState = RequestStates.Requested;
      state.list = [];
      state.notNullList = [];
      state.getCompaniesRankingStatus = RequestStates.Requested;
      state.updateRankingStatus = RequestStates.Initial;
    },
    getCompaniesRankingSucceeded: (
      state: CompaniesRankingState,
      action: PayloadAction<CompaniesRankingState>
    ) => {
      const { list }: { list: CompanyBase[] } = action.payload;
      state.list = list || [];
      state.notNullList = list?.filter(
        ({ category }) => category.category_score.overall_score !== null
      );
      state.total_count = action.payload.total_count;
      state.requestState = RequestStates.Succeeded;
      state.getCompaniesRankingStatus = RequestStates.Succeeded;
    },
    getCompaniesRankingFailed: (
      state,
      _action: PayloadAction<GetCompaniesRankingPayload>
    ) => {
      state.requestState = RequestStates.Failed;
      state.getCompaniesRankingStatus = RequestStates.Failed;
    },
    updateCompaniesRankingTopRequest: (
      state,
      _action: PayloadAction<UpdateRankingPayload>
    ) => {
      state.requestState = RequestStates.Requested;
      state.updateRankingStatus = RequestStates.Requested;
    },
    updateCompaniesRankingTopSucceed: (state) => {
      state.requestState = RequestStates.Succeeded;
      state.updateRankingStatus = RequestStates.Succeeded;
    },
    updateCompaniesRankingTopFailed: (state, { payload }) => {
      state.requestState = RequestStates.Failed;
      state.updateRankingStatus = RequestStates.Failed;
      state.rankingStatusMessage = payload.message;
    },
    updateCompaniesRankingBottomRequest: (
      state,
      _action: PayloadAction<UpdateRankingPayload>
    ) => {
      state.requestState = RequestStates.Requested;
      state.updateRankingStatus = RequestStates.Requested;
    },
    updateCompaniesRankingBottomSucceed: (state) => {
      state.requestState = RequestStates.Succeeded;
      state.updateRankingStatus = RequestStates.Succeeded;
    },
    updateCompaniesRankingBottomFailed: (state) => {
      state.requestState = RequestStates.Failed;
      state.updateRankingStatus = RequestStates.Failed;
    },
    getCompaniesRankingTopRequested: (
      state,
      _action: PayloadAction<GetRankedCompaniesPayload>
    ) => {
      state.requestState = RequestStates.Requested;
    },
    getCompaniesRankingTopSucceed: (
      state,
      _action: PayloadAction<CompaniesState>
    ) => {
      const { list } = _action.payload;
      state.requestState = RequestStates.Succeeded;
      state.rankedCompaniesTop = list;
    },
    getCompaniesRankingTopFailed: (state) => {
      state.requestState = RequestStates.Failed;
    },
    getCompaniesRankingBottomRequested: (
      state,
      _action: PayloadAction<GetRankedCompaniesPayload>
    ) => {
      state.requestState = RequestStates.Requested;
    },
    getCompaniesRankingBottomSucceed: (
      state,
      _action: PayloadAction<CompaniesState>
    ) => {
      const { list } = _action.payload;
      state.requestState = RequestStates.Succeeded;
      state.rankedCompaniesBottom = list;
    },
    getCompaniesRankingBottomFailed: (state) => {
      state.requestState = RequestStates.Failed;
    },
  },
});

const { actions, reducer } = companySlice;

export const {
  resetList,
  getCompaniesRankingRequested,
  getCompaniesRankingSucceeded,
  getCompaniesRankingFailed,
  updateCompaniesRankingTopRequest,
  updateCompaniesRankingTopSucceed,
  updateCompaniesRankingTopFailed,
  updateCompaniesRankingBottomRequest,
  updateCompaniesRankingBottomSucceed,
  updateCompaniesRankingBottomFailed,
  getCompaniesRankingTopRequested,
  getCompaniesRankingTopSucceed,
  getCompaniesRankingTopFailed,
  getCompaniesRankingBottomRequested,
  getCompaniesRankingBottomSucceed,
  getCompaniesRankingBottomFailed,
  resetUpdateRankingStatus,
} = actions;

export const selectCompaniesRanking = (state: RootState) =>
  state.companiesRanking;

export default reducer;
