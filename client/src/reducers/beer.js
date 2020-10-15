import * as a from "../constants/beer";

const initialState = {
  beers: [],
  beer: null,
  fetching: false,
  error: null,
};

export default (state = initialState, action) => {
  let newState;
  let review;
  switch (action.type) {
    case a.GET_BEER_REQUEST:
    case a.GET_BEERS_REQUEST:
    case a.NEW_BEER_REQUEST:
    case a.UPDATE_BEER_REQUEST:
    case a.DELETE_BEER_REQUEST:
    case a.DECREASE_BEER_PINTS_REQUEST:
    case a.INCREASE_BEER_PINTS_REQUEST:
    case a.CREATE_LIKE_REQUEST:
    case a.DELETE_LIKE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.GET_BEER_FAILURE:
    case a.GET_BEERS_FAILURE:
    case a.NEW_BEER_FAILURE:
    case a.UPDATE_BEER_FAILURE:
    case a.DELETE_BEER_FAILURE:
    case a.INCREASE_BEER_PINTS_FAILURE:
    case a.DECREASE_BEER_PINTS_FAILURE:
    case a.CREATE_LIKE_FAILURE:
    case a.DELETE_LIKE_FAILURE:
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
    case a.GET_BEER_SUCCESS:
      return {
        ...state,
        beer: action.payload,
        fetching: false,
      };
    case a.GET_BEERS_SUCCESS:
      return {
        ...state,
        beers: [...action.payload],
        fetching: false,
      };
    case a.NEW_BEER_SUCCESS:
      return {
        ...state,
        fetching: false,
        beers: [...state.beers, action.payload],
      };
    case a.UPDATE_BEER_SUCCESS:
      return {
        ...state,
        fetching: false,
        beers: [
          ...state.beers.map((x) =>
            x.beerId === action.payload.beerId ? action.payload : x
          ),
        ],
      };
    case a.DELETE_BEER_SUCCESS:
      return {
        ...state,
        fetching: false,
        beers: [
          ...state.beers.filter((x) => x.beerId !== action.payload.beerId),
        ],
      };
    case a.INCREASE_BEER_PINTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        beers: [
          ...state.beers.map((x) =>
            x.beerId === action.payload.beerId ? action.payload : x
          ),
        ],
      };
    case a.DECREASE_BEER_PINTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        beers: [
          ...state.beers.map((x) =>
            x.beerId === action.payload.beerId ? action.payload : x
          ),
        ],
      };
    case a.CREATE_LIKE_SUCCESS:
      newState = { ...state.beer };
      review = newState.reviews.find(
        (x) => x.reviewId === action.payload.reviewId
      );
      review.likes.push(action.payload);
      newState.reviews = newState.reviews.map((x) =>
        x.reviewId === action.payload.reviewId ? review : x
      );
      return {
        ...state,
        fetching: false,
        beer: newState,
      };
    case a.DELETE_LIKE_SUCCESS:
      newState = { ...state.beer };
      review = newState.reviews.find(
        (x) => x.reviewId === action.payload.reviewId
      );
      review.likes = review.likes.filter(
        (x) => x.reviewLikeId !== action.payload.reviewLikeId
      );
      newState.reviews = newState.reviews.map((x) =>
        x.reviewId === action.payload.reviewId ? review : x
      );
      return {
        ...state,
        fetching: false,
        beer: newState,
      };
    default:
      return state;
  }
};
