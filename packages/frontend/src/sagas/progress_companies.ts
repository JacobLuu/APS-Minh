import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getProgressCompaniesFailed,
  getProgressCompaniesRequested,
  getProgressCompaniesSucceeded,
} from "../reducers/progress_companies";
import companyService from "../services/company";

import type { ProgressCompaniesState, Pagination } from "../types";

function* getProgressCompaniesFlow(
  action: PayloadAction<{ pagination: Pagination }>
) {
  try {
    const { pagination } = action.payload;
    const response: AxiosResponse<ProgressCompaniesState> = yield call(
      companyService.getProgressCompanies,
      pagination
    );
    yield put({
      type: getProgressCompaniesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getProgressCompaniesFailed.type,
      payload: {
        statusCode: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* progressCompaniesWatcher() {
  yield takeEvery(getProgressCompaniesRequested.type, getProgressCompaniesFlow);
}

export default {
  progressCompaniesWatcher,
};
