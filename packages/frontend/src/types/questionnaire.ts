import { BaseModel } from "./base_model";

export interface Questionnaire extends BaseModel {
  text: string;
  text_cn: string;
}
