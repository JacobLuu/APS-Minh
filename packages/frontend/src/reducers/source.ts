import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import {
  DocumentUrl,
  ExtractedResultForm as ExtractedResultFormInterface,
  RequestStates,
  SourceState,
} from "../types";

const initialState: SourceState = {
  category: {
    category_type: null,
    id: null,
  },
  company: {
    id: null,
    name: "",
    name_cn: "",
  },
  extracted_result_score: {
    document: {
      id: null,
      name: null,
      url: null,
    },
    id: null,
    overall_score: null,
    extracted_result_pages: [],
    weightage: null,
  },
  indicator_key: {
    indicator_keywords: [],
    id: null,
    label: null,
    indicator_key_setting: null,
  },
  factor: {
    id: null,
    label: null,
  },
  requestState: RequestStates.Initial,
};

const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    resetSource: (state) => {
      state = initialState;
      return state;
    },
    getDocumentRequested: (_state, _action) => {},
    getDocumentSucceed: (state, action: PayloadAction<DocumentUrl>) => {
      const { payload } = action;
      state.extracted_result_score.document = payload;
    },
    getDocumentFailed: (_state, _action) => {},
    getExtractedResultRequested: (
      _state,
      _action: PayloadAction<{ extracted_result_score_id: number }>
    ) => {},
    getExtractedResultSucceeded: (
      state,
      action: PayloadAction<SourceState>
    ) => {
      const { payload } = action;
      state.category = payload.category;
      state.company = payload.company;
      state.factor = payload.factor;
      state.extracted_result_score = payload.extracted_result_score;
      state.indicator_key = payload.indicator_key;
    },
    getExtractedResultFailed: () => {},
    updateExtractedResultRequested: (
      state,
      _action: PayloadAction<{
        extracted_result_score_id: number;
        data: ExtractedResultFormInterface;
      }>
    ) => {
      state.requestState = RequestStates.Requested;
    },
    updateExtractedResultSucceeded: (
      state: SourceState,
      action: PayloadAction<{
        extracted_result_score_id: number;
        data: ExtractedResultFormInterface;
      }>
    ) => {
      const { payload } = action;
      state.extracted_result_score.overall_score = payload.data.overall_score;

      let valuesIndex = 0;
      for (
        let i = 0;
        i < state.extracted_result_score.extracted_result_pages.length;
        i += 1
      ) {
        const page = state.extracted_result_score.extracted_result_pages[i];
        for (let j = 0; j < page.extracted_result_values.length; j += 1) {
          const { disclosure, unit } =
            payload.data.extracted_result_values[valuesIndex];
          state.extracted_result_score.extracted_result_pages[
            i
          ].extracted_result_values[j].disclosure = disclosure;
          state.extracted_result_score.extracted_result_pages[
            i
          ].extracted_result_values[j].unit = unit;
          valuesIndex += 1;
        }
      }
      state.requestState = RequestStates.Succeeded;
    },
    updateExtractedResultFailed: (state: SourceState) => {
      state.requestState = RequestStates.Failed;
    },
  },
});

const { actions, reducer } = sourceSlice;

export const {
  resetSource,
  getDocumentRequested,
  getDocumentSucceed,
  getDocumentFailed,
  getExtractedResultRequested,
  getExtractedResultSucceeded,
  getExtractedResultFailed,
  updateExtractedResultRequested,
  updateExtractedResultSucceeded,
  updateExtractedResultFailed,
} = actions;

export const selectSource = (state: RootState) => state.source;

export default reducer;
