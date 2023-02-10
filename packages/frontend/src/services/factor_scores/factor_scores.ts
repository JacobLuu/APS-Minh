import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type {
  FactorScore,
  FactorWeightagesPayload,
  CompanyDetailsState,
} from "../../types";

const BASE_URL = "/api/v1/factor_scores";

const editWeightages = (
  data: FactorWeightagesPayload
): Promise<AxiosResponse<CompanyDetailsState>> => {
  return baseService.post(`${BASE_URL}/update_weightage_list`, data);
};

const getOne = (id: number): Promise<AxiosResponse<FactorScore>> => {
  return baseService.get(`${BASE_URL}/${id}`);
};

export default {
  editWeightages,
  getOne,
};
