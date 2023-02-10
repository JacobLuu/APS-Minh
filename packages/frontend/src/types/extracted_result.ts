import { BaseModel } from "./base_model";
import { Document } from "./document";

export interface ExtractedResult extends BaseModel {
  document: Document[];
  key: string;
}
