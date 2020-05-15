import { reviewConstants } from "../constants";

export function reviews(state = {}, action) {
  switch (action.type) {
    case reviewConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case reviewConstants.GETALL_SUCCESS:
      return {
        items: action.reviews,
      };
    case reviewConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case reviewConstants.GET_REQUEST:
      return {
        loading: true,
      };
    case reviewConstants.GET_SUCCESS:
      return {
        item: action.review,
        reviewItems: action.review.exercises,
      };
    case reviewConstants.GET_FAILURE:
      return {
        error: action.error,
      };
    case reviewConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((review) =>
          review.id === action.id ? { ...review, deleting: true } : review
        ),
      };
    case reviewConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter((review) => review.id !== action.id),
      };
    case reviewConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map((review) => {
          if (review.id === action.id) {
            const { deleting, ...reviewCopy } = review;
            return { ...reviewCopy, deleteError: action.error };
          }

          return review;
        }),
      };
    default:
      return state;
  }
}
