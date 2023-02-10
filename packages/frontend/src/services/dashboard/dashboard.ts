import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { DashboardState } from "../../types";

export const BASE_URL = "/api/v1/dashboard";

const getDashboard = (): Promise<AxiosResponse<DashboardState>> => {
  return baseService.get(`${BASE_URL}`);
};

export default {
  getDashboard,
};
