import type { Member } from "./members";
import type { Organization } from "./organization";

export enum LoginStatus {
  Initial = 0,
  Authorized = 1,
  NotAuthorized = 2,
  Revoked = 3,
}

export interface UserState extends Member {
  name: string;
  error?: string;
  xAuthToken: string;
  loginStatus: LoginStatus;
  organization: Organization;
}

export interface LoginForm {
  email_address: string;
  password: string;
}

export interface UpdateUserForm {
  first_name: string;
  last_name;
}
