import { News } from "./news";

import type { BaseModel } from "./base_model";

export interface NewsScore extends BaseModel {
  belongsToQualitative?: boolean;
  news: News;
  overall_score: number;
  weightage: number;
}
