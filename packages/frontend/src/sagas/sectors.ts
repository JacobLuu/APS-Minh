import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  getSectorsFailed,
  getSectorsRequested,
  getSectorsSucceeded,
} from "../reducers/sectors";
import sectorsService from "../services/sectors";

import { SectorState } from "../types/sector";

function* getSectorsFlow() {
  try {
    const response: AxiosResponse<SectorState> = yield call(
      sectorsService.getMany
    );
    yield put({
      type: getSectorsSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getSectorsFailed().type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* sectorsWatcher() {
  yield takeEvery(getSectorsRequested().type, getSectorsFlow);
}

export default {
  sectorsWatcher,
};
