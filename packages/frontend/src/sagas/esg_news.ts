import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getEsgNewsFailed,
  getEsgNewsRequested,
  getEsgNewsSucceeded,
} from "../reducers/esg_news";
import esgNewsService from "../services/esg_news";

import type { EsgNewsState } from "../types";

function* getEsgNewsFlow(
  action: PayloadAction<{
    esg_news_factor_id: number;
    limit: number;
    offset: number;
  }>
) {
  try {
    const { esg_news_factor_id, limit, offset } = action.payload;
    const response: AxiosResponse<EsgNewsState> = yield call(
      esgNewsService.getEsgNews,
      esg_news_factor_id,
      limit,
      offset
    );

    yield put({
      type: getEsgNewsSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;

    yield put({
      type: getEsgNewsFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getEsgNewsWatcher() {
  yield takeEvery(getEsgNewsRequested.type, getEsgNewsFlow);
}

export default {
  getEsgNewsWatcher,
};
