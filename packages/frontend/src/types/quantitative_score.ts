import { BaseModel } from "./base_model";
import { IndicatorKeyScore } from "./indicator_key_score";

export interface QuantitativeScore extends BaseModel {
  indicator_key_scores: IndicatorKeyScore[];
  overall_score: number;
  rank_score: string;
  weightage: number;
}
