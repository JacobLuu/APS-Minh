import { AxiosResponse } from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import { successStatus } from "../constants/status";
import {
  getCompanyDetailsFailed,
  getCompanyDetailsRequested,
  getCompanyDetailsSucceeded,
  getMonthlyCategoryScoreFail,
  getMonthlyCategoryScoreRequest,
  getMonthlyCategoryScoreSucceed,
  handleShowLoadingOverlay,
  updateFactorWeightagesFailed,
  updateFactorWeightagesRequested,
  updateFactorWeightagesSucceeded,
  updateCompanyStockInfo,
  addFactorScoreFailed,
  addFactorScoreRequested,
  addFactorScoreSucceeded,
} from "../reducers/company";
import companyService from "../services/company";
import factorScoresService from "../services/factor_scores";
import answersService from "../services/answers";

import type { CompanyDetailsState, FactorWeightagesPayload } from "../types";

function* getStockPriceFlow(ticker) {
  try {
    const response = yield call(companyService.getCompanyStockInfo, ticker);
    if (successStatus.test(response.status)) {
      yield put({
        type: updateCompanyStockInfo.type,
        payload: response.data,
      });
    }
  } catch (error) {
    console.error(["Error information ", error]);
  }
}

function* getCompanyDetailsFlow(
  action: PayloadAction<{
    company_id: number;
    category_id?: number;
  }>
) {
  if (isNaN(Number(action.payload?.company_id))) {
    throw Error(`The company_id of ${action.payload.company_id} is not valid`);
  }
  try {
    const response: AxiosResponse<CompanyDetailsState> = yield call(
      companyService.getCompanyDetails,
      action.payload.company_id,
      action.payload.category_id
    );
    yield put({
      type: getCompanyDetailsSucceeded.type,
      payload: response.data,
    });
    yield getStockPriceFlow(response.data.ticker);
    yield put(handleShowLoadingOverlay(false));
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCompanyDetailsFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
    yield put(handleShowLoadingOverlay(false));
  }
}

function* updateFactorWeightagesFlow(
  action: PayloadAction<FactorWeightagesPayload>
) {
  try {
    const response: AxiosResponse<CompanyDetailsState> = yield call(
      factorScoresService.editWeightages,
      action.payload
    );
    yield put({
      type: updateFactorWeightagesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: updateFactorWeightagesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* addFactorScoreFlow(
  action: PayloadAction<{
    company_id: number;
    category_id?: number;
    answers: [
      {
        member_id: string;
        qualitative_score_id: number;
        overall_score: number;
        text: string;
      }
    ];
  }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<any> = yield call(
      answersService.createMany,
      payload
    );
    yield put({
      type: addFactorScoreSucceeded.type,
      payload: response.data,
    });
    yield put({
      type: getCompanyDetailsRequested.type,
      payload: {
        company_id: payload.company_id,
        category_id: payload.category_id,
      },
    });
  } catch (error: any) {
    yield put({ type: addFactorScoreFailed.type, payload: error.response });
  }
}

function* getMonthlyCategoryScoreFlow({ payload }) {
  try {
    const request = () => companyService.getMonthlyCategoryScore(payload);
    const response = yield call(request);
    if (successStatus.test(response.status)) {
      yield put({
        type: getMonthlyCategoryScoreSucceed.type,
        payload: response.data,
      });
    } else {
      yield put(getMonthlyCategoryScoreFail(response));
    }
  } catch (error) {
    yield put({ type: getMonthlyCategoryScoreFail.type, payload: error });
  }
}

function* companyWatcher() {
  yield takeLatest(getCompanyDetailsRequested.type, getCompanyDetailsFlow);
  yield takeEvery(
    updateFactorWeightagesRequested.type,
    updateFactorWeightagesFlow
  );
  yield takeEvery(addFactorScoreRequested.type, addFactorScoreFlow);
  yield takeEvery(getMonthlyCategoryScoreRequest, getMonthlyCategoryScoreFlow);
}

export default {
  companyWatcher,
};
