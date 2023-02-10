import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import { SectorState } from "../../types/sector";

export const BASE_URL = "/api/v1/sectors";

const getMany = async (): Promise<AxiosResponse<SectorState>> => {
  return await baseService.get(`${BASE_URL}`);
};

export default {
  getMany,
};
