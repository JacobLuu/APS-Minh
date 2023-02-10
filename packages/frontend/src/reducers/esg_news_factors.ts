import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { RequestStates } from "../types/request";

import type { EsgNewsFactorsState } from "../types";

const initialState: EsgNewsFactorsState = {
  direction: "asc",
  list: [],
  limit: 0,
  offset: 0,
  order: "id",
  total_count: 0,
  requestState: RequestStates.Initial,
};

const newsSlice = createSlice({
  name: "esgNewsKeywords",
  initialState,
  reducers: {
    getEsgNewsFactorsRequested: (state: EsgNewsFactorsState) => {
      state.requestState = RequestStates.Requested;
    },
    getEsgNewsFactorsSucceeded: (
      state: EsgNewsFactorsState,
      action: PayloadAction<EsgNewsFactorsState>
    ) => {
      state = {
        ...action.payload,
        requestState: RequestStates.Succeeded,
      };
      return state;
    },
    getEsgNewsFactorsFailed: (state: EsgNewsFactorsState) => {
      state.requestState = RequestStates.Failed;
    },
  },
});

const { actions, reducer } = newsSlice;

export const {
  getEsgNewsFactorsRequested,
  getEsgNewsFactorsSucceeded,
  getEsgNewsFactorsFailed,
} = actions;

export const selectEsgNewsFactors = (state: RootState) => state.esgNewsFactors;

export default reducer;
