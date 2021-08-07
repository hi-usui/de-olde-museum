import { NAVIGATOR_PAGE_SET } from "actions/_index";
import _ from "lodash";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case NAVIGATOR_ARTIST_SET:
      return {
        ...state,
        page: action.payload,
      };
    case NAVIGATOR_SCREEN_SET:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}
