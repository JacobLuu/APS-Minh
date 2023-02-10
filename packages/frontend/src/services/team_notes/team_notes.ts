import { AxiosResponse } from "axios";

import { TeamNotes, UpdateTeamNote, CreateTeamNote } from "../../types";
import baseService from "../baseApi";

export const BASE_URL = "/api/v1/team_notes";

const getTeamNotes = (
  category_score_id: number
): Promise<AxiosResponse<TeamNotes>> => {
  return baseService.get(BASE_URL, {
    params: {
      category_score_id,
    },
  });
};

const updateTeamNotes = (
  data: UpdateTeamNote
): Promise<AxiosResponse<TeamNotes>> => {
  return baseService.put(`${BASE_URL}/${data.id}`, {
    content: data.content,
  });
};

const createTeamNote = (
  data: CreateTeamNote
): Promise<AxiosResponse<TeamNotes>> => {
  return baseService.post(`${BASE_URL}`, {
    category_score_id: data.category_score_id,
    content: data.content,
    member_id: data.member_id,
  });
};

export default {
  getTeamNotes,
  updateTeamNotes,
  createTeamNote,
};
