import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ActionType, ErrorType } from "../../types/settings";
import { CategoriesState, RequestStates } from "../../types";
import { CategoryType, FrameworkStatusType } from "../../constants/enums";

const initialState: CategoriesState = {
  categories: [
    {
      id: 1,
      category_label: "environmental",
      category_type: CategoryType.environmental,
      themes: [],
      factors: [
        {
          id: 1,
          label: "",
          description: "",
          status: FrameworkStatusType.active,
          questionnaires: [
            {
              id: 1,
              text: "",
            },
            {
              id: 2,
              text: "",
            },
          ],
          indicator_keys: [
            {
              id: 1,
              label: "",
            },
          ],
        },
      ],
    },
  ],
  requestState: RequestStates.Initial,
  actionType: ActionType.none,
  isUploadFrameworkStatus: false,
  isRequesting: false,
  isProcessing: false,
  isConflicted: false,
  errorType: ErrorType,
  isTooltipStatus: false,
};

const categoriesSlice = createSlice({
  name: "settingsCategories",
  initialState,
  reducers: {
    checkProcessStatusRequested: (state: CategoriesState) => {
      state.isRequesting = true;
      state.actionType = ActionType.checkProcessStatus;
    },
    checkProcessStatusSucceeded: (state: CategoriesState, { payload }) => {
      state.isProcessing = payload.isProcessing;
      state.isUploadFrameworkStatus = payload.isUploadFrameworkStatus;
      state.isTooltipStatus = payload.isTooltipStatus;
      state.isRequesting = false;
    },
    getCategoriesRequested: (state: CategoriesState) => {
      state.isRequesting = true;
      state.actionType = ActionType.getData;
    },
    getCategoriesSucceeded: (
      state: CategoriesState,
      action: PayloadAction<CategoriesState>
    ) => {
      const { payload } = action;
      state.categories = payload.categories;
      state.isRequesting = false;
    },
    getCategoriesFailed: (state: CategoriesState) => {
      state.isRequesting = false;
    },
    uploadFrameworkFileRequested: (
      state: CategoriesState,
      _action: PayloadAction<{ file: File }>
    ) => {
      state.isRequesting = true;
      state.actionType = ActionType.uploadFrameworkFile;
    },
    uploadFrameworkFileSucceeded: (
      state: CategoriesState,
      action: PayloadAction<CategoriesState>
    ) => {
      const { payload } = action;
      state.categories = payload.categories;
      state.requestState = RequestStates.Succeeded;
      state.isRequesting = false;
    },
    uploadFrameworkFileFailed: (
      state: CategoriesState,
      action: PayloadAction<CategoriesState>
    ) => {
      const { payload } = action;
      state.requestState = RequestStates.Failed;
      state.isRequesting = false;

      if (payload.data.message === "FrameworkImportFactorLengthErrorMessage") {
        state.errorType = ErrorType.FrameworkImportFactorLengthErrorMessage;
      } else {
        state.errorType = ErrorType.Other;
      }
    },
    activateTemporaryDataSetsRequested: (state: CategoriesState) => {
      state.isRequesting = true;
      state.actionType = ActionType.activateTemporaryData;
    },
    activateTemporaryDataSetsSucceeded: (
      state: CategoriesState,
      action: PayloadAction<CategoriesState>
    ) => {
      const { payload } = action;
      state.categories = payload.categories;
      state.isUploadFrameworkStatus = true;
      state.requestState = RequestStates.Succeeded;
      state.isRequesting = false;
    },
    activateTemporaryDataSetsConflicted: (state: CategoriesState) => {
      state.requestState = RequestStates.Conflict;
      state.isRequesting = false;
      state.isConflicted = true;
    },
    activateTemporaryDataSetsFailed: (state: CategoriesState) => {
      state.requestState = RequestStates.Failed;
      state.isRequesting = false;
    },
    cancelTemporaryDataSetsRequested: (state: CategoriesState) => {
      state.isRequesting = true;
      state.actionType = ActionType.cancelTemporaryData;
    },
    cancelTemporaryDataSetsSucceeded: (
      state: CategoriesState,
      action: PayloadAction<CategoriesState>
    ) => {
      const { payload } = action;
      state.categories = payload.categories;
      state.requestState = RequestStates.Succeeded;
      state.isRequesting = false;
    },
    cancelTemporaryDataSetsFailed: (state: CategoriesState) => {
      state.requestState = RequestStates.Failed;
      state.isRequesting = false;
    },
    resetRequestState: (state: CategoriesState) => {
      state.requestState = RequestStates.Initial;
    },
  },
});

const { actions, reducer } = categoriesSlice;

export const {
  checkProcessStatusRequested,
  checkProcessStatusSucceeded,
  getCategoriesRequested,
  getCategoriesSucceeded,
  getCategoriesFailed,
  uploadFrameworkFileRequested,
  uploadFrameworkFileSucceeded,
  uploadFrameworkFileFailed,
  activateTemporaryDataSetsRequested,
  activateTemporaryDataSetsSucceeded,
  activateTemporaryDataSetsConflicted,
  activateTemporaryDataSetsFailed,
  cancelTemporaryDataSetsRequested,
  cancelTemporaryDataSetsSucceeded,
  cancelTemporaryDataSetsFailed,
  resetRequestState,
} = actions;

export const selectCategories = (state: RootState) => state.settingsCategories;

export default reducer;
