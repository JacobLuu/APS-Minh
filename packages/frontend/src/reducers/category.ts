import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RankingTabsEnums } from "../constants/enums";
import { RootState } from "../store/store";
import {
  CategoryState,
  DisclosurePayload,
  NewsScorePayLoad,
  QuantitativeNewsScorePayLoad,
} from "../types";
import { QuestionnaireScorePayload } from "../types/questionnaire_score";
import { RequestStates } from "../types/request";

const initialState: CategoryState = {
  category: {
    category_label: "environmental",
    category_score: {
      id: 0,
      overall_score: null,
      rank_score: "",
      weightage: null,
    },
    category_type: 0,
    id: 0,
    factors: [],
  },
  temporaryAnswers: {
    topAnswers: [],
    bottomAnswers: [],
  },
  requestState: RequestStates.Initial,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetTemporaryAnswers: (state) => {
      state.temporaryAnswers = {
        topAnswers: [],
        bottomAnswers: [],
      };
    },
    getCategoryRequested: (
      state: CategoryState,
      _action: PayloadAction<{ companyId: number; categoryId: number }>
    ) => {
      state.requestState = RequestStates.Requested;
    },
    getCategorySucceeded: (
      state: CategoryState,
      action: PayloadAction<any>
    ) => {
      const { payload } = action;
      state.category = payload;
      state.requestState = RequestStates.Succeeded;
      const { factors } = state.category;
      const {
        temporaryAnswers: { topAnswers, bottomAnswers },
      } = state;

      for (let i = 0; i < factors.length; i += 1) {
        for (
          let j = 0;
          j <
          factors[i].factor_score.qualitative_score.questionnaire_scores.length;
          j += 1
        ) {
          const questionnaire_score =
            factors[i].factor_score.qualitative_score.questionnaire_scores[j];
          for (let k = 0; k < topAnswers.length; k += 1) {
            if (
              topAnswers[k].questionnaire_score_id === questionnaire_score.id
            ) {
              state.category.factors[
                i
              ].factor_score.qualitative_score.questionnaire_scores[
                j
              ].answers.push({
                document: {
                  id: topAnswers[k].document_id,
                  name: null,
                  source_path: null,
                  s3_path: null,
                  year: null,
                },
                edit_history: null,
                id: null,
                overall_score: topAnswers[k].overall_score,
                source: topAnswers[k].source,
                text: topAnswers[k].text,
                weightage: null,
              });
            }
          }
          for (let k = 0; k < bottomAnswers.length; k += 1) {
            if (
              bottomAnswers[k].questionnaire_score_id === questionnaire_score.id
            ) {
              state.category.factors[
                i
              ].factor_score.qualitative_score.questionnaire_scores[
                j
              ].answers.push({
                document: {
                  id: bottomAnswers[k].document_id,
                  name: null,
                  source_path: null,
                  s3_path: null,
                  year: null,
                },
                edit_history: null,
                id: null,
                overall_score: bottomAnswers[k].overall_score,
                source: bottomAnswers[k].source,
                text: bottomAnswers[k].text,
                weightage: null,
              });
            }
          }
        }
      }
      return state;
    },
    getCategoryFailed: () => {},
    addQualitativeDisclosureRequested: (
      _state,
      _data: PayloadAction<{
        category_id: number;
        company_id: number;
        questionnaire_score_id: number;
        data: DisclosurePayload;
      }>
    ) => {},
    addQualitativeDisclosureSucceeded: (_state, _data) => {},
    addQualitativeDisclosureFailed: (_state, _data) => {},
    updateQualitativeAnswersRequested: (
      _state,
      _data: PayloadAction<{
        category_id: number;
        company_id: number;
        questionnaire_score_id: number;
        data: DisclosurePayload[];
      }>
    ) => {},
    updateQualitativeAnswersSucceeded: (_state, _data) => {},
    updateQualitativeAnswersFailed: (_state, _data) => {},
    updateQuestionnaireScoresRequested: (
      _state,
      _data: PayloadAction<{
        category_id: number;
        company_id: number;
        qualitative_score_id: number;
        data: QuestionnaireScorePayload[];
      }>
    ) => {},
    updateQuestionnaireScoresSucceeded: (_state, _data) => {},
    updateQuestionnaireScoresFailed: (_state, _data) => {},
    updateQualitativeNewScoreRequested: (
      _state,
      _data: PayloadAction<NewsScorePayLoad>
    ) => {},
    updateQualitativeNewScoreSucceeded: (_state, _data) => {},
    updateQualitativeNewScoreFailed: (_state, _data) => {},
    updateQuantitativeNewScoreRequested: (
      _state,
      _data: PayloadAction<QuantitativeNewsScorePayLoad>
    ) => {},
    updateQuantitativeNewScoreSucceeded: (_state, _data) => {},
    updateQuantitativeNewScoreFailed: (_state, _data) => {},
    addQualitativeDisclosureFromRanking: (
      state,
      action: PayloadAction<{
        category_id: number;
        company_id: number;
        questionnaire_score_id: number;
        data: DisclosurePayload;
        document_name: string;
        selectedTab: string;
      }>
    ) => {
      const { factors } = state.category;
      const { payload } = action;
      for (let i = 0; i < factors.length; i += 1) {
        for (
          let j = 0;
          j <
          factors[i].factor_score.qualitative_score.questionnaire_scores.length;
          j += 1
        ) {
          const questionnaire_score =
            factors[i].factor_score.qualitative_score.questionnaire_scores[j];
          if (payload.questionnaire_score_id === questionnaire_score.id) {
            questionnaire_score.answers.push({
              document: {
                id: payload.data.document_id,
                name: payload.document_name,
                source_path: null,
                s3_path: null,
                year: null,
              },
              edit_history: null,
              id: null,
              overall_score: payload.data.overall_score,
              source: payload.data.source,
              text: payload.data.text,
              weightage: null,
            });
            if (payload.selectedTab === `${RankingTabsEnums.top_company}`) {
              state.temporaryAnswers.topAnswers.push({
                questionnaire_score_id: questionnaire_score.id,
                document_id: payload.data.document_id,
                id: null,
                overall_score: payload.data.overall_score,
                reasons_for_change: payload.data.reasons_for_change,
                source: payload.data.source,
                text: payload.data.text,
                weightage: null,
              });
            } else if (
              payload.selectedTab === `${RankingTabsEnums.bottom_company}`
            ) {
              state.temporaryAnswers.bottomAnswers.push({
                questionnaire_score_id: questionnaire_score.id,
                document_id: payload.data.document_id,
                id: null,
                overall_score: payload.data.overall_score,
                reasons_for_change: payload.data.reasons_for_change,
                source: payload.data.source,
                text: payload.data.text,
                weightage: null,
              });
            }
          }
        }
      }
      return state;
    },
  },
});

const { actions, reducer } = categorySlice;

export const {
  resetTemporaryAnswers,
  getCategoryRequested,
  getCategorySucceeded,
  getCategoryFailed,
  addQualitativeDisclosureRequested,
  addQualitativeDisclosureSucceeded,
  addQualitativeDisclosureFailed,
  updateQualitativeAnswersRequested,
  updateQualitativeAnswersSucceeded,
  updateQualitativeAnswersFailed,
  updateQualitativeNewScoreRequested,
  updateQualitativeNewScoreSucceeded,
  updateQualitativeNewScoreFailed,
  updateQuantitativeNewScoreRequested,
  updateQuantitativeNewScoreSucceeded,
  updateQuantitativeNewScoreFailed,
  updateQuestionnaireScoresRequested,
  updateQuestionnaireScoresSucceeded,
  updateQuestionnaireScoresFailed,
  addQualitativeDisclosureFromRanking,
} = actions;

export const selectCategory = (state: RootState) => state.category;

export default reducer;
