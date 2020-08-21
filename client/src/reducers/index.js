import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import registrationReducer from "./registration-reducer";
import usersReducer from "./users-reducer";
import beerReducer from "./beer-reducer";
import errorReducer from "./error-reducer";

export const rootReducer = combineReducers({
  error: errorReducer,
  beers: beerReducer,
  authentication: authReducer,
  registration: registrationReducer,
  users: usersReducer,
});
