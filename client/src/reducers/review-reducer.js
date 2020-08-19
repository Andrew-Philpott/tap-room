import reviewConstants from "../constants/review-constants";

const initialState = {
  items: [],
  item: {},
};

export default (state = initialState, action) => {
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
        items: state.items.map((x) =>
          x.reviewId === action.payload.reviewId ? action.payload : x
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
