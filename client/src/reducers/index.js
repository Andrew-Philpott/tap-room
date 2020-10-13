import { combineReducers } from "redux";
import beersReducer from "./beer";
import reviewsReducer from "./review";

const rootReducer = combineReducers({
  beers: beersReducer,
  reviews: reviewsReducer,
});

export default rootReducer;
