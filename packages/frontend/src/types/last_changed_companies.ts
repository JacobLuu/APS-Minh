import { CategoryLabel } from "./category";
import { CompanyBase } from "./company";
import { Member } from "./members";
import { Pagination } from "./pagination";
import { BaseState } from "./request";

export interface ActionInfo {
  category_weightage_updated?: CategoryLabel[];
  category_score_updated?: CategoryLabel[];
}

export interface LastChangedCompany extends CompanyBase {
  categories?: any;
}

export interface LastChanged {
  action_info: ActionInfo;
  company: LastChangedCompany;
  created_at: number;
  id: number;
  member: Member;
}

export interface LastChangedCompaniesState extends BaseState {
  last_changed_companies: LastChanged[];
  pagination: Pagination;
}
