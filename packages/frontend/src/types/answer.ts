import { BaseModel } from "./base_model";
import { Member } from "./members";

export interface Answer extends BaseModel {
  document: null;
  member: Member;
  modified_at: number;
  overall_score: number;
  source: null;
  text: string;
  weightage: number;
}

export interface CreateAnswer {
  member_id: string;
  overall_score: number;
  qualitative_score_id: number;
  text: string;
}

export interface UpdateAnswer {
  text: string;
  overall_score: number;
}

export interface addFactorsScorePayload {
  company_id: number;
  answers: CreateAnswer[];
}
