import { EsgNewsCategory } from "./esg_news_category";
import { Pagination } from "./pagination";
import { BaseState } from "./request";
import { StockPicture } from "./stock_picture";

import type { BaseModel } from "./base_model";

export interface EsgNews extends BaseModel {
  meta_data: object;
  published_at: number;
  source_name: string;
  stock_pictures: StockPicture[];
  title: string;
  url: string;
}

export interface EsgNewsState extends BaseState {
  esg_news: EsgNews[];
  esg_news_category: EsgNewsCategory;
  pagination: Pagination;
}
