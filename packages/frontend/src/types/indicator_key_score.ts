import { ExtractedResultScore } from "./extracted_result_score";
import { IndicatorKey } from "./indicator_key";
import { NewsScore } from "./news_score";
import { YearlyIndicatorKeyScore } from "./yearly_indicator_key_score";

import type { BaseModel } from "./base_model";

export interface IndicatorKeyScore extends BaseModel {
  extracted_result_scores: ExtractedResultScore[];
  indicator_key: IndicatorKey;
  news_scores: NewsScore[];
  overall_score: number;
  weightage: number;
  yearly_indicator_key_scores: YearlyIndicatorKeyScore[];
}
