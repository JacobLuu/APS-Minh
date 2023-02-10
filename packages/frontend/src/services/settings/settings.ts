import { AxiosResponse } from "axios";

import { CategoriesState, FactorState } from "../../types/settings";
import baseService from "../baseApi";

export const BASE_URL = "/api/v1/framework_settings";

const checkProcessStatus = async (): Promise<
  AxiosResponse<CategoriesState>
> => {
  return await baseService.get(`${BASE_URL}/status`);
};

const getCategories = async (): Promise<AxiosResponse<CategoriesState>> => {
  return await baseService.get(`${BASE_URL}/category_template`);
};

const getFactor = async (
  factorId: number
): Promise<AxiosResponse<FactorState>> => {
  return await baseService.get(`${BASE_URL}/factor_template/${factorId}`);
};

const uploadFrameworkFile = async (
  file: File
): Promise<AxiosResponse<CategoriesState>> => {
  const param = new FormData();
  param.set("file", file);
  return await baseService.post(
    `${BASE_URL}/upload-user-defined-framework`,
    param,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};

const activateTemporaryDataSets = async (): Promise<
  AxiosResponse<CategoriesState>
> => {
  return await baseService.put(`${BASE_URL}/activate-temporary-data-sets`);
};

const cancelTemporaryDataSets = async (): Promise<
  AxiosResponse<CategoriesState>
> => {
  return await baseService.put(`${BASE_URL}/cancel-temporary-data-sets`);
};

const getFrameworkTemplate = async (
  framework: string
): Promise<AxiosResponse<Blob>> => {
  return await baseService.get(`${BASE_URL}/template`, {
    responseType: "blob",
    params: {
      framework,
    },
  });
};

export default {
  checkProcessStatus,
  getCategories,
  getFactor,
  uploadFrameworkFile,
  activateTemporaryDataSets,
  cancelTemporaryDataSets,
  getFrameworkTemplate,
};
