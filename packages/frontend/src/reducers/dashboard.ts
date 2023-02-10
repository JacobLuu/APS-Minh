import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import type { DashboardState } from "../types";

const initialState: DashboardState = {
  companies: {
    bottom_companies: [],
    top_companies: [],
    company_count: 0,
    esg_task_companies: [],
  },
  last_news: [],
  overhead_news: [],
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

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getDashboardRequested: (state: DashboardState) => {
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    getDashboardSucceeded: (
      state: DashboardState,
      action: PayloadAction<DashboardState>
    ) => {
      state = {
        ...action.payload,
        status: {
          isInitialized: true,
          isFetching: false,
          isSuccess: true,
          isError: false,
        },
        statusCode: 200,
        error: {
          message: "",
        },
      };
      return state;
    },
    getDashboardFailed: (state) => {
      state.status = {
        ...state.status,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
    },
  },
});

const { actions, reducer } = dashboardSlice;

export const {
  getDashboardSucceeded,
  getDashboardRequested,
  getDashboardFailed,
} = actions;

export const selectDashboard = (state: RootState) => state.dashboard;

export default reducer;
