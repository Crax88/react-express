import { put, takeEvery } from "redux-saga/effects";
import { ADD_ALERT, SET_ALERT, REMOVE_ALERT } from "../../types";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* setAlert(action) {
  const { payload } = action;
  yield put({ type: SET_ALERT, payload });
  yield delay(3000);
  yield put({ type: REMOVE_ALERT, payload: payload.id });
}

export function* watchSetAlert() {
  yield takeEvery(ADD_ALERT, setAlert);
}
