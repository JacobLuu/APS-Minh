import { AxiosResponse } from "axios";

import baseService from "../baseApi";

export const BASE_URL = "/api/v1/mails";

const forgetPassword = (data: {
  email_address: string;
}): Promise<AxiosResponse<{ result: string }>> => {
  return baseService.post(`${BASE_URL}/send_change_password_mail`, data);
};

export default {
  forgetPassword,
};
