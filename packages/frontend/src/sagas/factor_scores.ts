import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getFactorScoreFailed,
  getFactorScoreRequested,
  getFactorScoreSucceeded,
} from "../reducers/factor_scores";
import factorScoresService from "../services/factor_scores";

import type { FactorScoreState } from "../types";

function* getFactorScoreFlow(action: PayloadAction<{ id: number }>) {
  const { payload } = action;
  try {
    const response: AxiosResponse<FactorScoreState> = yield call(
      factorScoresService.getOne,
      payload.id
    );
    yield put({
      type: getFactorScoreSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({
      type: getFactorScoreFailed.type,
      payload: error.response,
    });
  }
}

function* factorScoresWatcher() {
  yield takeEvery(getFactorScoreRequested.type, getFactorScoreFlow);
}

export default {
  factorScoresWatcher,
};
