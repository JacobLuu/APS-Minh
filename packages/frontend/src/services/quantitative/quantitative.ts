import { AxiosResponse } from "axios";

import baseService from "../baseApi";

const BASE_URL = "/api/v1/quantitative";

const updateQuantitativeScore = (
  quantitativeScoreId: number,
  indicator_keys: any
): Promise<AxiosResponse<any>> => {
  return baseService.put(
    `${BASE_URL}/${quantitativeScoreId}/indicator_key_scores`,
    {
      indicator_keys,
    }
  );
};

export default {
  updateQuantitativeScore,
};
