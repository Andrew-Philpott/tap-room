import reviewConstants from "../constants/review-constants";

export default (state = {}, action) => {
  switch (action.type) {
    case reviewConstants.GET_REVIEW_SUCCESS:
      return {
        ...state,
        item: action.payload,
      };
    case reviewConstants.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case reviewConstants.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case reviewConstants.UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        items: state.items.filter(
          (x) => x.reviewId !== action.payload.reviewId
        ),
      };
    case reviewConstants.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        items: state.items.filter(
          (x) => x.reviewId !== action.payload.reviewId
        ),
      };
    default:
      return state;
  }
};
