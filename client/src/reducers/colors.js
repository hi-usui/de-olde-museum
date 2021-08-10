import { USER_COLOR_SET } from "actions/_index";
import _ from "lodash";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_COLOR_SET:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
