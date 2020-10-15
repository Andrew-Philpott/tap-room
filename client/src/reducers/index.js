import { combineReducers } from "redux";
import beersReducer from "./beer";
import reviewsReducer from "./review";
import authReducer from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
  beers: beersReducer,
  reviews: reviewsReducer,
});

export default rootReducer;
