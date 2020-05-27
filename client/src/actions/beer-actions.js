import { beerConstants } from "../constants";
import { beerService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers";
import * as c from "../constants/routes";

export const beerActions = {
  getBeer,
  getBeers,
  createBeer,
  updateBeer,
  deleteBeer,
  incrementPints,
  decrementPints,
};

function incrementPints(id) {
  return (dispatch) => {
    dispatch(request(id));

    beerService.incrementPints(id).then(
      (beer) => dispatch(success(beer)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: beerConstants.INCREMENT_PINTS_REQUEST, id };
  }
  function success(beer) {
    return { type: beerConstants.INCREMENT_PINTS_SUCCESS, beer };
  }
  function failure(id, error) {
    return { type: beerConstants.INCREMENT_PINTS_FAILURE, id, error };
  }
}

function decrementPints(id) {
  return (dispatch) => {
    dispatch(request(id));

    beerService.decrementPints(id).then(
      (beer) => dispatch(success(beer)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: beerConstants.DECREMENT_PINTS_REQUEST, id };
  }
  function success(beer) {
    return { type: beerConstants.DECREMENT_PINTS_SUCCESS, beer };
  }
  function failure(id, error) {
    return { type: beerConstants.DECREMENT_PINTS_FAILURE, id, error };
  }
}

function getBeer(id) {
  return (dispatch) => {
    dispatch(request(id));

    beerService.getBeer(id).then(
      (beer) => dispatch(success(beer)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: beerConstants.GET_REQUEST, id };
  }
  function success(beer) {
    return { type: beerConstants.GET_SUCCESS, beer };
  }
  function failure(id, error) {
    return { type: beerConstants.GET_FAILURE, id, error };
  }
}

function getBeers() {
  return (dispatch) => {
    dispatch(request());

    beerService.getBeers().then(
      (beers) => dispatch(success(beers)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: beerConstants.GETALL_REQUEST };
  }
  function success(beers) {
    return { type: beerConstants.GETALL_SUCCESS, beers };
  }
  function failure(error) {
    return { type: beerConstants.GETALL_FAILURE, error };
  }
}

function createBeer(beer) {
  return (dispatch) => {
    dispatch(request(beer));

    beerService.createBeer(beer).then(
      (beer) => {
        dispatch(success());
        history.push(c.BEER_LIST);
        dispatch(alertActions.success("Beer created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(beer) {
    return { type: beerConstants.CREATE_REQUEST, beer };
  }
  function success() {
    return { type: beerConstants.CREATE_SUCCESS };
  }
  function failure(error) {
    return { type: beerConstants.CREATE_FAILURE, error };
  }
}

function updateBeer(id, beer) {
  return (dispatch) => {
    dispatch(request(id, beer));
    beerService.updateBeer(id, beer).then(
      (beer) => {
        dispatch(success(beer));
        history.push(c.BEER_LIST);
        dispatch(alertActions.success("Beer updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(beer) {
    return { type: beerConstants.UPDATE_REQUEST, beer };
  }
  function success() {
    return { type: beerConstants.UPDATE_SUCCESS };
  }
  function failure(error) {
    return { type: beerConstants.UPDATE_FAILURE, error };
  }
}

function deleteBeer(id) {
  return (dispatch) => {
    dispatch(request(id));

    beerService.deleteBeer(id).then(
      (id) => {
        dispatch(success(id));
        dispatch(alertActions.success("Beer deleted"));
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: beerConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: beerConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: beerConstants.DELETE_FAILURE, id, error };
  }
}
