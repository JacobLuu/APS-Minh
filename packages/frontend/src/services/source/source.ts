import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { SourceState } from "../../types";

export const BASE_URL = "/api/v1/extracted_result_scores";

const getExtractedResult = (
  extracted_result_score_id: number
): Promise<AxiosResponse<SourceState>> => {
  return baseService.get(`${BASE_URL}/${extracted_result_score_id}`);
};

export default {
  getExtractedResult,
};
