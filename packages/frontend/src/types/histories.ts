import type { Member } from "./members";

export interface History {
  after_value: string;
  before_value: string;
  change_reason: string;
  changed_item: string;
  created_at: number;
  data_type: string;
  id: number;
  label: string;
  member: Member;
}

export interface HistoriesState {
  histories: History[];
  pagination: {
    limit: number;
    offset: number;
    total_count: number;
  };
}
