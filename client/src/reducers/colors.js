import { USER_COLOR_COORDINATES, USER_COLOR_SET } from "actions/_index";
import _ from "lodash";

const initialState = { user: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_COLOR_COORDINATES:
      return { user: { ...state.user, coordinates: action.payload } };
    case USER_COLOR_SET:
      return { user: action.payload };

    default:
      return state;
  }
}
