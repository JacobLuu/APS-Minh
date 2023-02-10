import { Answer } from "./answer";
import { BaseModel } from "./base_model";
import { FactorScore, FactorScoreChildrenType } from "./factor_score";
import { Pagination } from "./pagination";
import { BaseState } from "./request";
import { Quantitative } from "./quantitative";

export enum FactorStatus {
  temporary = "temporary",
  active = "active",
  deactive = "deactive",
}
export interface Factor extends BaseModel {
  description: string;
  factor_score: FactorScore;
  label: string;
  label_cn: string;
  status: FactorStatus;
  quantitatives: Quantitative[];
}

export interface DisclosurePayload {
  id?: number;
  document_id: number;
  overall_score: number;
  questionnaire_score_id?: number;
  reasons_for_change: string;
  source: string;
  text: string;
  weightage?: number;
  year?: string;
  news_id?: number;
}

export interface NewsScorePayLoad {
  company_id?: number;
  category_id: number;
  questionnaire_id?: number;
  news_scores: {
    id: number;
    news_id: number;
    overall_score: number;
    reasons_for_change: string;
    weightage: number;
  }[];
}
export interface QuantitativeNewsScorePayLoad {
  company_id?: number;
  category_id: number;
  indicator_key_id?: number;
  indicator_key_score_id: number;
  news_score_id: number;
  overall_score: number;
  reasons_for_change: string;
}

export interface QuestionnaireScoreFormItem {
  disclosure: DisclosureItem[];
  id: number;
  note: string;
  overall_score: number;
  reason: string;
  text: string;
  weightage: number;
}

export interface QuestionnaireScoreRequestItem {
  answers: Answer[];
  change_reason: string;
  id: number;
  news_scores: {
    id: number;
    text: string;
    source: string;
    overall_score: number;
    weightage: number;
  }[];
  note: string;
  weightage: number;
}

export interface DisclosureItem {
  id: number;
  isExtracted: boolean;
  isNews: boolean;
  overall_score: number;
  source: string;
  text: string;
  weightage: number;
}

export interface IndicatorKeyScoreFormItem {
  disclosure: DisclosureItem[];
  id: number;
  name: string;
  overall_score: number;
  reason: string;
  weightage: number;
}

export interface FactorScorePayload {
  companyId: number;
  factorScoreId: number;
  scoreTab: "qualitative" | "quantitative";
}

export interface QuantitativeAnswer {
  answer: string;
  indicator_key_score_id: number;
  reasons_for_change: string;
  score: number;
  source: string;
}

export interface GetFactorsRequest {
  category_id: number;
  category_score_id: number;
  factor_score_children_type: FactorScoreChildrenType;
}

export interface FactorsState extends BaseState, Pagination {
  list: Factor[];
}
