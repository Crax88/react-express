import { all, fork } from "redux-saga/effects";
import { watchSetAlert } from "./alert/alertSaga";
import { watchAuth } from "./auth/authSaga";
import { watchProfile } from "./profile/profileSaga";
export default function* rootSaga() {
  yield all([fork(watchSetAlert), fork(watchAuth), fork(watchProfile)]);
}
