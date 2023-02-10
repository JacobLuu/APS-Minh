import { BaseModel } from "./base_model";
import { Pagination } from "./pagination";
import { BaseState } from "./request";

export interface Document extends BaseModel {
  name: string;
  source_path: string;
  s3_path: string;
  year: number;
}

export interface DocumentList extends Pagination {
  list: Document[];
}

export interface DocumentState extends DocumentList, BaseState {}

export interface DocumentUrl {
  id: number;
  name: string;
  url: string;
}
