import { ADD_ALERT } from "../../types";

export const initAlert = (msg, alertType) => {
  const id = Date.now().toString();
  return {
    type: ADD_ALERT,
    payload: {
      id,
      msg,
      alertType,
    },
  };
};
