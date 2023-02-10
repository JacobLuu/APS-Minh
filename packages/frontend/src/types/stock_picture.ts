import type { BaseModel } from "./base_model";

export interface StockPicture extends BaseModel {
  s3_path: string;
}
