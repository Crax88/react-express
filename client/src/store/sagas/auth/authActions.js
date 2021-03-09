import {
  REGISTER_REQUEST,
  REQUEST_USER,
  LOGIN_REQUEST,
  START_LOGOUT,
} from "../../types";

export const register = (data) => {
  return {
    type: REGISTER_REQUEST,
    payload: data,
  };
};

export const login = (data) => {
  return {
    type: LOGIN_REQUEST,
    payload: data,
  };
};

export const logout = () => ({
  type: START_LOGOUT,
});

export const requestUser = () => ({ type: REQUEST_USER });
