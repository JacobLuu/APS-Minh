import axios from "axios";

import { ACCESS_TOKEN } from "../../constants/localStorage";

const baseConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};

const baseService = axios.create(baseConfig);

baseService.interceptors.request.use(
  (config) => {
    const accessToken = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    if (accessToken) config.headers.Authorization = accessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseService;
