import { AxiosResponse } from "axios";

import baseService from "../baseApi";

export const BASE_URL = "/api/v1/maintenance";

const replaceDB = (): Promise<AxiosResponse<any>> => {
  return baseService.post(`${BASE_URL}/all`);
};

const seedDemoDB = (): Promise<AxiosResponse<any>> => {
  return baseService.post(`${BASE_URL}/demo-data`, {
    key: "Nex@2",
  });
};

export default {
  replaceDB,
  seedDemoDB,
};
