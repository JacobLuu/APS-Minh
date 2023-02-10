export interface BaseModel {
  id: number;
  created_at?: number;
  updated_at?: number;
}

export interface UUIDBaseModel {
  id: string;
  created_at?: number;
  updated_at?: number;
}
