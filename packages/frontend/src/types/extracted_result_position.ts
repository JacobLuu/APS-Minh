import type { BaseModel } from "./base_model";

export interface ExtractedResultPosition extends BaseModel {
  copiedPositionType: number;
  position: string;
}
