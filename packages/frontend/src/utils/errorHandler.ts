import { ACCESS_TOKEN } from "../constants/localStorage";
import { LOGIN_PATH } from "../constants/paths";

export const handleUnauthorizedError = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  window.location.replace(LOGIN_PATH);
};

export default {
  handleUnauthorizedError,
};
