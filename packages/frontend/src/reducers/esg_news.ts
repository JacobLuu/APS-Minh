import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { RequestStates } from "../types/request";

import type { EsgNewsState } from "../types";

const initialState: EsgNewsState = {
  esg_news: [],
  esg_news_category: {
    id: 0,
    title: "",
  },
  pagination: {
    limit: 0,
    offset: 0,
    total_count: 0,
  },
  requestState: RequestStates.Initial,
};

const newsSlice = createSlice({
  name: "newsList",
  initialState,
  reducers: {
    getEsgNewsRequested: (
      state: EsgNewsState,
      _action: PayloadAction<{
        esg_news_factor_id: number;
        offset: number;
        limit: number;
      }>
    ) => {
      state.requestState = RequestStates.Requested;
    },
    getEsgNewsSucceeded: (
      state: EsgNewsState,
      action: PayloadAction<EsgNewsState>
    ) => {
      state = {
        ...action.payload,
        requestState: RequestStates.Succeeded,
      };
      return state;
    },
    getEsgNewsFailed: (state: EsgNewsState) => {
      state.requestState = RequestStates.Failed;
    },
  },
});

const { actions, reducer } = newsSlice;

export const { getEsgNewsRequested, getEsgNewsSucceeded, getEsgNewsFailed } =
  actions;

export const selectEsgNews = (state: RootState) => state.esgNews;

export default reducer;
