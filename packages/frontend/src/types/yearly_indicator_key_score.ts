import type { BaseModel } from "./base_model";

export interface YearlyIndicatorKeyScore extends BaseModel {
  disclosure: string;
  overall_score: number;
  unit: string;
  weightage: number;
  year: number;
}
