import type { BaseModel } from "./base_model";
import type { Category } from "./category";
import type { CompanyScore } from "./company_score";
import { BaseError } from "./error";
import { DisclosurePayload } from "./factor";
import { BaseState, RequestStates } from "./request";

import type { Industry } from "./industry";

export interface IMonthlyCategoryScore {
  category_label: Category["category_label"];
  data?: number[];
}
export interface CompanyDetailsState extends BaseError, BaseState {
  id: number;
  name: string;
  name_cn: string;
  ticker: string;
  sector: string;
  stockPrice: number;
  stockPriceDiff: number;
  stockPriceDiffPercentage: number;
  stockExchange: string;
  company_score: CompanyScore;
  categories: Category[];
  isLoadingVisible: boolean;
  categoryMetricProgresses: number[];
  addFactorScoreStatus: BaseState["requestState"];
  monthlyCategoryScores?: IMonthlyCategoryScore[];
}

export interface CompanyBase extends BaseModel {
  category?: Category;
  company_score: CompanyScore;
  industry: Industry;
  name: string;
  name_cn: string;
  ticker: string;
}

export interface CompaniesState {
  direction: string;
  limit: number;
  list: CompanyBase[];
  total_count: number;
  offset: number;
  order: string;
}

export interface CompaniesRankingState extends BaseState {
  list: CompanyBase[];
  notNullList: CompanyBase[];
  rankedCompaniesTop: CompanyBase[];
  rankedCompaniesBottom: CompanyBase[];
  order?: string;
  offset?: number;
  limit?: number;
  direction?: string;
  total_count?: number;
  rankingStatusMessage: string;
  updateRankingStatus: RequestStates;
  getCompaniesRankingStatus: RequestStates;
}

export interface FactorWeightage {
  factor_score_id: number;
  weightage: number;
}

export interface FactorWeightagesPayload extends BaseError {
  category_score_id: number;
  factor_score_weightage_list: FactorWeightage[];
  reasons_for_change: string;
}

export interface UpdateRankingPayload {
  sector_id: number;
  category_id: number;
  factor_id: number;
  companies_rank: {
    company_id: number;
    custom_rank: number;
  }[];
  temporaryAnswers?: DisclosurePayload[];
}

export interface RankedCompany {
  company: CompanyBase;
  custom_rank: number;
}

export interface GetRankedCompaniesPayload {
  sector_id: number;
  category_id: number;
  factor_id: number;
}
