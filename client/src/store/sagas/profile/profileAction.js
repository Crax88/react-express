import {
  GET_PROFILE,
  UPDATE_PROFILE,
  ADD_EXP_PROFILE,
  ADD_EDU_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_ACCOUNT,
  GET_PROFILES,
  GITHUB_REQUEST,
} from "../../types";

export const getProfile = (id) => ({
  type: GET_PROFILE,
  payload: id,
});

export const getAllProfiles = () => ({
  type: GET_PROFILES,
});

export const updateProfile = (data, history, edit = false) => {
  return {
    type: UPDATE_PROFILE,
    payload: { data, history, edit },
  };
};

export const addExp = (data, history) => {
  return {
    type: ADD_EXP_PROFILE,
    payload: { data, history },
  };
};

export const addEdu = (data, history) => {
  return {
    type: ADD_EDU_PROFILE,
    payload: { data, history },
  };
};

export const deleteExp = (id) => ({
  type: DELETE_EXPERIENCE,
  payload: id,
});

export const deleteEdu = (id) => ({
  type: DELETE_EDUCATION,
  payload: id,
});

export const deleteAccount = () => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    return {
      type: DELETE_ACCOUNT,
    };
  }
};

export const requestGithub = (username) => ({
  type: GITHUB_REQUEST,
  payload: username,
});
