import * as action from "./ActionTypes";

export const newBeer = (beer) => ({
  type: action.NEW_BEER,
  payload: beer,
});

export const deleteBeer = (id) => ({
  type: action.DELETE_BEER,
  payload: id,
});

export const updateBeer = (beer) => ({
  type: action.UPDATE_BEER,
  payload: beer,
});

export const toggleEditBeerFormVisibility = () => ({
  type: action.TOGGLE_EDIT_BEER_FORM_VISIBILITY,
});

export const toggleNewBeerFormVisibility = () => ({
  type: action.TOGGLE_NEW_BEER_FORM_VISIBILITY,
});

export const increaseBeerPintQuantity = (id) => ({
  type: action.INCREASE_BEER_PINT_QUANTITY,
  payload: id,
});

export const decreaseBeerPintQuantity = (id) => ({
  type: action.DECREASE_BEER_PINT_QUANTITY,
  payload: id,
});

export const selectBeer = (beer) => ({
  type: action.SELECT_BEER,
  payload: beer,
});

export const deselectBeer = () => ({
  type: action.DESELECT_BEER,
});
