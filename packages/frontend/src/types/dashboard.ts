import type { News } from "./news";
import type { CompanyBase } from "./company";
import { BaseState } from "./request";

export interface DashboardState extends BaseState {
  companies: {
    bottom_companies: CompanyBase[];
    top_companies: CompanyBase[];
    company_count: number;
    esg_task_companies: CompanyBase[];
  };
  last_news: News[];
  overhead_news: News[];
}
