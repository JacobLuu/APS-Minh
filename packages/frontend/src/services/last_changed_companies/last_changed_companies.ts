import { AxiosResponse } from "axios";

import baseService from "../baseApi";

export const BASE_URL = "/api/v1/company_activity_logs/changed_companies";

const getLastChangedCompanies = (
  offset: number,
  limit: number
): Promise<AxiosResponse<any>> => {
  return baseService.get(`${BASE_URL}`, {
    params: {
      limit: limit,
      offset: offset,
    },
  });
};

export default {
  getLastChangedCompanies,
};
