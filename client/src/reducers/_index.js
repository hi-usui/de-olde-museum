import { QUIT } from "actions/_index";
import { combineReducers } from "redux";

import art from "./art";
import colors from "./colors";
import outfit from "./outfit";
import page from "./page";

export default (state, action) =>
  combineReducers({
    art,
    colors,
    outfit,
    page,
  })(action.type == QUIT ? undefined : state, action);
