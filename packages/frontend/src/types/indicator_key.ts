import type { BaseModel } from "./base_model";
import type { IndicatorKeySetting } from "./indicator_key_setting";
import type { IndicatorKeyword } from "./indicator_keyword";

export interface IndicatorKey extends BaseModel {
  label: string;
  indicator_keywords: IndicatorKeyword[];
  indicator_key_setting: IndicatorKeySetting;
}
