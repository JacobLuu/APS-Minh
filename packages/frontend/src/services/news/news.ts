import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { NewsListState } from "../../types";

export const BASE_URL = "/api/v1/news";

const getNewsList = (
  companyId: number,
  offset: number,
  limit: number
): Promise<AxiosResponse<NewsListState>> => {
  return baseService.get(`${BASE_URL}?company_id=${companyId}`, {
    params: {
      limit: limit,
      offset: offset,
    },
  });
};

export default {
  getNewsList,
};
