import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../constants/enums";

import { RootState } from "../store/store";
import { MembersState, RequestStates } from "../types";

const initialState: MembersState = {
  members: [
    {
      email_address: "",
      first_name: "",
      id: "",
      last_name: "",
      organization_id: "",
      role: "",
      language: Language.english,
    },
  ],
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

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    getMembersRequested: (state) => {
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    getMembersSucceeded: (state, action: PayloadAction<MembersState>) => {
      const { payload } = action;
      state.members = payload.members;
      state.pagination = payload.pagination;
      state.status = {
        isInitialized: true,
        isFetching: false,
        isSuccess: true,
        isError: false,
      };
      state.statusCode = 200;
      state.error.message = "";
    },
    getMembersFailed: (state) => {
      state.status = {
        ...state.status,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
    },
    updateRoleRequested: (
      state,
      _action: PayloadAction<{
        memberId: string;
        role: string;
      }>
    ) => {
      state.requestState = RequestStates.Requested;
    },
    updateRoleSucceeded: (state) => {
      state.requestState = RequestStates.Succeeded;
    },
    updateRoleFailed: (state, action) => {
      state.requestState = RequestStates.Failed;
      state.error.message = action.payload.data.message;
    },
  },
});

const { actions, reducer } = membersSlice;

export const {
  getMembersRequested,
  getMembersSucceeded,
  getMembersFailed,
  updateRoleRequested,
  updateRoleSucceeded,
  updateRoleFailed,
} = actions;

export const selectMembers = (state: RootState) => state.members;

export default reducer;
