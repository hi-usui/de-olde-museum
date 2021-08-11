import { ART_PREVIEW, ART_SCROLL_LEFT } from "actions/_index";
import _ from "lodash";

const initialState = { scrollLeft: 0, preview: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case ART_SCROLL_LEFT:
      return { ...state, scrollLeft: action.payload };
    case ART_PREVIEW:
      return { ...state, preview: action.payload };
    default:
      return state;
  }
}
