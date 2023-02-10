import type { BaseModel } from "./base_model";

export interface CompanyScore extends BaseModel {
  overall_score: number;
  rank_score: string;
  pre_score?: number;
  weightage?: number;
  change_count?: number;
  is_arrow_up?: boolean;
}
