import { BaseModel } from "./base_model";
import { CategoryScore } from "./category_score";
import { DisclosurePayload, Factor } from "./factor";
import { BaseState } from "./request";

import type { Sector } from "./sector";

export type CategoryLabel = "environmental" | "social" | "governance";

export interface CategoryState extends BaseState {
  category: {
    category_label: CategoryLabel;
    category_score: {
      id: number;
      overall_score: number;
      rank_score: string;
      weightage: number;
    };
    category_type: number;
    id: number;
    factors: Factor[];
  };
  temporaryAnswers: {
    topAnswers: DisclosurePayload[];
    bottomAnswers: DisclosurePayload[];
  };
}

export interface GetCompaniesRankingPayload {
  factor_id: number;
  category_id: number;
  sector_id?: number;
}

export interface GetCompaniesRankingFilterPayload {
  factor_id: number;
  category_id: number;
  sector_id?: number;
  filter_option: string;
}

export interface Category extends BaseModel {
  category_type: number;
  category_label: CategoryLabel;
  category_score: CategoryScore;
  factors: Factor[];
  overall_score?: number;
}

export interface CategoriesDropdownList {
  categories: Category[];
  sectors: Sector[];
}
