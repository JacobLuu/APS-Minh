import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  getEsgNewsFactorsFailed,
  getEsgNewsFactorsRequested,
  getEsgNewsFactorsSucceeded,
} from "../reducers/esg_news_factors";
import esgNewsCategoriesService from "../services/esg_news_factors.ts";

import type { EsgNewsFactorsState } from "../types";

function* getEsgNewsFactorsFlow() {
  try {
    const response: AxiosResponse<EsgNewsFactorsState> = yield call(
      esgNewsCategoriesService.getEsgNewsFactors
    );

    yield put({
      type: getEsgNewsFactorsSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;

    yield put({
      type: getEsgNewsFactorsFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getEsgNewsFactorsWatcher() {
  yield takeEvery(getEsgNewsFactorsRequested.type, getEsgNewsFactorsFlow);
}

export default {
  getEsgNewsFactorsWatcher,
};
