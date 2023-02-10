import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getLastChangedCompaniesFailed,
  getLastChangedCompaniesRequested,
  getLastChangedCompaniesSucceeded,
} from "../reducers/last_changed_companies";
import lastChangedCompaniesService from "../services/last_changed_companies";

function* getLastChangedCompaniesFlow(
  action: PayloadAction<{ limit: number; offset: number }>
) {
  try {
    const { limit, offset } = action.payload;
    const response: AxiosResponse<any> = yield call(
      lastChangedCompaniesService.getLastChangedCompanies,
      offset,
      limit
    );
    const { list, ...pagination } = response.data;
    yield put({
      type: getLastChangedCompaniesSucceeded.type,
      payload: {
        last_changed_companies: list,
        pagination: pagination,
      },
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getLastChangedCompaniesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getLastChangedCompaniesWatcher() {
  yield takeEvery(
    getLastChangedCompaniesRequested.type,
    getLastChangedCompaniesFlow
  );
}

export default {
  getLastChangedCompaniesWatcher,
};
