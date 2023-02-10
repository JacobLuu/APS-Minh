import { Answer } from "./answer";
import { BaseModel } from "./base_model";
import { NewsScore } from "./news";
import { Questionnaire } from "./questionnaire";

export interface QuestionnaireScorePayload {
  id: number;
  weightage: number;
}

export interface QuestionnaireScore extends BaseModel {
  answers: Answer[];
  note: string;
  news_scores: NewsScore[];
  overall_score: number;
  questionnaire: Questionnaire;
  weightage: number;
}
