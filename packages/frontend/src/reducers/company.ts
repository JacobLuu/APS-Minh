import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { RequestStates } from "../types/request";

import type {
  Category as ICategory,
  CompanyDetailsState,
  FactorWeightagesPayload,
} from "../types";

interface ICompanyDetailResponse extends CompanyDetailsState {
  industry: {
    sector: {
      name: string;
    };
  };
  exchange: string;
}

interface IMonthlyCategoryScoreResponse {
  string: number[];
}

const initialState: CompanyDetailsState = {
  id: 0,
  name: "",
  name_cn: "",
  ticker: "",
  company_score: {
    id: 0,
    overall_score: null,
    rank_score: "",
    weightage: null,
  },
  categories: [
    {
      category_label: "environmental",
      category_score: {
        id: 0,
        overall_score: null,
        rank_score: "",
        weightage: null,
        completed_metric_count: null,
        metric_count: null,
        pre_score: null,
      },
      category_type: 0,
      id: 1,
      factors: [],
    },
  ],
  isLoadingVisible: false,
  sector: null,
  stockPrice: null,
  stockPriceDiff: null,
  stockPriceDiffPercentage: null,
  stockExchange: null,
  categoryMetricProgresses: [0, 0, 0],
  monthlyCategoryScores: [
    { category_label: "environmental" },
    { category_label: "social" },
    { category_label: "governance" },
  ],
  requestState: RequestStates.Initial,
  addFactorScoreStatus: RequestStates.Initial,
  statusCode: null,
  status: {
    isInitialized: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  error: {
    message: "",
  },
};

const calculateESGProgress = (
  categories: CompanyDetailsState["categories"]
): number[] => {
  return categories.map(
    ({ category_score: { metric_count, completed_metric_count } }) => {
      if (metric_count !== null) {
        return +completed_metric_count * (100 / metric_count);
      }
      return 0;
    }
  );
};

const getMonthlyCategoryScoreSucceedHandler = (
  state: CompanyDetailsState,
  action: PayloadAction<IMonthlyCategoryScoreResponse>
) => {
  const { payload } = action;
  state.monthlyCategoryScores = Object.keys(payload).map(
    (key: ICategory["category_label"]) => ({
      category_label: key,
      data: payload[key],
    })
  );
};

const getCompanyDetailsSucceededReducer = (
  state: CompanyDetailsState,
  action: PayloadAction<ICompanyDetailResponse>
) => {
  const { payload } = action;
  state.id = payload.id;
  state.name = payload.name;
  state.name_cn = payload.name_cn;
  state.ticker = payload.ticker;
  state.sector = payload.industry.sector.name;
  state.stockExchange = payload.exchange;
  state.company_score = payload.company_score;
  state.categories = payload.categories;
  state.categoryMetricProgresses = calculateESGProgress(payload.categories);
  state.error.message = "";
  state.requestState = RequestStates.Succeeded;
  state.status = {
    ...state.status,
    isInitialized: true,
    isFetching: false,
    isSuccess: true,
    isError: false,
  };
  state.statusCode = 200;
  state.error.message = "";
};

const updateFactorWeightagesSucceededReducer = (
  state: CompanyDetailsState,
  action: PayloadAction<CompanyDetailsState>
) => {
  const { payload } = action;
  state.id = payload.id;
  state.name = payload.name;
  state.name_cn = payload.name_cn;
  state.ticker = payload.ticker;
  state.company_score = payload.company_score;
  state.categories = payload.categories;
};

interface IStockInfo {
  price: number;
  change_point: number;
  change_percentage: number;
}

interface ESGAnswer {
  member_id: string;
  qualitative_score_id: number;
  overall_score: number;
  text: string;
}

const updateCompanyStockInfoReducer = (
  state: CompanyDetailsState,
  action: PayloadAction<IStockInfo>
) => {
  const {
    payload: { price, change_point, change_percentage },
  } = action;
  state.stockPrice = price;
  state.stockPriceDiff = change_point;
  state.stockPriceDiffPercentage = change_percentage;
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    handleShowLoadingOverlay: (
      state: CompanyDetailsState,
      action: PayloadAction<boolean>
    ) => {
      state.isLoadingVisible = action.payload;
    },
    getCompanyDetailsRequested: (
      state: CompanyDetailsState,
      _action: PayloadAction<{
        company_id: number;
        category_id?: number;
      }>
    ) => {
      state.requestState = RequestStates.Requested;
      state.status = {
        ...state.status,
        isFetching: true,
      };
    },
    getCompanyDetailsSucceeded: getCompanyDetailsSucceededReducer,
    getCompanyDetailsFailed: (
      state,
      action: PayloadAction<{
        message: string;
        status: number;
      }>
    ) => {
      state.error.message = action.payload.message;
      state.statusCode = action.payload.status;
      state.status = {
        ...state.status,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
    },
    updateFactorWeightagesRequested: (
      _state: CompanyDetailsState,
      _action: PayloadAction<FactorWeightagesPayload>
    ) => {},
    updateFactorWeightagesSucceeded: updateFactorWeightagesSucceededReducer,
    updateFactorWeightagesFailed: () => {},
    getMonthlyCategoryScoreRequest: (
      _state: CompanyDetailsState,
      _action: PayloadAction<{ companyId: number; year: number }>
    ) => {},
    getMonthlyCategoryScoreSucceed: getMonthlyCategoryScoreSucceedHandler,
    getMonthlyCategoryScoreFail: () => {},
    updateCompanyStockInfo: updateCompanyStockInfoReducer,
    addFactorScoreRequested: (
      state: CompanyDetailsState,
      _action: PayloadAction<{
        company_id: number;
        category_id?: number;
        answers: ESGAnswer[];
      }>
    ) => {
      state.addFactorScoreStatus = RequestStates.Requested;
    },
    addFactorScoreSucceeded: (state: CompanyDetailsState) => {
      state.addFactorScoreStatus = RequestStates.Succeeded;
    },
    addFactorScoreFailed: () => {},
  },
});

const { actions, reducer } = companySlice;

export const {
  getCompanyDetailsRequested,
  getCompanyDetailsSucceeded,
  getCompanyDetailsFailed,
  updateFactorWeightagesRequested,
  updateFactorWeightagesSucceeded,
  updateFactorWeightagesFailed,
  handleShowLoadingOverlay,
  getMonthlyCategoryScoreRequest,
  getMonthlyCategoryScoreSucceed,
  getMonthlyCategoryScoreFail,
  updateCompanyStockInfo,
  addFactorScoreFailed,
  addFactorScoreRequested,
  addFactorScoreSucceeded,
} = actions;

export const selectCompany = (state: RootState) => state.company;

export default reducer;
