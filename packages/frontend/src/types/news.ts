import { BreadCrumb } from "./breadcrumb";
import { StockPicture } from "./stock_picture";
import { BaseState } from "./request";
import type { BaseModel } from "./base_model";

export interface News extends BaseModel {
  published_at: number;
  source_name: string;
  stock_pictures: StockPicture[];
  title: string;
  url: string;
}

export interface NewsListState extends BreadCrumb, BaseState {
  news: News[];
  pagination: {
    limit: number;
    offset: number;
    total_count: number;
  };
}
