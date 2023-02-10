import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getFactorsSucceeded,
  getFactorsRequested,
  getFactorsFailed,
} from "../reducers/factors";
import factorsService from "../services/factors";

import type { FactorsState, GetFactorsRequest } from "../types/factor";

function* getFactorsFlow(action: PayloadAction<GetFactorsRequest>) {
  const { payload } = action;
  try {
    const response: AxiosResponse<FactorsState> = yield call(
      factorsService.getMany,
      payload
    );
    yield put({
      type: getFactorsSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getFactorsFailed.type,
      payload: {
        statusCode: response?.status,
        message: response?.data?.message,
      },
    });
  }
}

function* factorsWatcher() {
  yield takeEvery(getFactorsRequested.type, getFactorsFlow);
}

export default {
  factorsWatcher,
};
