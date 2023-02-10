import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";

import type { CategoriesDropdownList } from "../types/category";

const initialState: CategoriesDropdownList = {
  categories: [],
  sectors: [],
};

const categorySlice = createSlice({
  name: "rankingDropdownList",
  initialState,
  reducers: {
    getCategoriesDropdownListRequested: () => {},
    getCategoriesDropdownListSucceeded: (
      state: CategoriesDropdownList,
      action: PayloadAction<CategoriesDropdownList>
    ) => {
      const { payload } = action;
      state.categories = payload.categories;
      state.sectors = payload.sectors;
    },
    getCategoriesDropdownListFailed: () => {},
  },
});

const { actions, reducer } = categorySlice;

export const {
  getCategoriesDropdownListRequested,
  getCategoriesDropdownListSucceeded,
  getCategoriesDropdownListFailed,
} = actions;

export const selectRankingDropdownList = (state: RootState) =>
  state.rankingDropdownList;

export default reducer;
