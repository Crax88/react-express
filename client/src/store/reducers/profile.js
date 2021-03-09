import {
  PROFILE_ERROR,
  PROFILE_LOADED,
  CLEAR_PROFILE,
  PROFILES_LOADED,
  GITHUB_LOADED,
} from "../types";
const initialState = {
  profile: null,
  profiles: null,
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GITHUB_LOADED:
      return {
        ...state,
        repos: payload,
      };
    case PROFILE_LOADED:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILES_LOADED:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
