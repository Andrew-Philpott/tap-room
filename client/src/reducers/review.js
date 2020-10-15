import * as a from "../constants/review";

const initialState = {
  reviews: [],
  fetching: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case a.GET_REVIEWS_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        fetching: false,
        reviews: [...action.payload],
      };
    case a.GET_REVIEWS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.NEW_REVIEW_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        fetching: false,
      };
    case a.NEW_REVIEW_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.UPDATE_REVIEW_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        fetching: false,
        reviews: [
          ...state.reviews.map((x) =>
            x.reviewId === action.payload.reviewId ? action.payload : x
          ),
        ],
      };
    case a.UPDATE_REVIEW_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.DELETE_REVIEW_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [
          ...state.reviews.filter(
            (x) => x.reviewId !== action.payload.reviewId
          ),
        ],
      };
    case a.DELETE_REVIEW_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
