import axios from "axios";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REQUEST_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  LOGOUT,
  START_LOGOUT,
} from "../../types";
import { initAlert } from "../alert/alertActions";
import { setAuthToken } from "../../../utils/setAuthToken";

const registerUser = async (credentials) => {
  console.log(credentials);
  const config = {
    headers: {
      Content_Type: "multipart/form-data",
    },
  };
  return await axios.post("/api/users", credentials, config);
};
const loginUser = async (credentials) => {
  const config = {
    headers: {
      Content_Type: "application/json",
    },
  };
  return await axios.post("/api/auth", credentials, config);
};
const fetchUser = async (url) => {
  return await axios.get(`api${url}`, {
    headers: { "Content-Type": "application/json" },
  });
};
const setTokenToLocalStorage = async (token) => {
  await localStorage.setItem("token", token);
};
function* register(action) {
  const formData = new FormData();
  formData.append("image", action.payload.avatar);
  action.payload.avatar = formData;
  try {
    const res = yield call(registerUser, action.payload);
    yield call(setTokenToLocalStorage, res.data);
    yield put({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({ type: REGISTER_FAIL });
  }
}

function* loadUser() {
  if (localStorage.getItem("token")) {
    yield call(setAuthToken, localStorage.getItem("token"));
  }
  try {
    const res = yield call(fetchUser, "/auth");
    yield put({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: AUTH_ERROR });
  }
}

function* login(action) {
  try {
    const res = yield call(loginUser, action.payload);
    yield call(setTokenToLocalStorage, res.data.token);
    yield call(setAuthToken, res.data.token);
    yield put({ type: LOGIN_SUCCESS, payload: res.data });
    yield put({ type: REQUEST_USER });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({ type: LOGIN_FAIL });
  }
}

function* logout() {
  yield put({ type: LOGOUT });
  yield put({ type: CLEAR_PROFILE });
}

export function* watchAuth() {
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(REQUEST_USER, loadUser);
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(START_LOGOUT, logout);
}
