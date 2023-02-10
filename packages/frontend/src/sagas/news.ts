import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getNewsFailed,
  getNewsRequested,
  getNewsSucceeded,
} from "../reducers/news";
import newsService from "../services/news";

import type { NewsListState } from "../types";

function* getNewsFlow(
  action: PayloadAction<{ companyId: number; limit: number; offset: number }>
) {
  try {
    const { companyId, limit, offset } = action.payload;
    const response: AxiosResponse<NewsListState> = yield call(
      newsService.getNewsList,
      companyId,
      offset,
      limit
    );
    yield put({
      type: getNewsSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getNewsFailed.type,
      payload: {
        statusCode: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getNewsWatcher() {
  yield takeEvery(getNewsRequested.type, getNewsFlow);
}

export default {
  getNewsWatcher,
};
