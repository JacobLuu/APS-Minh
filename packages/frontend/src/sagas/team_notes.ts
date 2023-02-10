import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getTeamNotesRequested,
  getTeamNotesSucceeded,
  getTeamNotesFailed,
  updateTeamNotesRequested,
  updateNotesSucceeded,
  updateNotesFailed,
  createTeamNoteRequested,
  createNoteSucceeded,
  createNoteFailed,
} from "../reducers/team_notes";
import TeamNotesService from "../services/team_notes";

import type { UpdateTeamNote, TeamNotesState, CreateTeamNote } from "../types";

function* getNotesFlow(
  action: PayloadAction<{
    category_score_id: number;
  }>
) {
  try {
    const response: AxiosResponse<TeamNotesState> = yield call(
      TeamNotesService.getTeamNotes,
      action.payload.category_score_id
    );
    if (response) {
      yield put({
        type: getTeamNotesSucceeded.type,
        payload: response.data,
      });
    }
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: getTeamNotesFailed.type,
      payload: {
        statusCode: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* updateNoteFlow(
  action: PayloadAction<{ id: number; content: string }>
) {
  const { payload } = action;
  try {
    const response: AxiosResponse<UpdateTeamNote> = yield call(
      TeamNotesService.updateTeamNotes,
      payload
    );
    yield put({
      type: updateNotesSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: updateNotesFailed.type,
      payload: {
        statusCode: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* createNoteFlow(action: PayloadAction<any>) {
  const { payload } = action;
  try {
    const requestPayload: CreateTeamNote = {
      category_score_id: payload.category_score_id,
      content: payload.content,
      member_id: payload.member_id,
    };
    const response: AxiosResponse<any> = yield call(
      TeamNotesService.createTeamNote,
      requestPayload
    );
    yield put({
      type: createNoteSucceeded.type,
      payload: response.data,
    });
  } catch (error: any) {
    const { response } = error;
    yield put({
      type: createNoteFailed.type,
      payload: {
        statusCode: response.status,
        message: response.data?.message,
      },
    });
  }
}

function* NotesWatcher() {
  yield takeEvery(getTeamNotesRequested.type, getNotesFlow);
  yield takeEvery(updateTeamNotesRequested.type, updateNoteFlow);
  yield takeEvery(createTeamNoteRequested.type, createNoteFlow);
}

export default {
  NotesWatcher,
};
