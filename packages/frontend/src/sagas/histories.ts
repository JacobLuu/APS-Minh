import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getCategoryHistoriesFailed,
  getCategoryHistoriesRequested,
  getCategoryHistoriesSucceeded,
  getExtractedResultHistoriesFailed,
  getExtractedResultHistoriesRequested,
  getExtractedResultHistoriesSucceeded,
  getFactorHistoriesFailed,
  getFactorHistoriesRequested,
  getFactorHistoriesSucceeded,
  getFactorsByCategoryHistoriesFailed,
  getFactorsByCategoryHistoriesRequested,
  getFactorsByCategoryHistoriesSucceeded,
  getQualitativeHistoriesFailed,
  getQualitativeHistoriesRequested,
  getQualitativeHistoriesSucceeded,
  getQuantitativeHistoriesFailed,
  getQuantitativeHistoriesRequested,
  getQuantitativeHistoriesSucceeded,
} from "../reducers/histories";
import historyService from "../services/histories";

import type { HistoriesState } from "../types";

function* getCategoryHistoriesFlow(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<HistoriesState> = yield call(
      historyService.getCategoryHistories,
      action.payload
    );
    yield put({
      type: getCategoryHistoriesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCategoryHistoriesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getFactorsByCategoryHistoriesFlow(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<HistoriesState> = yield call(
      historyService.getFactorsByCategoryHistories,
      action.payload
    );
    yield put({
      type: getFactorsByCategoryHistoriesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getFactorsByCategoryHistoriesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getFactorHistoriesFlow(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<HistoriesState> = yield call(
      historyService.getFactorHistories,
      action.payload
    );
    yield put({
      type: getFactorHistoriesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getFactorHistoriesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getQuantitativeHistoriesFlow(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<HistoriesState> = yield call(
      historyService.getQuantitativeHistories,
      action.payload
    );
    yield put({
      type: getQuantitativeHistoriesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getQuantitativeHistoriesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getQualitativeHistoriesFlow(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<HistoriesState> = yield call(
      historyService.getQualitativeHistories,
      action.payload
    );
    yield put({
      type: getQualitativeHistoriesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getQualitativeHistoriesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getExtractedResultHistoriesFlow(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<HistoriesState> = yield call(
      historyService.getExtractedResultHistories,
      action.payload
    );
    yield put({
      type: getExtractedResultHistoriesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getExtractedResultHistoriesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* historiesWatcher() {
  yield takeEvery(getCategoryHistoriesRequested.type, getCategoryHistoriesFlow);
  yield takeEvery(
    getFactorsByCategoryHistoriesRequested.type,
    getFactorsByCategoryHistoriesFlow
  );
  yield takeEvery(getFactorHistoriesRequested.type, getFactorHistoriesFlow);
  yield takeEvery(
    getQuantitativeHistoriesRequested.type,
    getQuantitativeHistoriesFlow
  );
  yield takeEvery(
    getQualitativeHistoriesRequested.type,
    getQualitativeHistoriesFlow
  );
  yield takeEvery(
    getExtractedResultHistoriesRequested.type,
    getExtractedResultHistoriesFlow
  );
}

export default {
  historiesWatcher,
};
