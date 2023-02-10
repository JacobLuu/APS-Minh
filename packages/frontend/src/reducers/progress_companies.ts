import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { Pagination, ProgressCompaniesState, RequestStates } from "../types";
import { PayloadError } from "../types/error";

const initialState: ProgressCompaniesState = {
  company_scores: [
    {
      company: {
        id: null,
        name_cn: "",
        name: "",
      },
      completed_metric_count: null,
      id: null,
      metric_count: null,
    },
  ],
  pagination: {
    direction: "desc",
    limit: null,
    offset: null,
    total_count: 0,
  },
  requestState: RequestStates.Initial,
  status: {
    isInitialized: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  statusCode: null,
  error: {
    message: "",
  },
};

const progressCompaniesSlice = createSlice({
  name: "progressCompanies",
  initialState,
  reducers: {
    getProgressCompaniesRequested: (
      state: ProgressCompaniesState,
      _action: PayloadAction<{ pagination: Pagination }>
    ) => {
      state.requestState = RequestStates.Requested;
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    getProgressCompaniesSucceeded: (
      state: ProgressCompaniesState,
      action: PayloadAction<ProgressCompaniesState>
    ) => {
      const { payload } = action;
      state.company_scores = payload.company_scores;
      state.pagination = payload.pagination;
      state.requestState = RequestStates.Succeeded;
      state.status = {
        isInitialized: true,
        isFetching: false,
        isSuccess: true,
        isError: false,
      };
      state.statusCode = 200;
      state.error.message = "";
    },
    getProgressCompaniesFailed: (
      state: ProgressCompaniesState,
      action: PayloadAction<PayloadError>
    ) => {
      state.requestState = RequestStates.Failed;
      const { payload } = action;
      state.status = {
        ...state.status,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
      state.statusCode = payload.statusCode;
      state.error.message = payload.message;
    },
  },
});

const { actions, reducer } = progressCompaniesSlice;

export const {
  getProgressCompaniesRequested,
  getProgressCompaniesSucceeded,
  getProgressCompaniesFailed,
} = actions;

export const selectProgressCompaniesCompanies = (state: RootState) =>
  state.progressCompanies;

export default reducer;
