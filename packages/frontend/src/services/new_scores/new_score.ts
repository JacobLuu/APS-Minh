import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { CompanyDetailsState } from "../../types";
import type {
  NewsScorePayLoad,
  QuantitativeNewsScorePayLoad,
} from "../../types/factor";

export const NEW_SCORES_URL = "api/v1/news_extension";

const updateQualitativeNewScore = (
  data: NewsScorePayLoad
): Promise<AxiosResponse<CompanyDetailsState>> => {
  return baseService.put(`${NEW_SCORES_URL}/qualitative/news_scores`, data);
};

const updateQuantitativeNewScore = (
  data: QuantitativeNewsScorePayLoad
): Promise<AxiosResponse<CompanyDetailsState>> => {
  return baseService.put(`${NEW_SCORES_URL}/quantitative/news_score`, data);
};

export default {
  updateQualitativeNewScore,
  updateQuantitativeNewScore,
};
