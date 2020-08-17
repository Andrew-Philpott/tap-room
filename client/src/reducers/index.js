import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import registrationReducer from "./registration-reducer";
import usersReducer from "./users-reducer";
import beerListReducer from "./beer-list-reducer";

export const rootReducer = combineReducers({
  beerList: beerListReducer,
  auth: authReducer,
  registration: registrationReducer,
  users: usersReducer,
});
