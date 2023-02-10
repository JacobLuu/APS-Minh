import { AxiosResponse } from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import { resetTemporaryAnswers } from "../reducers/category";
import {
  getCompaniesFailed,
  getCompaniesRequested,
  getCompaniesSucceeded,
} from "../reducers/companies";
import {
  getCompaniesRankingBottomFailed,
  getCompaniesRankingBottomRequested,
  getCompaniesRankingBottomSucceed,
  getCompaniesRankingFailed,
  getCompaniesRankingRequested,
  getCompaniesRankingSucceeded,
  getCompaniesRankingTopFailed,
  getCompaniesRankingTopRequested,
  getCompaniesRankingTopSucceed,
  updateCompaniesRankingBottomFailed,
  updateCompaniesRankingBottomRequest,
  updateCompaniesRankingBottomSucceed,
  updateCompaniesRankingTopFailed,
  updateCompaniesRankingTopRequest,
  updateCompaniesRankingTopSucceed,
} from "../reducers/companies_ranking";
import companyService from "../services/company";
import qualitativeService from "../services/qualitative";
import { GetCompaniesRankingPayload } from "../types/category";
import { GetRankedCompaniesPayload } from "../types/company";

import type {
  CompaniesState,
  DisclosurePayload,
  UpdateRankingPayload,
} from "../types";

function* getCompaniesFlow(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<CompaniesState> = yield call(
      companyService.getCompanies,
      action.payload
    );
    yield put({
      type: getCompaniesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCompaniesFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getCompaniesRankingFlow(
  action: PayloadAction<GetCompaniesRankingPayload>
) {
  try {
    const response: AxiosResponse = yield call(
      companyService.getCompanyRanking,
      action.payload
    );
    yield put({
      type: getCompaniesRankingSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCompaniesRankingFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* updateCompaniesRankingTopFlow(
  action: PayloadAction<UpdateRankingPayload>
) {
  try {
    const { temporaryAnswers, sector_id, category_id, factor_id } =
      action.payload;
    for (let i = 0; i < temporaryAnswers.length; i += 1) {
      const data: DisclosurePayload = {
        document_id: temporaryAnswers[i].document_id,
        overall_score: null,
        reasons_for_change: "",
        source: temporaryAnswers[i].source,
        text: temporaryAnswers[i].text,
        weightage: null,
      };
      yield call(
        qualitativeService.addQualitativeAnswer,
        temporaryAnswers[i].questionnaire_score_id,
        data
      );
    }

    delete action.payload.temporaryAnswers;
    yield call(companyService.updateCompaniesRankingTop, action.payload);
    yield put(resetTemporaryAnswers());
    yield put(updateCompaniesRankingTopSucceed());
    yield put({
      type: getCompaniesRankingTopRequested.type,
      payload: {
        sector_id,
        category_id,
        factor_id,
      },
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: updateCompaniesRankingTopFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* updateCompaniesRankingBottomFlow(
  action: PayloadAction<UpdateRankingPayload>
) {
  try {
    const { temporaryAnswers, sector_id, category_id, factor_id } =
      action.payload;

    for (let i = 0; i < temporaryAnswers.length; i += 1) {
      const data: DisclosurePayload = {
        document_id: temporaryAnswers[i].document_id,
        overall_score: null,
        reasons_for_change: "",
        source: temporaryAnswers[i].source,
        text: temporaryAnswers[i].text,
        weightage: null,
      };
      yield call(
        qualitativeService.addQualitativeAnswer,
        temporaryAnswers[i].questionnaire_score_id,
        data
      );
    }

    delete action.payload.temporaryAnswers;
    yield call(companyService.updateCompaniesRankingBottom, action.payload);
    yield put(resetTemporaryAnswers());
    yield put(updateCompaniesRankingBottomSucceed());
    yield put({
      type: getCompaniesRankingBottomRequested.type,
      payload: {
        sector_id,
        category_id,
        factor_id,
      },
    });
  } catch (error: any) {
    const { response } = error;

    yield put({
      type: updateCompaniesRankingBottomFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getCompaniesRankingTopFlow(
  action: PayloadAction<GetRankedCompaniesPayload>
) {
  try {
    const response = yield call(
      companyService.getCompaniesRankingTop,
      action.payload
    );
    yield put({
      type: getCompaniesRankingTopSucceed.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCompaniesRankingTopFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* getCompaniesRankingBottomFlow(
  action: PayloadAction<GetRankedCompaniesPayload>
) {
  try {
    const response = yield call(
      companyService.getCompaniesRankingBottom,
      action.payload
    );
    yield put({
      type: getCompaniesRankingBottomSucceed.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCompaniesRankingBottomFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* companiesWatcher() {
  yield takeEvery(getCompaniesRequested.type, getCompaniesFlow);
  // TODO: optimize calling this flow when changing category in <FilterCompanies>
  yield takeLatest(getCompaniesRankingRequested.type, getCompaniesRankingFlow);
  yield takeEvery(
    updateCompaniesRankingTopRequest.type,
    updateCompaniesRankingTopFlow
  );
  yield takeEvery(
    updateCompaniesRankingBottomRequest.type,
    updateCompaniesRankingBottomFlow
  );
  yield takeLatest(
    getCompaniesRankingTopRequested.type,
    getCompaniesRankingTopFlow
  );
  yield takeLatest(
    getCompaniesRankingBottomRequested.type,
    getCompaniesRankingBottomFlow
  );
}

export default {
  companiesWatcher,
};
