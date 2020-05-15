import { beerConstants } from "../constants";

export function beers(state = {}, action) {
  switch (action.type) {
    case beerConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case beerConstants.GETALL_SUCCESS:
      return {
        items: action.beers,
      };
    case beerConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case beerConstants.INCREMENT_PINTS_REQUEST:
      return {
        ...state,
        incrementing: true,
      };
    case beerConstants.INCREMENT_PINTS_SUCCESS:
      return {
        items: state.items.map((x) =>
          x.id == action.beer.id ? action.beer : x
        ),
      };
    case beerConstants.INCREMENT_PINTS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case beerConstants.DECREMENT_PINTS_REQUEST:
      return {
        ...state,
        decrementing: true,
      };
    case beerConstants.DECREMENT_PINTS_SUCCESS:
      return {
        items: state.items.map((x) =>
          x.id == action.beer.id ? action.beer : x
        ),
      };
    case beerConstants.DECREMENT_PINTS_FAILURE:
      return {
        error: action.error,
      };
    case beerConstants.GET_REQUEST:
      return {
        loading: true,
      };
    case beerConstants.GET_SUCCESS:
      return {
        item: action.beer,
      };
    case beerConstants.GET_FAILURE:
      return {
        error: action.error,
      };
    case beerConstants.CREATE_REQUEST:
      return {
        creating: true,
        beer: action.beer,
      };
    case beerConstants.CREATE_SUCCESS:
      return {};
    case beerConstants.CREATE_FAILURE:
      return {
        error: action.error,
      };
    case beerConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true,
        beer: action.beer,
      };
    case beerConstants.UPDATE_SUCCESS:
      return {};
    case beerConstants.UPDATE_FAILURE:
      return {
        ...state,
        items: state.items.map((x) =>
          x.id == action.beer.id ? action.beer : x
        ),
      };
    case beerConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((beer) =>
          beer.id === action.id ? { ...beer, deleting: true } : beer
        ),
      };
    case beerConstants.DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter((beer) => beer.id !== action.id),
      };
    case beerConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map((beer) => {
          if (beer.id === action.id) {
            const { deleting, ...beerCopy } = beer;
            return { ...beerCopy, deleteError: action.error };
          }

          return beer;
        }),
      };
    default:
      return state;
  }
}
