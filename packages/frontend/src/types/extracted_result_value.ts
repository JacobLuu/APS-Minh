import type { BaseModel } from "./base_model";

export interface ExtractedResultValue extends BaseModel {
  disclosure: string;
  label: string;
  unit: string;
}

export interface ExtractedResultValueByLabel {
  [label: number]: ExtractedResultValue;
  extracted_result_score_id: number;
}

export interface ExtractedResultValuesByYear {
  [year: string]: ExtractedResultValueByLabel;
}
