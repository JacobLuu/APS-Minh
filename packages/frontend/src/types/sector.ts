import type { BaseModel } from "./base_model";
import { BaseState } from "./request";

export interface Sector extends BaseModel {
  name: string;
}
export interface SectorState extends BaseState {
  sectors: Sector[];
}
