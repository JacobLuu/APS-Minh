import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ACCESS_TOKEN } from "../constants/localStorage";
import { RootState } from "../store/store";
import {
  Language,
  LoginForm,
  LoginStatus,
  UpdateUserForm,
  UserState,
} from "../types";

const initialState: UserState = {
  id: null,
  organization_id: null,
  name: "",
  first_name: "",
  last_name: "",
  email_address: "",
  role: "",
  language: null,
  xAuthToken: null,
  error: null,
  loginStatus: LoginStatus.Initial,
  organization: {
    framework: null,
    id: null,
    name: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequested: (state, _action: PayloadAction<LoginForm>) => {
      state.loginStatus = LoginStatus.Initial;
    },
    loginSucceeded: (state, action: PayloadAction<UserState>) => {
      localStorage.setItem(ACCESS_TOKEN, action.payload.xAuthToken);
      state.xAuthToken = action.payload.xAuthToken;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email_address = action.payload.email_address;
      state.organization_id = action.payload.organization_id;
      state.role = action.payload.role;
      state.language = action.payload.language;
      state.organization = action.payload.organization;
      state.loginStatus = LoginStatus.Authorized;
    },
    loginFailed: (state) => {
      state.loginStatus = LoginStatus.NotAuthorized;
    },
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      state.xAuthToken = null;
      state.name = "";
      // [TODO]: should change to intialState instead of null
      state.organization = null;
      state.loginStatus = LoginStatus.Initial;
    },
    verifyRequested: () => {},
    verifySucceeded: (state, action: PayloadAction<UserState>) => {
      localStorage.setItem(ACCESS_TOKEN, action.payload.xAuthToken);
      state.xAuthToken = action.payload.xAuthToken;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email_address = action.payload.email_address;
      state.organization_id = action.payload.organization_id;
      state.role = action.payload.role;
      state.language = action.payload.language;
      state.error = null;
      state.organization = action.payload.organization;
      state.loginStatus = LoginStatus.Authorized;
    },
    verifyFailed: (state) => {
      state.xAuthToken = null;
      state.id = null;
      state.name = "";
      state.first_name = "";
      state.last_name = "";
      state.email_address = "";
      state.organization_id = "";
      state.role = "";
      state.organization = null;
      state.loginStatus = LoginStatus.NotAuthorized;
    },
    updateUserRequested: (_state, _action: PayloadAction<UpdateUserForm>) => {},
    updateUserSucceeded: (state, action: PayloadAction<UserState>) => {
      localStorage.setItem(ACCESS_TOKEN, action.payload.xAuthToken);
      state.xAuthToken = action.payload.xAuthToken;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.error = null;
      state.loginStatus = LoginStatus.Authorized;
    },
    updateUserFailed: () => {},
    updatePasswordRequested: (
      _state,
      _action: PayloadAction<{ old_password: string; new_password: string }>
    ) => {},
    updatePasswordSucceed: (state) => {
      state.id = null;
      state.name = "";
      state.first_name = "";
      state.last_name = "";
      state.email_address = "";
      state.organization_id = null;
      state.role = "";
      state.xAuthToken = null;
      state.error = null;
      state.loginStatus = LoginStatus.Revoked;
    },
    updatePasswordFailed: (state, action) => {
      state.error = action.payload.data.message;
    },
    updateLanguageRequested: (_state, _action: PayloadAction<Language>) => {},
    updateLanguageSucceed: (state, action: PayloadAction<UserState>) => {
      const { language } = action.payload;
      state.language = language;
    },
    updateLanguageFailed: (state, action) => {
      state.error = action.payload.data.message;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;

// Extract action creators for each action
export const {
  loginRequested,
  loginSucceeded,
  loginFailed,
  logout,
  verifyRequested,
  verifySucceeded,
  verifyFailed,
  updateUserRequested,
  updateUserSucceeded,
  updateUserFailed,
  updatePasswordRequested,
  updatePasswordSucceed,
  updatePasswordFailed,
  updateLanguageRequested,
  updateLanguageSucceed,
  updateLanguageFailed,
  clearError,
} = actions;

export const selectUser = (state: RootState) => state.user;

export default reducer;
