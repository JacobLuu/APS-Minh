import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  getCategoriesDropdownListFailed,
  getCategoriesDropdownListRequested,
  getCategoriesDropdownListSucceeded,
} from "../reducers/ranking_dropdown_list";
import categoryService from "../services/category";

import type { CategoriesDropdownList } from "../types/category";

function* getCategoriesDropdownListFlow() {
  try {
    const response: AxiosResponse<CategoriesDropdownList> = yield call(
      categoryService.categoriesDropdownList
    );
    yield put({
      type: getCategoriesDropdownListSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getCategoriesDropdownListFailed().type,
      payload: {
        status: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* categoriesDropdownListWatcher() {
  yield takeEvery(
    getCategoriesDropdownListRequested().type,
    getCategoriesDropdownListFlow
  );
}

export default {
  categoriesDropdownListWatcher,
};
