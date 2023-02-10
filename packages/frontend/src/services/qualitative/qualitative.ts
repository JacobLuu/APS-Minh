import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type {
  DisclosurePayload,
  QuestionnaireScoreRequestItem,
} from "../../types";
import type { QuestionnaireScorePayload } from "../../types/questionnaire_score";

const BASE_URL = "/api/v1/qualitative";

const addQualitativeAnswer = (
  questionnaire_score_id: number,
  data: DisclosurePayload
): Promise<AxiosResponse<any>> => {
  return baseService.post(
    `${BASE_URL}/${questionnaire_score_id}/answers`,
    data
  );
};

const updateQualitativeAnswers = (
  questionnaire_score_id: number,
  data: DisclosurePayload[]
): Promise<AxiosResponse<any>> => {
  return baseService.put(`${BASE_URL}/${questionnaire_score_id}/answers`, {
    answers: data,
  });
};

const updateQuestionnaireScore = (
  qualitative_score_id: number,
  data: QuestionnaireScorePayload[]
): Promise<AxiosResponse<any>> => {
  return baseService.put(
    `${BASE_URL}/${qualitative_score_id}/questionnaire_score_weightage`,
    {
      questionnaire_scores: data,
    }
  );
};

const updateQualitativeScore = (
  qualitative_score_id: number,
  data: QuestionnaireScoreRequestItem[]
): Promise<AxiosResponse<any>> => {
  return baseService.put(
    `${BASE_URL}/${qualitative_score_id}/questionnaire_scores`,
    {
      questionnaire_scores: data,
    }
  );
};

export default {
  addQualitativeAnswer,
  updateQualitativeAnswers,
  updateQuestionnaireScore,
  updateQualitativeScore,
};
