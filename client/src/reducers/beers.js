import * as a from "../constants/beer";

const initialState = {
  beers: [],
  beer: null,
  fetching: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case a.GET_BEER_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.GET_BEER_SUCCESS:
      return {
        ...state,
        beer: action.payload,
        fetching: false,
      };
    case a.GET_BEER_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.GET_BEERS_REQUEST:
      return { ...state, fetching: true, error: null };
    case a.GET_BEERS_SUCCESS:
      return {
        ...state,
        beers: [...action.payload],
        fetching: false,
      };
    case a.GET_BEERS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.NEW_BEER_REQUEST:
      return { ...state, fetching: true, error: null };
    case a.NEW_BEER_SUCCESS:
      return {
        ...state,
        fetching: false,
        beers: [...state.beers, action.payload],
      };
    case a.NEW_BEER_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.UPDATE_BEER_REQUEST:
      return { ...state, fetching: true, error: null };
    case a.UPDATE_BEER_SUCCESS:
      return {
        ...state,
        fetching: false,
        beers: [...state.beers.map((x) => (x.beerId === res.beerId ? res : x))],
      };
    case a.UPDATE_BEER_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.DELETE_BEER_REQUEST:
      return { ...state, fetching: true, error: null };
    case a.DELETE_BEER_SUCCESS:
      return {
        ...state,
        fetching: false,
        beers: [
          ...state.beers.filter((x) => x.beerId !== action.payload.beerId),
        ],
      };
    case a.DELETE_BEER_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.INCREASE_BEER_PINTS_REQUEST:
      return { ...state, fetching: true, error: null };
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
    case a.INCREASE_BEER_PINTS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.DECREASE_BEER_PINTS_REQUEST:
      return { ...state, fetching: true, error: null };
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
    case a.DECREASE_BEER_PINTS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.CREATE_LIKE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.CREATE_LIKE_SUCCESS:
      const newState = { ...state.beer };
      const review = newState.reviews.find(
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
    case a.CREATE_LIKE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case a.DELETE_LIKE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case a.DELETE_LIKE_SUCCESS:
      const newState = { ...state.beer };
      const review = newState.reviews.find(
        (x) => x.reviewId === action.payload.reviewId
      );
      review.likes = review.likes.filter(
        (x) => x.reviewLikeId !== action.payload.reviewLikeId
      );
      newState.reviews = beer.reviews.map((x) =>
        x.reviewId === item.reviewId ? review : x
      );
      return {
        ...state,
        fetching: false,
        beer: newState,
      };
    case a.DELETE_LIKE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
