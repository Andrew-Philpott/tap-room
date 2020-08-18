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
};

function getBeer(id) {
  return (dispatch) => {
    beerService.getBeer(id).then(
      (beer) => {
        dispatch(success(beer));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(beer) {
    return { type: beerConstants.GET_SUCCESS, payload: beer };
  }
}

function getBeers() {
  return (dispatch) => {
    beerService.getBeers().then(
      (beers) => dispatch(success(beers)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(beers) {
    return { type: beerConstants.GETALL_SUCCESS, payload: beers };
  }
}

function createBeer(beer) {
  return (dispatch) => {
    beerService.createBeer(beer).then(
      (beer) => {
        dispatch(success(beer));
        history.push("/beers");
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(beers) {
    return { type: beerConstants.CREATE_SUCCESS, payload: beers };
  }
}

function updateBeer(id, beer) {
  return (dispatch) => {
    beerService.updateBeer(id, beer).then(
      (beer) => {
        dispatch(success(beer));
        history.push("/beers");
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(beer) {
    return { type: beerConstants.UPDATE_SUCCESS, payload: beer };
  }
}

function deleteBeer(id) {
  return (dispatch) => {
    beerService.deleteBeer(id).then(
      (beer) => dispatch(success(beer)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(beer) {
    return { type: beerConstants.DELETE_SUCCESS, payload: beer };
  }
}

function incrementPints(id) {
  return (dispatch) => {
    beerService.incrementPints(id).then(
      (beer) => dispatch(success(beer)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(beer) {
    return { type: beerConstants.INCREASE_PINTS_SUCCESS, payload: beer };
  }
}

function decrementPints(id) {
  return (dispatch) => {
    beerService.decrementPints(id).then(
      (beer) => dispatch(success(beer)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(beer) {
    return { type: beerConstants.DECREASE_PINTS_SUCCESS, payload: beer };
  }
}
