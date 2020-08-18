import reviewConstants from "../constants/beer-constants";

export default (state = {}, action) => {
  switch (action.type) {
    case reviewConstants.GET_SUCCESS:
      return {
        ...state,
        item: action.payload,
      };
    case reviewConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case reviewConstants.CREATE_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case reviewConstants.UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(
          (x) => x.reviewId !== action.payload.reviewId
        ),
      };
    case reviewConstants.DELETE_SUCCESS:
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
