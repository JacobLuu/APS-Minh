import type { BaseModel } from "./base_model";

export enum MaterialType {
  "not_material" = 0,
  "material" = 1,
  "very_material" = 2,
}

export interface IndicatorKeySetting extends BaseModel {
  id: number;
  material_type: MaterialType;
}
