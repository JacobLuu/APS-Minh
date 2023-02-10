import { BaseModel } from "./base_model";
import { IndicatorKey } from "./indicator_key";

export interface Quantitative extends BaseModel {
  indicator_key: IndicatorKey;
}
