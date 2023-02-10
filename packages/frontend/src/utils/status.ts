import { CLOUDFRONT_VIEWER_COUNTRY } from "../constants/localStorage";
import { successStatus } from "../constants/status";

export const isSuccess = (httpStatus: string): boolean =>
  successStatus.test(httpStatus);

export const isUnauthorized = (httpStatus: string): boolean =>
  /401/.test(httpStatus);

export const isFromChina = () => {
  const country = localStorage.getItem(CLOUDFRONT_VIEWER_COUNTRY);
  return country === "cn";
};

export default {
  isSuccess,
  isUnauthorized,
  isFromChina,
};
