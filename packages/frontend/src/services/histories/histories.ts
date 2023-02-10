import { AxiosResponse } from "axios";

import baseService from "../baseApi";

const BASE_URL = "/api/v1/edit_histories";

const getCategoryHistories = (id: number): Promise<any> => {
  return baseService.get(`${BASE_URL}/categories/${id}`, {
    params: {
      limit: 50,
      offset: 0,
    },
  });
};

const getFactorsByCategoryHistories = (
  categoryScoreId: number
): Promise<AxiosResponse> => {
  return baseService.get(`${BASE_URL}/factors/${categoryScoreId}`, {
    params: {
      limit: 50,
      offset: 0,
    },
  });
};

const getFactorHistories = (factorScoreId: number): Promise<AxiosResponse> => {
  return baseService.get(`${BASE_URL}/factor/${factorScoreId}`, {
    params: {
      limit: 50,
      offset: 0,
    },
  });
};

const getQuantitativeHistories = (
  quantitativeScoreId: number
): Promise<AxiosResponse> => {
  return baseService.get(`${BASE_URL}/quantitative/${quantitativeScoreId}`, {
    params: {
      limit: 50,
      offset: 0,
    },
  });
};

const getQualitativeHistories = (
  qualitativeScoreId: number
): Promise<AxiosResponse> => {
  return baseService.get(`${BASE_URL}/qualitative/${qualitativeScoreId}`, {
    params: {
      limit: 50,
      offset: 0,
    },
  });
};

const getExtractedResultHistories = (
  qualitativeScoreId: number
): Promise<AxiosResponse> => {
  return baseService.get(`${BASE_URL}/extracted_result/${qualitativeScoreId}`, {
    params: {
      limit: 50,
      offset: 0,
    },
  });
};

export default {
  getCategoryHistories,
  getFactorsByCategoryHistories,
  getFactorHistories,
  getQuantitativeHistories,
  getQualitativeHistories,
  getExtractedResultHistories,
};
