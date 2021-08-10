import { combineReducers } from "redux";

import art from "./art";
import cart from "./cart";
import colors from "./colors";
import page from "./page";

export default combineReducers({
  art,
  cart,
  colors,
  page,
});
