import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { EsgNewsState } from "../../types";

export const BASE_URL = "/api/v1/esg_news";

const getEsgNews = (
  esg_news_factor_id: number,
  limit: number,
  offset: number
): Promise<AxiosResponse<EsgNewsState>> => {
  return baseService.get(`${BASE_URL}`, {
    params: {
      esg_news_factor_id,
      limit,
      offset,
    },
  });
};

export default {
  getEsgNews,
};
