import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import registrationReducer from "./registration-reducer";
import usersReducer from "./users-reducer";
import beerReducer from "./beer-reducer";

export const rootReducer = combineReducers({
  beers: beerReducer,
  authentication: authReducer,
  registration: registrationReducer,
  users: usersReducer,
});
