import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { TeamNotesState } from "../types";
import { RequestStates } from "../types/request";
import { PayloadError } from "../types/error";

const initialState: TeamNotesState = {
  direction: "",
  limit: 0,
  list: [],
  offset: 0,
  order: "",
  total_count: 0,
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

const notesSlice = createSlice({
  name: "teamNotes",
  initialState,
  reducers: {
    getTeamNotesRequested: (
      state: TeamNotesState,
      _action: PayloadAction<{
        category_score_id: number;
      }>
    ) => {
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    getTeamNotesSucceeded: (state, action: PayloadAction<TeamNotesState>) => {
      const { payload } = action;
      state.direction = payload.direction;
      state.limit = payload.limit;
      state.list = payload.list;
      state.offset = payload.offset;
      state.order = payload.order;
      state.total_count = payload.total_count;
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
    getTeamNotesFailed: (state, action: PayloadAction<PayloadError>) => {
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
    updateTeamNotesRequested: (
      state: TeamNotesState,
      _data: PayloadAction<{
        id: number;
        content: string;
      }>
    ) => {
      state.requestState = RequestStates.Requested;
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    updateNotesSucceeded: (state: TeamNotesState, _data) => {
      state.requestState = RequestStates.Succeeded;
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
    updateNotesFailed: (
      state: TeamNotesState,
      action: PayloadAction<PayloadError>
    ) => {
      const { payload } = action;
      state.requestState = RequestStates.Failed;
      state.status = {
        ...state.status,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
      state.statusCode = payload.statusCode;
      state.error.message = payload.message;
    },
    createTeamNoteRequested: (
      state,
      _data: PayloadAction<{
        category_score_id: number;
        content: string;
        member_id: string;
      }>
    ) => {
      state.requestState = RequestStates.Requested;
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    createNoteSucceeded: (state, _data) => {
      state.requestState = RequestStates.Succeeded;
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
    createNoteFailed: (state, action: PayloadAction<PayloadError>) => {
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
const { actions, reducer } = notesSlice;

export const {
  getTeamNotesRequested,
  getTeamNotesSucceeded,
  getTeamNotesFailed,
  updateTeamNotesRequested,
  updateNotesSucceeded,
  updateNotesFailed,
  createTeamNoteRequested,
  createNoteSucceeded,
  createNoteFailed,
} = actions;

export const selectTeamNotes = (state: RootState) => state.teamNotes;

export default reducer;
