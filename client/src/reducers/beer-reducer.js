import beerConstants from "../constants/beer-constants";

export default (state = {}, action) => {
  switch (action.type) {
    case beerConstants.GET_BEER_SUCCESS:
      return {
        item: action.payload,
      };
    case beerConstants.GET_BEERS_SUCCESS:
      return {
        items: action.payload,
      };
    case beerConstants.CREATE_BEER_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case beerConstants.UPDATE_BEER_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter((x) => x.beerId !== action.payload.beerId),
          action.payload,
        ],
      };
    case beerConstants.DELETE_BEER_SUCCESS:
      return {
        ...state,
        items: state.items.filter((x) => x.beerId !== action.payload.beerId),
      };
    case beerConstants.INCREASE_BEER_PINTS_SUCCESS:
      return {
        ...state,
        items: state.items.map((x) =>
          x.beerId === action.payload.beerId ? action.payload : x
        ),
      };
    case beerConstants.DECREASE_BEER_PINTS_SUCCESS:
      return {
        ...state,
        items: state.items.map((x) =>
          x.beerId === action.payload.beerId ? action.payload : x
        ),
      };
    default:
      return state;
  }
};
