import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getRankingListRequest,
  getRankingListSucceeded,
} from "../reducers/company_ranking_category_view";
import companyService from "../services/company";
import { successStatus } from "../constants/status";

interface IResponseRankingBySector {
  ranking_list: any[];
  total_count: number;
  status: number;
}

function* getRankingListFlow({
  payload,
}: PayloadAction<{
  // 🔴 Todo: move to type
  sector_id?: number;
  category_id?: number;
  offset: number;
  limit: number;
  direction: "asc" | "desc";
}>) {
  try {
    const response: AxiosResponse<IResponseRankingBySector> = yield call(
      companyService.getCompanyRankingCategoryView,
      payload
    );
    if (successStatus.test(`${response.status}`)) {
      yield put({
        type: getRankingListSucceeded.type,
        payload: response.data,
      });
    }
  } catch (error: any) {
    console.error(["Something went wrong. More Info: ", error]);
  }
}

function* watcher() {
  yield takeEvery(getRankingListRequest.type, getRankingListFlow);
}

export default {
  watcher,
};
