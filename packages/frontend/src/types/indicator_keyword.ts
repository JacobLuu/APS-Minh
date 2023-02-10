import { Language as LanguageType } from "../constants/enums";
import type { BaseModel } from "./base_model";

export interface IndicatorKeyword extends BaseModel {
  keyword: string;
  locale: LanguageType;
}
