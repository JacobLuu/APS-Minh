import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  getDashboardSucceeded,
  getDashboardRequested,
  getDashboardFailed,
} from "../reducers/dashboard";
import dashboardService from "../services/dashboard";

import type { DashboardState } from "../types";

function* getDashboardFlow() {
  try {
    const response: AxiosResponse<DashboardState> = yield call(
      dashboardService.getDashboard
    );
    yield put({
      type: getDashboardSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getDashboardFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getDashboardWatcher() {
  yield takeEvery(getDashboardRequested.type, getDashboardFlow);
}

export default {
  getDashboardWatcher,
};
