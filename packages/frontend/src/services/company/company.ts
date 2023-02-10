import { AxiosResponse } from "axios";
import { CANCEL } from "redux-saga";

import { GetCompaniesRankingPayload } from "../../types/category";
import baseService from "../baseApi";

import type {
  CompanyDetailsState,
  CompaniesState,
  ProgressCompaniesState,
  Pagination,
  UpdateRankingPayload,
  GetRankedCompaniesPayload,
} from "../../types";

export const BASE_URL = "/api/v1/companies";

// 🔴 Todo: move to type
interface IRankingCategoryViewParams {
  sector_id?: number;
  category_id?: number;
  offset: number;
  limit: number;
  direction: "asc" | "desc";
}

interface IRankingFactoryViewParams extends IRankingCategoryViewParams {
  factory_id?: number;
}

const getCompanyDetails = (
  company_id: number,
  category_id?: number
): Promise<AxiosResponse<CompanyDetailsState>> => {
  const controller = new AbortController();

  if (category_id) {
    const request = baseService.get(`${BASE_URL}/${company_id}`, {
      params: { category_id },
      signal: controller.signal,
    });

    request[CANCEL] = () => controller.abort();

    return request;
  }
  return baseService.get(`${BASE_URL}/${company_id}`);
};

const getCompanyCategory = (
  id: number,
  category_id: number
): Promise<AxiosResponse<CompanyDetailsState>> => {
  return baseService.get(`${BASE_URL}/${id}/category-score/${category_id}`);
};

const getCompanies = (
  keyword: string
): Promise<AxiosResponse<CompaniesState>> => {
  return baseService.get(`${BASE_URL}`, {
    params: keyword,
  });
};

const getCompaniesNew = (payload: {
  limit?: number;
  offset?: number;
  keyword?: string;
}): Promise<AxiosResponse<CompaniesState>> => {
  return baseService.get(`${BASE_URL}`, {
    params: payload,
  });
};

const getProgressCompanies = (
  pagination: Pagination
): Promise<AxiosResponse<ProgressCompaniesState>> => {
  return baseService.get(`${BASE_URL}/progress`, {
    params: {
      ...pagination,
    },
  });
};

const getCompanyRanking = (
  rankingFilterElement: GetCompaniesRankingPayload
) => {
  return baseService.get(`${BASE_URL}/ranking`, {
    params: rankingFilterElement,
  });
};

const updateCompaniesRankingTop = (
  updateRankingPayload: UpdateRankingPayload
) => {
  return baseService.post(`${BASE_URL}/ranking-top`, updateRankingPayload);
};

const updateCompaniesRankingBottom = (
  updateRankingPayload: UpdateRankingPayload
) => {
  return baseService.post(`${BASE_URL}/ranking-bottom`, updateRankingPayload);
};

const getCompaniesRankingTop = (
  getCompaniesRankingTopPayload: GetRankedCompaniesPayload
) => {
  return baseService.get(`${BASE_URL}/top-10-ranking`, {
    params: getCompaniesRankingTopPayload,
  });
};

const getCompaniesRankingBottom = (
  getCompaniesRankingBottomPayload: GetRankedCompaniesPayload
) => {
  return baseService.get(`${BASE_URL}/bottom-10-ranking`, {
    params: getCompaniesRankingBottomPayload,
  });
};

const getFactorScore = (
  companyId: number,
  factorScoreId: number,
  scoreTab: string
): Promise<AxiosResponse<any>> => {
  return baseService.get(
    `${BASE_URL}/${companyId}/factor_scores/${factorScoreId}?score_tab=${scoreTab}`
  );
};

const getMonthlyCategoryScore = ({
  companyId,
  year,
}): Promise<AxiosResponse<any>> => {
  return baseService.get(
    `${BASE_URL}/${companyId}/monthly-category-scores/${year}`
  );
};

const getCompanyStockInfo = (ticker): Promise<AxiosResponse<any>> => {
  return baseService.get(`${BASE_URL}/stock-price/${ticker}`);
};

const getCompanyRankingCategoryView = (
  params: IRankingCategoryViewParams
): Promise<AxiosResponse<any>> => {
  return baseService.get(`${BASE_URL}/ranking-order-by-sector`, { params });
};

const getCompanyRankingFactoryView = (
  params: IRankingFactoryViewParams
): Promise<AxiosResponse<any>> => {
  return baseService.get(`${BASE_URL}/ranking-order-by-factor`, { params });
};

export default {
  getCompanyDetails,
  getCompanies,
  getCompanyRanking,
  getCompanyCategory,
  getCompanyStockInfo,
  getProgressCompanies,
  getCompaniesRankingTop,
  getMonthlyCategoryScore,
  getCompaniesRankingBottom,
  updateCompaniesRankingTop,
  updateCompaniesRankingBottom,
  getCompanyRankingFactoryView,
  getCompanyRankingCategoryView,
  getFactorScore,
  getCompaniesNew,
};
