import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { GetFactorsRequest, FactorsState } from "../../types/factor";

export const BASE_URL = "/api/v1/factors";

const getMany = (
  data: GetFactorsRequest
): Promise<AxiosResponse<FactorsState>> => {
  return baseService.get(`${BASE_URL}`, {
    params: data,
  });
};

export default {
  getMany,
};
