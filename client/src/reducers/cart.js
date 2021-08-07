import { CART_ADD, CART_DELETE } from "actions/_index";
import _ from "lodash";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case CART_ADD:
      return {
        ...state,
        placeholder: action.payload,
      };
    // case CART_DELETE:
    //   return {
    //     ...state,
    //     placeholder: action.payload,
    //   };
    // case CART_RESET:
    //   return {};
    default:
      return state;
  }
}
