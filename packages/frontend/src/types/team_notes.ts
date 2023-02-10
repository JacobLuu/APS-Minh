import type { Member } from "./members";
import { BaseState } from "./request";

import type { BaseModel } from "./base_model";
import type { Pagination } from "./pagination";

export interface TeamNotesState extends BaseState, Pagination {
  list: TeamNote[];
}

export interface TeamNote extends BaseModel {
  content: string;
  member: Member;
}

export interface UpdateTeamNote {
  id: number;
  content: string;
}

export interface CreateTeamNote {
  category_score_id: number;
  content: string;
  member_id: number;
}
