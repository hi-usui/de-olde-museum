import {
  NAVIGATOR_TAB_DECREMENT,
  NAVIGATOR_TAB_INCREMENT,
  NAVIGATOR_TAB_QUIT,
} from "actions/_index";
import _ from "lodash";

const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case NAVIGATOR_TAB_INCREMENT:
      return state + 1;
    case NAVIGATOR_TAB_DECREMENT:
      if (state <= 1) {
        return 0;
      } else {
        return state - 1;
      }
    case NAVIGATOR_TAB_QUIT:
      return 0;

    default:
      return state;
  }
}
