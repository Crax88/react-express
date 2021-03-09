import { takeLatest, put, call, all } from "redux-saga/effects";
import axios from "axios";
import { initAlert } from "../alert/alertActions";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  PROFILE_LOADED,
  UPDATE_PROFILE,
  ADD_EXP_PROFILE,
  ADD_EDU_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  GET_PROFILES,
  PROFILES_LOADED,
  GITHUB_REQUEST,
  GITHUB_LOADED,
} from "../../types";

const fetchProfile = async (url) => {
  return await axios.get(`api/profile${url}`);
};

const postProfile = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.post("/api/profile", data, config);
};
const postExpirience = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.put("/api/profile/experience", data, config);
};

const postEducation = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.put("/api/profile/education", data, config);
};

const deleteExperience = async (id) => {
  return await axios.delete(`/api/profile/experience/${id}`);
};

const deleteEducation = async (id) => {
  return await axios.delete(`/api/profile/education/${id}`);
};

const deleteAccount = async (url) => {
  return await axios.delete(`/api/${url}`);
};

const fetchGithub = async (username) => {
  return await axios.get(`/api/profile/github/${username}`);
};

function* loadProfile(action) {
  const url = action.payload ? `/user/${action.payload}` : "/me";
  try {
    const res = yield call(fetchProfile, url);
    yield put({ type: PROFILE_LOADED, payload: res.data });
  } catch (err) {
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

function* loadProfiles() {
  try {
    const res = yield call(fetchProfile, "");
    yield put({ type: PROFILES_LOADED, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

function* updateProfile(action) {
  const { data, history, edit } = action.payload;
  try {
    const res = yield call(postProfile, data);
    yield put({ type: PROFILE_LOADED, payload: res.data });
    yield put(
      initAlert(edit ? "Profile updated" : "Profile created", "success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

function* addExperience(action) {
  const { data, history } = action.payload;
  try {
    const res = yield call(postExpirience, data);
    yield put({ type: PROFILE_LOADED, payload: res.data });
    yield put(initAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

function* addEducation(action) {
  const { data, history } = action.payload;
  try {
    const res = yield call(postEducation, data);
    yield put({ type: PROFILE_LOADED, payload: res.data });
    yield put(initAlert("Education added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

function* deleteExp(action) {
  const { payload } = action;
  try {
    const res = yield call(deleteExperience, payload);
    yield put({ type: PROFILE_LOADED, payload: res.data });
    yield put(initAlert("Experience deleted", "primary"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

function* removeEdu(action) {
  const { payload } = action;
  try {
    const res = yield call(deleteEducation, payload);

    yield put({ type: PROFILE_LOADED, payload: res.data });
    yield put(initAlert("Education deleted", "primary"));
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

function* removeAcc() {
  try {
    yield call(deleteAccount, "profile");

    yield put({ type: CLEAR_PROFILE });
    yield put({ type: DELETE_ACCOUNT });
    yield put(initAlert("Your account has been permanantly deleted"));
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

function* requestGitHub(action) {
  const { payload } = action;
  try {
    const res = yield call(fetchGithub, payload);
    yield put({ type: GITHUB_LOADED, payload: res.data });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      yield all(errors.map((error) => put(initAlert(error.msg, "danger"))));
    }
    yield put({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

export function* watchProfile() {
  yield takeLatest(GET_PROFILE, loadProfile);
  yield takeLatest(GET_PROFILES, loadProfiles);
  yield takeLatest(UPDATE_PROFILE, updateProfile);
  yield takeLatest(ADD_EXP_PROFILE, addExperience);
  yield takeLatest(ADD_EDU_PROFILE, addEducation);
  yield takeLatest(DELETE_EXPERIENCE, deleteExp);
  yield takeLatest(DELETE_EDUCATION, removeEdu);
  yield takeLatest(DELETE_ACCOUNT, removeAcc);
  yield takeLatest(GITHUB_REQUEST, requestGitHub);
}
