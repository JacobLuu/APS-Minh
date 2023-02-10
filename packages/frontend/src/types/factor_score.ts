import { QualitativeScore } from "./qualitative_score";
import { QuantitativeScore } from "./quantitative_score";
import { BaseState } from "./request";

import type { BaseModel } from "./base_model";

export interface FactorScore extends BaseModel {
  overall_score: number;
  qualitative_score: QualitativeScore;
  quantitative_score: QuantitativeScore;
  weightage: number;
}

export interface FactorScoresById {
  [id: string]: FactorScore;
}

export interface FactorScoresState extends BaseState {
  factor_scores_by_id: FactorScoresById;
}

export enum FactorScoreChildrenType {
  qualitative = "qualitative",
  quantitative = "quantitative",
  all = "all",
  none = "none",
}
