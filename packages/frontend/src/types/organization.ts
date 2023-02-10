import { UUIDBaseModel } from "./base_model";

export interface Organization extends UUIDBaseModel {
  framework: string;
  name: string;
}
