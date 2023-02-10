import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type {
  CreateAnswer,
  Answer,
  UpdateAnswer,
  addFactorsScorePayload,
} from "../../types/answer";

export const BASE_URL = "/api/v1/answers";

const create = (data: CreateAnswer): Promise<AxiosResponse<Answer>> => {
  return baseService.post(`${BASE_URL}`, data);
};

const updateOne = (
  id: number,
  data: UpdateAnswer
): Promise<AxiosResponse<Answer>> => {
  return baseService.put(`${BASE_URL}/${id}`, data);
};

const createMany = (
  payload: addFactorsScorePayload
): Promise<AxiosResponse<Answer>> => {
  return baseService.post(`${BASE_URL}/add-bulk-answers`, {
    answers: payload.answers,
  });
};

export default {
  create,
  updateOne,
  createMany,
};
