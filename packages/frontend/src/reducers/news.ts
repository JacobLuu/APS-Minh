import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { RequestStates } from "../types/request";
import { PayloadError } from "../types/error";

import type { NewsListState } from "../types";

const initialState: NewsListState = {
  news: [],
  company: {
    id: 0,
    name: "",
    name_cn: "",
  },
  pagination: {
    limit: 0,
    offset: 0,
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

const newsSlice = createSlice({
  name: "newsList",
  initialState,
  reducers: {
    getNewsRequested: (
      state: NewsListState,
      _action: PayloadAction<{
        companyId: number;
        offset: number;
        limit: number;
      }>
    ) => {
      state.requestState = RequestStates.Requested;
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    getNewsSucceeded: (
      state: NewsListState,
      action: PayloadAction<NewsListState>
    ) => {
      const { payload } = action;
      state.news = payload.news;
      state.company = payload.company;
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
    getNewsFailed: (
      state: NewsListState,
      action: PayloadAction<PayloadError>
    ) => {
      const { payload } = action;
      state.requestState = RequestStates.Failed;
      state.news = [];
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

const { actions, reducer } = newsSlice;

export const { getNewsRequested, getNewsSucceeded, getNewsFailed } = actions;

export const selectNews = (state: RootState) => state.newsList;

export default reducer;
