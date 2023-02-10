import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type {
  DocumentUrl,
  QuantitativeAnswer,
  ExtractedResultForm,
} from "../../types";

const BASE_URL = "/api/v1/extracted_results";

const getDocument = (): Promise<AxiosResponse<DocumentUrl>> => {
  return baseService.get(`${BASE_URL}/scores-from-table-view`);
};

const addQuantitativeAnswer = (
  data: QuantitativeAnswer
): Promise<AxiosResponse<QuantitativeAnswer>> => {
  return baseService.post(`${BASE_URL}/scores`, data);
};

const updateExtractedResult = (
  extracted_result_score_id: number,
  data: ExtractedResultForm
): Promise<AxiosResponse<any>> => {
  return baseService.put(
    `${BASE_URL}/scores/${extracted_result_score_id}`,
    data
  );
};

export default {
  getDocument,
  addQuantitativeAnswer,
  updateExtractedResult,
};
