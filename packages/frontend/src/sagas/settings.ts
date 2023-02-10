import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
  activateTemporaryDataSetsConflicted,
  activateTemporaryDataSetsFailed,
  activateTemporaryDataSetsRequested,
  activateTemporaryDataSetsSucceeded,
  cancelTemporaryDataSetsFailed,
  cancelTemporaryDataSetsRequested,
  cancelTemporaryDataSetsSucceeded,
  checkProcessStatusRequested,
  checkProcessStatusSucceeded,
  getCategoriesFailed,
  getCategoriesRequested,
  getCategoriesSucceeded,
  uploadFrameworkFileFailed,
  uploadFrameworkFileRequested,
  uploadFrameworkFileSucceeded,
} from "../reducers/settings/categories";
import {
  getFactorFailed,
  getFactorRequested,
  getFactorSucceeded,
} from "../reducers/settings/factor";
import {
  getTemplateFileFailed,
  getTemplateFileRequested,
  getTemplateFileSucceeded,
} from "../reducers/settings/template";
import settingService from "../services/settings";
import { FactorState } from "../types/settings";

function* checkProcessStatusFlow(
  action: PayloadAction<{ isTooltipStatus: boolean }>
) {
  const { payload } = action;
  try {
    yield call(settingService.checkProcessStatus);
    yield put({
      type: checkProcessStatusSucceeded.type,
      payload: {
        isProcessing: false,
        isUploadFrameworkStatus: false,
        isTooltipStatus: payload.isTooltipStatus,
      },
    });
  } catch (error: any) {
    if (error.response.status === 423) {
      yield put({
        type: checkProcessStatusSucceeded.type,
        payload: {
          isProcessing: true,
          isUploadFrameworkStatus: true,
          isTooltipStatus: false,
        },
      });
    } else {
      yield put({
        type: checkProcessStatusSucceeded.type,
        payload: {
          isProcessing: false,
          isUploadFrameworkStatus: false,
          isTooltipStatus: false,
        },
      });
    }
  }
}

function* getCategoriesFlow() {
  try {
    const response: AxiosResponse<any> = yield call(
      settingService.getCategories
    );
    yield put({
      type: getCategoriesSucceeded.type,
      payload: { categories: response.data.list },
    });
  } catch (error: any) {
    yield put({ type: getCategoriesFailed.type, payload: error.response });
  }
}

function* getFactorFlow(action: PayloadAction<{ factorId: number }>) {
  const { payload } = action;
  try {
    const response: AxiosResponse<FactorState> = yield call(
      settingService.getFactor,
      payload.factorId
    );
    yield put({
      type: getFactorSucceeded.type,
      payload: { factor: response.data },
    });
  } catch (error: any) {
    yield put({ type: getFactorFailed.type, payload: error.response });
  }
}

function* uploadFrameworkFileFlow(action: PayloadAction<{ file: File }>) {
  const { payload } = action;
  try {
    const response: AxiosResponse<any> = yield call(
      settingService.uploadFrameworkFile,
      payload.file
    );
    yield put({
      type: uploadFrameworkFileSucceeded.type,
      payload: { categories: response.data.list },
    });
  } catch (error: any) {
    yield put({
      type: uploadFrameworkFileFailed.type,
      payload: error.response,
    });
  }
}

function* activateTemporaryDataSetsFlow() {
  try {
    const response: AxiosResponse<any> = yield call(
      settingService.activateTemporaryDataSets
    );
    yield put({
      type: activateTemporaryDataSetsSucceeded.type,
      payload: { categories: response.data.list },
    });
  } catch (error: any) {
    if (error?.response?.status === 409) {
      yield put({
        type: activateTemporaryDataSetsConflicted.type,
        payload: error.response,
      });
    } else {
      yield put({
        type: activateTemporaryDataSetsFailed.type,
        payload: error.response,
      });
    }
  }
}

function* cancelTemporaryDataSetsFlow() {
  try {
    const response: AxiosResponse<any> = yield call(
      settingService.cancelTemporaryDataSets
    );
    yield put({
      type: cancelTemporaryDataSetsSucceeded.type,
      payload: { categories: response.data.list },
    });
  } catch (error: any) {
    yield put({
      type: cancelTemporaryDataSetsFailed.type,
      payload: error.response,
    });
  }
}

function* getTemplateFileFlow(data: PayloadAction<{ framework: string }>) {
  try {
    const response: AxiosResponse<any> = yield call(
      settingService.getFrameworkTemplate,
      data.payload.framework
    );
    const contentDisposition = response.headers["content-disposition"];
    const fileName = contentDisposition
      ? contentDisposition.split("filename=")[1].replaceAll('"', "")
      : "";
    yield put({
      type: getTemplateFileSucceeded.type,
      payload: {
        fileData: response.data,
        fileName,
      },
    });
  } catch (error: any) {
    yield put({ type: getTemplateFileFailed.type, payload: error.response });
  }
}

function* settingsWatcher() {
  yield takeEvery(checkProcessStatusRequested.type, checkProcessStatusFlow);
  yield takeEvery(getCategoriesRequested.type, getCategoriesFlow);
  yield takeEvery(getFactorRequested.type, getFactorFlow);
  yield takeEvery(uploadFrameworkFileRequested.type, uploadFrameworkFileFlow);
  yield takeEvery(
    activateTemporaryDataSetsRequested.type,
    activateTemporaryDataSetsFlow
  );
  yield takeEvery(
    cancelTemporaryDataSetsRequested.type,
    cancelTemporaryDataSetsFlow
  );
  yield takeEvery(getTemplateFileRequested.type, getTemplateFileFlow);
}

export default {
  settingsWatcher,
};
