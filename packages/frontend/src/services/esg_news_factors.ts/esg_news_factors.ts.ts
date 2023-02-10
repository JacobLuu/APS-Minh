import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { EsgNewsFactorsState } from "../../types";

export const BASE_URL = "/api/v1/esg_news_factors";

const getEsgNewsFactors = (): Promise<AxiosResponse<EsgNewsFactorsState>> => {
  return baseService.get(`${BASE_URL}`);
};

export default {
  getEsgNewsFactors,
};
