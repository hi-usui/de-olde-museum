import { combineReducers } from "redux";

import art from "./art";
import cart from "./cart";
import navigator from "./navigator";

export default combineReducers({
  art,
  cart,
  navigator,
});
