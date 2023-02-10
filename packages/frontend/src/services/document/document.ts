import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { DocumentList, DocumentUrl, Pagination } from "../../types";

const BASE_URL = "/api/v1/documents";

const getDocuments = (
  company_id: number = null,
  keyword = "",
  pagination?: Pagination
): Promise<AxiosResponse<DocumentList>> => {
  return baseService.get(`${BASE_URL}`, {
    params: {
      company_id,
      keyword,
      ...pagination,
    },
  });
};

const getDocumentTempUrl = (
  document_id: number
): Promise<AxiosResponse<DocumentUrl>> => {
  return baseService.get(`${BASE_URL}/${document_id}/get_temp_url`);
};

export default {
  getDocuments,
  getDocumentTempUrl,
};
