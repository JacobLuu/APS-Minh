import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getCompaniesFailed,
  getCompaniesRequested,
  getCompaniesSucceeded,
} from "../reducers/ranking_companies";
import companyService from "../services/company";

import type { CompaniesState } from "../types";

function* getCompaniesFlow(
  action: PayloadAction<{ limit?: number; offset?: number; keyword?: string }>
) {
  try {
    const response: AxiosResponse<CompaniesState> = yield call(
      companyService.getCompaniesNew,
      action.payload
    );
    yield put({
      type: getCompaniesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCompaniesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* companiesWatcher() {
  yield takeEvery(getCompaniesRequested.type, getCompaniesFlow);
}

export default {
  companiesWatcher,
};
