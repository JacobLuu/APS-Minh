import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// 🔴 Todo: move interfaces to type file
interface ICompanyRankingCategoryView {
  rankingList: any[];
  totalCount: 0;
}

// 🔴 Todo: move to type
export interface IQueryParams {
  sector_id?: string;
  category_id?: string;
  factor_id?: string;
  direction?: "asc" | "desc";
  keyword?: string;
  limit: number;
  offset: number;
}

const initialState: ICompanyRankingCategoryView = {
  rankingList: [],
  totalCount: 0,
};

const companyRankingCategoryViewSlice = createSlice({
  name: "companyRankingCategoryView",
  initialState,
  reducers: {
    getRankingListRequest: (
      _state: ICompanyRankingCategoryView,
      _action: PayloadAction<IQueryParams>
    ) => {},
    getRankingListSucceeded: (
      state: ICompanyRankingCategoryView,
      action: PayloadAction
    ) => {
      state.rankingList = action.payload.ranking_list;
      state.totalCount = action.payload.total_count;
    },
  },
});

const { actions, reducer } = companyRankingCategoryViewSlice;

export const { getRankingListRequest, getRankingListSucceeded } = actions;

export const selectCompanyRankingCategoryView = (state: RootState) =>
  state.companyRankingCategoryView;

export default reducer;
