import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { FactorsState, GetFactorsRequest } from "../types/factor";
import { PayloadError } from "../types/error";

const initialState: FactorsState = {
  list: [],
  direction: null,
  limit: null,
  offset: null,
  total_count: null,
  order: null,
  status: {
    isInitialized: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  statusCode: null,
  error: {
    message: null,
  },
};

const factorSlice = createSlice({
  name: "factor",
  initialState,
  reducers: {
    getFactorsRequested: (
      state: FactorsState,
      _action: PayloadAction<GetFactorsRequest>
    ) => {
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    getFactorsSucceeded: (state, action: PayloadAction<FactorsState>) => {
      const { payload } = action;
      state = {
        ...state,
        ...payload,
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
    getFactorsFailed: (state, action: PayloadAction<PayloadError>) => {
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

const { actions, reducer } = factorSlice;

export const { getFactorsRequested, getFactorsSucceeded, getFactorsFailed } =
  actions;

export const selectFactors = (state: RootState) => state.factors;

export default reducer;
