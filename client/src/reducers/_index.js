import { combineReducers } from "redux";

import art from "./art";
import cart from "./cart";
import page from "./page";

export default combineReducers({
  art,
  cart,
  page,
});
