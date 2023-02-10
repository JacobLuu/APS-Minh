import type { Sector } from "./sector";
import type { BaseModel } from "./base_model";

export interface Industry extends BaseModel {
  name: string;
  sector: Sector;
}
