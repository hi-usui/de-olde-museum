import { PAGE_SET } from "actions/_index";
import _ from "lodash";

const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case PAGE_SET:
      return action.payload;
    default:
      return state;
  }
}
