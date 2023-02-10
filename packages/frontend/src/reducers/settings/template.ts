import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { TemplateFileState } from "../../types/settings";

const initialState: TemplateFileState = {
  fileData: undefined,
  fileName: "",
};

const factorSlice = createSlice({
  name: "settingsFactor",
  initialState,
  reducers: {
    getTemplateFileRequested: (
      _state,
      _action: PayloadAction<{ framework: string }>
    ) => {},
    getTemplateFileSucceeded: (
      state: TemplateFileState,
      action: PayloadAction<TemplateFileState>
    ) => {
      const { payload } = action;
      state.fileData = payload.fileData;
      state.fileName = payload.fileName;
    },
    getTemplateFileFailed: (state: TemplateFileState) => {
      state.fileData = undefined;
    },
  },
});

const { actions, reducer } = factorSlice;

export const {
  getTemplateFileRequested,
  getTemplateFileSucceeded,
  getTemplateFileFailed,
} = actions;

export const selectTemplateFile = (state: RootState) =>
  state.settingsTemplateFile;

export default reducer;
