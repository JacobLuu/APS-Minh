import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import type { FactorState } from "../../types";
import { FrameworkStatusType, Language } from "../../constants/enums";

const initialState: FactorState = {
  factor: {
    id: 0,
    label: "",
    description: "",
    status: FrameworkStatusType.active,
    questionnaires: [
      {
        id: 1,
        text: "",
        text_cn: "",
      },
      {
        id: 2,
        text: "",
        text_cn: "",
      },
    ],
    indicator_keys: [
      {
        id: null,
        label: "",
        indicator_keywords: [
          {
            id: null,
            keyword: "",
            locale: Language.english,
          },
        ],
        indicator_key_setting: null,
      },
    ],
  },
};

const factorSlice = createSlice({
  name: "settingsFactor",
  initialState,
  reducers: {
    getFactorRequested: (
      _state: FactorState,
      _action: PayloadAction<{ factorId: number }>
    ) => {},
    getFactorSucceeded: (
      state: FactorState,
      action: PayloadAction<FactorState>
    ) => {
      const { payload } = action;
      state.factor = payload.factor;
    },
    getFactorFailed: (state: FactorState) => {
      state.factor = null;
    },
  },
});

const { actions, reducer } = factorSlice;

export const { getFactorRequested, getFactorSucceeded, getFactorFailed } =
  actions;

export const selectFactor = (state: RootState) => state.settingsFactor;

export default reducer;
