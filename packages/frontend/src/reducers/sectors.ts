import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { RequestStates } from "../types/request";
import { PayloadError } from "../types/error";

import type { SectorState } from "../types/sector";

const initialState: SectorState = {
  sectors: [],
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

const categorySlice = createSlice({
  name: "sectors",
  initialState,
  reducers: {
    getSectorsRequested: (
      state: SectorState,
      _action: PayloadAction<SectorState>
    ) => {
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    getSectorsSucceeded: (
      state: SectorState,
      action: PayloadAction<SectorState>
    ) => {
      const { payload } = action;
      state.sectors = payload.sectors;
      state.status = {
        ...state.status,
        isInitialized: true,
        isFetching: false,
        isSuccess: true,
        isError: false,
      };
      state.statusCode = 200;
      state.error.message = "";
    },
    getSectorsFailed: (state, action: PayloadAction<PayloadError>) => {
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

const { actions, reducer } = categorySlice;

export const { getSectorsRequested, getSectorsSucceeded, getSectorsFailed } =
  actions;

export const selectSectors = (state: RootState) => state.sectors;

export default reducer;
