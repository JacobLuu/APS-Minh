import { AxiosResponse } from "axios";

import {
  Language,
  LoginForm,
  MembersState,
  UpdateUserForm,
  UserState,
} from "../../types";
import baseService from "../baseApi";

export const BASE_URL = "/api/v1/members";

export interface UserResponse {
  email_address: string;
  first_name: string;
  id: string;
  last_name: string;
  organization_id: string;
  role: string;
}

const updateUser = (data: UpdateUserForm): Promise<AxiosResponse<any>> => {
  return baseService.put(`${BASE_URL}/profile`, data);
};

const getMembers = (): Promise<AxiosResponse<MembersState>> => {
  return baseService.get(`${BASE_URL}`, {
    params: {
      limit: -1,
      offset: 0,
    },
  });
};

const updateRole = (memberId: string, role: string): Promise<MembersState> => {
  return baseService.put(`${BASE_URL}/${memberId}/set_role`, { role });
};

const updateLanguage = (data: Language): Promise<UserState> => {
  return baseService.put(`${BASE_URL}/update_language`, data);
};

const login = (data: LoginForm): Promise<AxiosResponse<UserResponse>> => {
  return baseService.post(`${BASE_URL}/login`, data);
};

const verify = (): Promise<AxiosResponse<UserResponse>> => {
  return baseService.get(`${BASE_URL}/status`);
};

const resetPassword = (data: {
  token: string;
  password: string;
}): Promise<AxiosResponse<{ result: string }>> => {
  return baseService.put(`${BASE_URL}/change_password`, data);
};

const updatePassword = (data: {
  old_password: string;
  new_password: string;
}): Promise<AxiosResponse<UserResponse>> => {
  return baseService.put(`${BASE_URL}/update_password`, data);
};

export default {
  updateUser,
  getMembers,
  updateRole,
  updateLanguage,
  login,
  verify,
  resetPassword,
  updatePassword,
};
