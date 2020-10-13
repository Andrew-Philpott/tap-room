import * as a from "../constants/beer";

export const getBeers = () => ({
  type: a.GET_BEERS,
});
export const newBeer = () => ({
  type: a.NEW_BEER,
});
export const deleteBeer = () => ({
  type: a.DELETE_BEER,
});
export const updateBeer = () => ({
  type: a.UPDATE_BEER,
});
export const increaseBeerPints = () => ({
  type: a.INCREASE_BEER_PINT_QUANTITY,
});
export const decreaseBeerPints = () => ({
  type: a.DECREASE_BEER_PINTS,
});
