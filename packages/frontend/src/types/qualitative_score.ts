import { BaseModel } from "./base_model";
import { Answer } from "./answer";
import { QuestionnaireScore } from "./questionnaire_score";

export interface QualitativeScore extends BaseModel {
  overall_score: number;
  questionnaire_scores: QuestionnaireScore[];
  rank_score: string;
  weightage: number;
  answers: Answer[];
}
