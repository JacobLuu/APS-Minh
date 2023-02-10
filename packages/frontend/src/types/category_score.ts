import { BaseModel } from "./base_model";

export interface CategoryScore extends BaseModel {
  completed_metric_count: number;
  metric_count: number;
  overall_score: number;
  weightage: number;
  rank_score: string;
  pre_score: number;
}
