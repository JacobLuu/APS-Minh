import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  addQualitativeDisclosureFailed,
  addQualitativeDisclosureRequested,
  addQualitativeDisclosureSucceeded,
  getCategoryFailed,
  getCategoryRequested,
  getCategorySucceeded,
  updateQualitativeAnswersFailed,
  updateQualitativeAnswersRequested,
  updateQualitativeAnswersSucceeded,
  updateQualitativeNewScoreFailed,
  updateQualitativeNewScoreRequested,
  updateQualitativeNewScoreSucceeded,
  updateQuantitativeNewScoreFailed,
  updateQuantitativeNewScoreRequested,
  updateQuantitativeNewScoreSucceeded,
  updateQuestionnaireScoresFailed,
  updateQuestionnaireScoresRequested,
  updateQuestionnaireScoresSucceeded,
} from "../reducers/category";
import { getCompanyDetailsRequested } from "../reducers/company";
import companyService from "../services/company";
import NewScoresService from "../services/new_scores";
import qualitativeService from "../services/qualitative";

import type { Category, DisclosurePayload, NewsScorePayLoad } from "../types";
import type { QuantitativeNewsScorePayLoad } from "../types/factor";
import type { QuestionnaireScorePayload } from "../types/questionnaire_score";

function* getCategoryFlow(
  action: PayloadAction<{ companyId: number; categoryId: number }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<Category> = yield call(
      companyService.getCompanyCategory,
      payload.companyId,
      payload.categoryId
    );
    yield put({
      type: getCategorySucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCategoryFailed().type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* addQualitativeAnswerFlow(
  action: PayloadAction<{
    category_id: number;
    company_id: number;
    questionnaire_score_id: number;
    data: DisclosurePayload;
  }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<Category> = yield call(
      qualitativeService.addQualitativeAnswer,
      payload.questionnaire_score_id,
      payload.data
    );
    yield put({
      type: addQualitativeDisclosureSucceeded.type,
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
    const { response } = error;
    yield put({
      type: addQualitativeDisclosureFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* updateQualitativeAnswersFlow(
  action: PayloadAction<{
    category_id: number;
    company_id: number;
    questionnaire_score_id: number;
    data: DisclosurePayload[];
  }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<Category> = yield call(
      qualitativeService.updateQualitativeAnswers,
      payload.questionnaire_score_id,
      payload.data
    );
    yield put({
      type: updateQualitativeAnswersSucceeded.type,
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
    const { response } = error;
    yield put({
      type: updateQualitativeAnswersFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}
function* updateQualitativeNewScoreFlow(
  action: PayloadAction<NewsScorePayLoad>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<Category> = yield call(
      NewScoresService.updateQualitativeNewScore,
      payload
    );
    yield put({
      type: updateQualitativeNewScoreSucceeded.type,
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
    const { response } = error;
    yield put({
      type: updateQualitativeNewScoreFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* updateQuantitativeNewScoreFlow(
  action: PayloadAction<QuantitativeNewsScorePayLoad>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<Category> = yield call(
      NewScoresService.updateQuantitativeNewScore,
      payload
    );
    yield put({
      type: updateQuantitativeNewScoreSucceeded.type,
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
    const { response } = error;
    yield put({
      type: updateQuantitativeNewScoreFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* updateQuestionnaireScoresFlow(
  action: PayloadAction<{
    category_id: number;
    company_id: number;
    qualitative_score_id: number;
    data: QuestionnaireScorePayload[];
  }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<Category> = yield call(
      qualitativeService.updateQuestionnaireScore,
      payload.qualitative_score_id,
      payload.data
    );
    yield put({
      type: updateQuestionnaireScoresSucceeded.type,
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
    const { response } = error;
    yield put({
      type: updateQuestionnaireScoresFailed.type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* categoryWatcher() {
  yield takeEvery(getCategoryRequested().type, getCategoryFlow);
  yield takeEvery(
    addQualitativeDisclosureRequested.type,
    addQualitativeAnswerFlow
  );
  yield takeEvery(
    updateQualitativeAnswersRequested.type,
    updateQualitativeAnswersFlow
  );
  yield takeEvery(
    updateQuestionnaireScoresRequested.type,
    updateQuestionnaireScoresFlow
  );
  yield takeEvery(
    updateQualitativeNewScoreRequested.type,
    updateQualitativeNewScoreFlow
  );
  yield takeEvery(
    updateQuantitativeNewScoreRequested.type,
    updateQuantitativeNewScoreFlow
  );
}

export default {
  categoryWatcher,
};
