import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { isUnauthorized } from "../utils/status";

// This is the shared reducer which handles common states for all slices like loading state or error message
// Every action that ended with either 'Requested' or 'Succeeded' or 'Failed' when dispatched will be handled here after
// being handled in its reducer
const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    loading: false,
    isTokenExpired: false,
  },
  reducers: {
    resetTokenExpiredToFalse: (state) => {
      state.isTokenExpired = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith("Requested"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("Succeeded"),
      (state) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("Failed"),
      (state, action) => {
        const { payload } = action;
        if (isUnauthorized(String(payload.status))) {
          state.isTokenExpired = true;
        }
        state.loading = false;
      }
    );
  },
});

const { actions, reducer } = sharedSlice;

export const { resetTokenExpiredToFalse } = actions;

export const selectSharedState = (state: RootState) => state.shared;

export default reducer;
