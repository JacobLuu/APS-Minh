import { BaseModel } from "./base_model";
import { ExtractedResult } from "./extracted_result";
import { ExtractedResultPage } from "./extracted_result_page";
import { History } from "./histories";

export interface ExtractedResultScore extends BaseModel {
  edit_history: History;
  extracted_result: ExtractedResult;
  extracted_result_pages: ExtractedResultPage[];
  document?: { url: string; source_path?: string };
  overall_score: number;
  source?: string;
  weightage: number;
  year: number;
}
