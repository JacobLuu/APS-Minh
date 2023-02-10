import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  getMembersFailed,
  getMembersRequested,
  getMembersSucceeded,
  updateRoleFailed,
  updateRoleRequested,
  updateRoleSucceeded,
} from "../reducers/members";
import membersService from "../services/members";
import { MembersState } from "../types";

function* getMembersFlow() {
  try {
    const response: AxiosResponse<MembersState> = yield call(
      membersService.getMembers
    );
    yield put({
      type: getMembersSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getMembersFailed.type,
      payload: {
        statusCode: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* updateRoleFlow(
  action: PayloadAction<{ memberId: string; role: string }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<MembersState> = yield call(
      membersService.updateRole,
      payload.memberId,
      payload.role
    );
    yield put({
      type: updateRoleSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: updateRoleFailed.type,
      payload: {
        statusCode: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* membersWatcher() {
  yield takeEvery(getMembersRequested.type, getMembersFlow);
  yield takeEvery(updateRoleRequested.type, updateRoleFlow);
}

export default {
  membersWatcher,
};
