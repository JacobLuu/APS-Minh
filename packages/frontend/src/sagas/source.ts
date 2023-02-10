import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getDocumentFailed,
  getDocumentRequested,
  getDocumentSucceed,
  getExtractedResultFailed,
  getExtractedResultRequested,
  getExtractedResultSucceeded,
  updateExtractedResultFailed,
  updateExtractedResultRequested,
  updateExtractedResultSucceeded,
} from "../reducers/source";
import documentService from "../services/document";
import extractedResultsService from "../services/extracted_results";
import sourceService from "../services/source";

import type {
  SourceState,
  DocumentUrl,
  ExtractedResultForm as ExtractedResultFormInterface,
} from "../types";

function* getDocumentFlow(
  action: PayloadAction<{
    document_id: number;
  }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<DocumentUrl> = yield call(
      documentService.getDocumentTempUrl,
      payload.document_id
    );
    yield put({
      type: getDocumentSucceed.type,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({ type: getDocumentFailed.type, payload: error.response });
  }
}

function* getExtractedResultFlow(
  action: PayloadAction<{
    extracted_result_score_id: number;
  }>
) {
  try {
    const response: AxiosResponse<SourceState> = yield call(
      sourceService.getExtractedResult,
      action.payload.extracted_result_score_id
    );
    yield put({
      type: getExtractedResultSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({ type: getExtractedResultFailed.type, payload: error.response });
  }
}

function* updateExtractedResultFlow(
  action: PayloadAction<{
    extracted_result_score_id: number;
    data: ExtractedResultFormInterface;
  }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<{ result: string }> = yield call(
      extractedResultsService.updateExtractedResult,
      payload.extracted_result_score_id,
      payload.data
    );
    yield put({
      type: updateExtractedResultSucceeded.type,
      payload: {
        data: payload.data,
        result: response.data.result,
      },
    });
  } catch (error: any) {
    yield put({
      type: updateExtractedResultFailed.type,
      payload: error.response,
    });
  }
}

function* sourceWatcher() {
  yield takeEvery(getDocumentRequested.type, getDocumentFlow);
  yield takeEvery(getExtractedResultRequested.type, getExtractedResultFlow);
  yield takeEvery(
    updateExtractedResultRequested.type,
    updateExtractedResultFlow
  );
}

export default {
  sourceWatcher,
};
