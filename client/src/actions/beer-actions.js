import beerService from "../services/beer-service";
import beerConstants from "../constants/beer-constants";
import history from "../helpers/history";
import errorActions from "./error-actions";

export default {
  getBeer,
  getBeers,
  createBeer,
  updateBeer,
  deleteBeer,
  incrementPints,
  decrementPints,
  success: {
    getBeerSuccess,
    getBeersSuccess,
    createBeerSuccess,
    updateBeerSuccess,
    deleteBeerSuccess,
    incrementPintsSuccess,
    decrementPintsSuccess,
  },
};

function getBeer(id) {
  return (dispatch) => {
    beerService.getBeer(id).then(
      (beer) => {
        return dispatch(getBeerSuccess(beer));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function getBeerSuccess(beer) {
  return { type: beerConstants.GET_BEER_SUCCESS, payload: beer };
}

function getBeers() {
  return (dispatch) => {
    beerService.getBeers().then(
      (beers) => {
        dispatch(getBeersSuccess(beers));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function getBeersSuccess(beers) {
  return { type: beerConstants.GET_BEERS_SUCCESS, payload: beers };
}

function createBeer(beer) {
  return (dispatch) => {
    beerService.createBeer(beer).then(
      (beer) => {
        dispatch(createBeerSuccess(beer));
        history.push("/beers");
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function createBeerSuccess(beer) {
  return { type: beerConstants.CREATE_BEER_SUCCESS, payload: beer };
}

function updateBeer(id, beer) {
  return (dispatch) => {
    beerService.updateBeer(id, beer).then(
      (beer) => {
        dispatch(updateBeerSuccess(beer));
        history.push("/beers");
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function updateBeerSuccess(beer) {
  return { type: beerConstants.UPDATE_BEER_SUCCESS, payload: beer };
}

function deleteBeer(id) {
  return (dispatch) => {
    beerService.deleteBeer(id).then(
      (beer) => dispatch(deleteBeerSuccess(beer)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function deleteBeerSuccess(beer) {
  return { type: beerConstants.DELETE_BEER_SUCCESS, payload: beer };
}

function incrementPints(id) {
  return (dispatch) => {
    beerService.incrementPints(id).then(
      (beer) => dispatch(incrementPintsSuccess(beer)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function incrementPintsSuccess(beer) {
  return { type: beerConstants.INCREASE_BEER_PINTS_SUCCESS, payload: beer };
}

function decrementPints(id) {
  return (dispatch) => {
    beerService.decrementPints(id).then(
      (beer) => dispatch(decrementPintsSuccess(beer)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function decrementPintsSuccess(beer) {
  return { type: beerConstants.DECREASE_BEER_PINTS_SUCCESS, payload: beer };
}
