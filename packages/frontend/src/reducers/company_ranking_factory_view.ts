import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface ICompanyRankingFactoryView {
  rankingList: any[];
  totalCount: 0;
  factorScoreToEdit: null;
}

// 🔴 Todo: move to type
interface IQueryRankingParams {
  sector_id?: string;
  category_id?: string;
  factor_id?: string;
  direction?: "asc" | "desc";
  keyword?: string;
  limit: number;
  offset: number;
}

const initialState: ICompanyRankingFactoryView = {
  rankingList: [],
  totalCount: 0,
  factorScoreToEdit: null,
};

const companyRankingFactoryViewSlice = createSlice({
  name: "companyRankingFactoryView",
  initialState,
  reducers: {
    getRankingListRequest: (
      _state: ICompanyRankingFactoryView,
      _action: PayloadAction<IQueryRankingParams>
    ) => {},
    getRankingListSucceeded: (
      state: ICompanyRankingFactoryView,
      action: PayloadAction
    ) => {
      state.rankingList = action.payload.ranking_list;
      state.totalCount = action.payload.total_count;
    },
    getFactorScoreToEditRequest: (
      _state: ICompanyRankingFactoryView,
      _action: PayloadAction<{ factorScoreId: number }>
    ) => {},
    getFactorScoreToEditSucceeded: (
      state: ICompanyRankingFactoryView,
      action: PayloadAction<any>
    ) => {
      state.factorScoreToEdit = action.payload;
    },
  },
});

const { actions, reducer } = companyRankingFactoryViewSlice;

export const {
  getRankingListRequest,
  getRankingListSucceeded,
  getFactorScoreToEditRequest,
  getFactorScoreToEditSucceeded,
} = actions;

export const selectCompanyRankingFactoryView = (state: RootState) =>
  state.companyRankingFactoryView;

export default reducer;
