import type { Pagination } from "./pagination";
import type { BaseState } from "./request";

export interface ProgressCompany {
  company: {
    id: number;
    name_cn: string;
    name: string;
  };
  completed_metric_count: number;
  id: number;
  metric_count: number;
}

export interface ProgressCompaniesState extends BaseState {
  company_scores: ProgressCompany[];
  pagination: Pagination;
}
