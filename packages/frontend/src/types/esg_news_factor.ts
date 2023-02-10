import { EsgNewsCategory } from "./esg_news_category";
import { EsgNewsKeyword } from "./esg_news_keyword";
import { Pagination } from "./pagination";
import { BaseState } from "./request";

import type { BaseModel } from "./base_model";

export interface EsgNewsFactor extends BaseModel {
  esg_news_category: EsgNewsCategory;
  esg_news_keywords: EsgNewsKeyword[];
  title: string;
}

export interface EsgNewsFactorsState extends Pagination, BaseState {
  list: EsgNewsFactor[];
}
