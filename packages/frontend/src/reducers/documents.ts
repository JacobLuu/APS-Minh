import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import {
  DocumentList,
  DocumentState,
  Pagination,
  RequestStates,
} from "../types";

const initialState: DocumentState = {
  list: [],
  limit: 0,
  offset: 0,
  total_count: 0,
  requestState: RequestStates.Initial,
};

const membersSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    getDocumentsRequested: (
      state: DocumentState,
      _action: PayloadAction<{
        company_id: number;
        keyword: string;
        pagination?: Pagination;
      }>
    ) => {
      state.requestState = RequestStates.Requested;
      return state;
    },
    getDocumentsSucceeded: (
      state: DocumentState,
      action: PayloadAction<DocumentList>
    ) => {
      const { payload } = action;
      state = {
        ...payload,
        requestState: RequestStates.Succeeded,
      };
      return state;
    },
    getDocumentsFailed: (state: DocumentState) => {
      state.requestState = RequestStates.Failed;
      return state;
    },
  },
});

const { actions, reducer } = membersSlice;

export const {
  getDocumentsRequested,
  getDocumentsSucceeded,
  getDocumentsFailed,
} = actions;

export const selectDocuments = (state: RootState) => state.documents;

export default reducer;
