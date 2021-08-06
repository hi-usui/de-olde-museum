// import { PLACEHOLDER } from "actions/types";
import _ from "lodash";

const initialState = { songs: [], users: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case ART_ADD:
    // return {
    //   ...state,
    //   placeholder: action.payload,
    // };

    default:
      return state;
  }
}
