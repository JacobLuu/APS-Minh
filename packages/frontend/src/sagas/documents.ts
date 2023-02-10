import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getDocumentsFailed,
  getDocumentsRequested,
  getDocumentsSucceeded,
} from "../reducers/documents";
import documentService from "../services/document";
import { DocumentList, Pagination } from "../types";

function* getDocumentsFlow(
  action: PayloadAction<{
    company_id: number;
    keyword: string;
    pagination?: Pagination;
  }>
) {
  try {
    const { company_id, keyword, pagination } = action.payload;

    const response: AxiosResponse<DocumentList> = yield call(
      documentService.getDocuments,
      company_id,
      keyword,
      pagination
    );

    yield put({
      type: getDocumentsSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({ type: getDocumentsFailed.type, payload: error.response });
  }
}

function* getDocumentsWatcher() {
  yield takeEvery(getDocumentsRequested.type, getDocumentsFlow);
}

export default {
  getDocumentsWatcher,
};
