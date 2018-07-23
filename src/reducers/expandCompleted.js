import initialState from "./initialState";
import { TOGGLE_EXPAND_COMPLETED } from "../constants/actionTypes";

const expandCompleted = (state = initialState.expandCompleted, action) => {
  switch (action.type) {
    case TOGGLE_EXPAND_COMPLETED:
      return !state;
    default:
      return state;
  }
};

export default expandCompleted;
