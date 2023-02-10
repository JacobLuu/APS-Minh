import { BaseModel } from "./base_model";
import { ExtractedResultPosition } from "./extracted_result_position";
import { ExtractedResultValue } from "./extracted_result_value";

export interface ExtractedResultPage extends BaseModel {
  extracted_result_positions: ExtractedResultPosition[];
  extracted_result_values: ExtractedResultValue[];
  page: number;
}
