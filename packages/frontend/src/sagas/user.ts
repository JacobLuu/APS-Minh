import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import { ACCESS_TOKEN } from "../constants/localStorage";
import {
  loginFailed,
  loginRequested,
  loginSucceeded,
  updateLanguageFailed,
  updateLanguageRequested,
  updateLanguageSucceed,
  updatePasswordFailed,
  updatePasswordRequested,
  updatePasswordSucceed,
  updateUserFailed,
  updateUserRequested,
  updateUserSucceeded,
  verifyFailed,
  verifyRequested,
  verifySucceeded,
} from "../reducers/user";
import membersService from "../services/members";

import type { Language, LoginForm, UpdateUserForm, UserState } from "../types";
import { resetTokenExpiredToFalse } from "../reducers/shared";
// The parameter is automatically provided to the saga when its called inside takeEvery
// https://redux-saga.js.org/docs/api#takeeverypattern-saga-args
function* loginFlow(data: PayloadAction<LoginForm>) {
  try {
    const response = yield call(membersService.login, data.payload);
    const xAuthToken =
      "x-auth-token" in response.headers
        ? response.headers["x-auth-token"]
        : null;

    if (
      xAuthToken != null &&
      response.data.first_name &&
      response.data.last_name
    ) {
      yield put({
        type: loginSucceeded.type,
        payload: {
          name: response.data.first_name + response.data.last_name,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email_address: response.data.email_address,
          organization_id: response.data.organization_id,
          role: response.data.role,
          language: response.data.language,
          xAuthToken: xAuthToken,
          organization: response.data.organization,
        },
      });
      yield put({
        type: resetTokenExpiredToFalse.type,
      });
    } else {
      yield put({
        type: loginFailed.type,
      });
    }
  } catch (error: any) {
    yield put({ type: loginFailed.type, payload: error.response });
  }
}

function* verifyTokenFlow() {
  try {
    const response: AxiosResponse<UserState> = yield call(
      membersService.verify
    );
    yield put({
      type: verifySucceeded.type,
      payload: {
        name: response.data.first_name + response.data.last_name,
        id: response.data.id,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email_address: response.data.email_address,
        organization_id: response.data.organization_id,
        role: response.data.role,
        language: response.data.language,
        xAuthToken: localStorage.getItem(ACCESS_TOKEN),
        organization: response.data.organization,
      },
    });
  } catch (error: any) {
    yield put({ type: verifyFailed.type, payload: error.response });
  }
}

function* updateUserFlow(action: PayloadAction<UpdateUserForm>) {
  try {
    const response = yield call(membersService.updateUser, action.payload);
    yield put({
      type: updateUserSucceeded.type,
      payload: {
        id: response.data.id,
        name: response.data.first_name + response.data.last_name,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email_address: response.data.email_address,
        role: response.data.role,
        xAuthToken: localStorage.getItem(ACCESS_TOKEN),
      },
    });
  } catch (error: any) {
    yield put({ type: updateUserFailed.type, payload: error.response });
  }
}

function* updatePasswordFlow(
  action: PayloadAction<{ old_password: string; new_password: string }>
) {
  try {
    yield call(membersService.updatePassword, action.payload);
    yield put({
      type: updatePasswordSucceed.type,
    });
  } catch (error: any) {
    yield put({ type: updatePasswordFailed.type, payload: error.response });
  }
}

function* updateLanguageFlow(action: PayloadAction<Language>) {
  try {
    const response = yield call(membersService.updateLanguage, action.payload);
    const { language } = response.data;
    yield put({
      type: updateLanguageSucceed.type,
      payload: {
        language,
      },
    });
  } catch (error: any) {
    yield put({ type: updateLanguageFailed.type, payload: error.response });
  }
}

function* userWatcher() {
  yield takeEvery(loginRequested.type, loginFlow);
  yield takeEvery(verifyRequested.type, verifyTokenFlow);
  yield takeEvery(updateUserRequested.type, updateUserFlow);
  yield takeEvery(updatePasswordRequested.type, updatePasswordFlow);
  yield takeEvery(updateLanguageRequested.type, updateLanguageFlow);
}
export default {
  userWatcher,
};
