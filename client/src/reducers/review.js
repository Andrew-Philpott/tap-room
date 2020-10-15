import * as a from "../constants/review";

const initialState = {
  reviews: [],
  fetching: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case a.GET_REVIEWS_REQUEST:
    case a.NEW_REVIEW_REQUEST:
    case a.UPDATE_REVIEW_REQUEST:
    case a.DELETE_REVIEW_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.GET_REVIEWS_FAILURE:
    case a.NEW_REVIEW_FAILURE:
    case a.UPDATE_REVIEW_FAILURE:
    case a.DELETE_REVIEW_FAILURE:
      const validationErrors = action.payload.validationErrors
        ? action.payload.validationErrors
        : null;
      const status =
        typeof action.payload === "number" && action.payload === 500
          ? "Internal server error."
          : null;
      return {
        ...state,
        fetching: false,
        error: {
          validationErrors: validationErrors,
          status: status,
          other: !validationErrors && !status && action.payload,
        },
      };
    case a.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        fetching: false,
        reviews: [...action.payload],
      };
    case a.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        fetching: false,
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
    case a.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [
          ...state.reviews.filter(
            (x) => x.reviewId !== action.payload.reviewId
          ),
        ],
      };
    default:
      return state;
  }
};
