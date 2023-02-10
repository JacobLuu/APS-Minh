import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { FactorScore, FactorScoresState, RequestStates } from "../types";

const initialState: FactorScoresState = {
  factor_scores_by_id: {},
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

const factorScoresSlice = createSlice({
  name: "factor_scores",
  initialState,
  reducers: {
    getFactorScoreRequested: (
      state: FactorScoresState,
      _action: PayloadAction<{ id: number }>
    ) => {
      state.requestState = RequestStates.Requested;
      state.status = {
        ...state.status,
        isFetching: true,
      };
      return state;
    },
    getFactorScoreSucceeded: (
      state: FactorScoresState,
      action: PayloadAction<FactorScore>
    ) => {
      const { payload } = action;
      return {
        factor_scores_by_id: {
          ...state.factor_scores_by_id,
          [payload.id]: payload,
        },
        requestState: RequestStates.Succeeded,
        status: {
          ...state.status,
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
    },
    getFactorScoreFailed: (
      state: FactorScoresState,
      _action: PayloadAction<any>
    ) => {
      state.requestState = RequestStates.Failed;
      state.status = {
        ...state.status,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
      return state;
    },
  },
});

const { actions, reducer } = factorScoresSlice;

export const {
  getFactorScoreRequested,
  getFactorScoreSucceeded,
  getFactorScoreFailed,
} = actions;

export const selectFactorScores = (state: RootState) => state.factorScores;

export default reducer;
