import type { BreadCrumb } from "./breadcrumb";
import { DocumentUrl } from "./document";
import { ExtractedResultValue } from "./extracted_result_value";
import { ExtractedResultPosition } from "./extracted_result_position";
import { IndicatorKey } from "./indicator_key";
import { BaseState } from "./request";

export interface Position {
  page: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface ExtractedResultPage {
  id: number;
  page: number;
  extracted_result_positions: ExtractedResultPosition[];
  extracted_result_values: ExtractedResultValue[];
}

export interface ExtractedResultScore {
  document?: DocumentUrl;
  id: number;
  overall_score: number;
  weightage: number;
  extracted_result_pages: ExtractedResultPage[];
  source?: string;
}

export interface SourceState extends BreadCrumb, BaseState {
  extracted_result_score: ExtractedResultScore;
  indicator_key: IndicatorKey;
}

export interface ExtractedResultForm {
  overall_score: number;
  extracted_result_values: ExtractedResultValue[];
  reasons_for_change: string;
}
