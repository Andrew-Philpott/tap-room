import * as a from "../constants/beer";
import * as s from "../utils/beer-service";

export function getBeer(id) {
  return (dispatch) => {
    dispatch({ type: a.GET_BEER_REQUEST });
    s.getBeer(id)
      .then((result) =>
        dispatch({
          type: a.GET_BEER_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.GET_BEER_FAILURE,
          payload: error,
        })
      );
  };
}
export function getBeers() {
  return (dispatch) => {
    dispatch({ type: a.GET_BEERS_REQUEST });
    s.getBeers()
      .then((result) =>
        dispatch({
          type: a.GET_BEERS_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.GET_BEERS_FAILURE,
          payload: error,
        })
      );
  };
}
export function newBeer(auth, beer) {
  return (dispatch) => {
    dispatch({ type: a.NEW_BEER_REQUEST });
    s.createBeer(auth, beer)
      .then((result) =>
        dispatch({
          type: a.NEW_BEER_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.NEW_BEER_FAILURE,
          payload: error,
        })
      );
  };
}
export function deleteBeer(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.DELETE_BEER_REQUEST });
    s.deleteBeer(auth, id)
      .then((result) =>
        dispatch({ type: a.DELETE_BEER_SUCCESS, payload: result })
      )
      .catch((error) =>
        dispatch({
          type: a.DELETE_BEER_FAILURE,
          payload: error,
        })
      );
  };
}
export function updateBeer(auth, beer) {
  return (dispatch) => {
    dispatch({ type: a.UPDATE_BEER_REQUEST });
    s.updateBeer(auth, beer)
      .then((result) =>
        dispatch({
          type: a.UPDATE_BEER_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.UPDATE_BEER_FAILURE,
          payload: error,
        })
      );
  };
}
export function increaseBeerPints(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.INCREASE_BEER_PINTS_REQUEST });
    s.incrementPints(auth, id)
      .then((result) =>
        dispatch({
          type: a.INCREASE_BEER_PINTS_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.INCREASE_BEER_PINTS_FAILURE,
          payload: error,
        })
      );
  };
}
export function decreaseBeerPints(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.DECREASE_BEER_PINTS_REQUEST });
    s.decrementPints(auth, id)
      .then((result) =>
        dispatch({
          type: a.DECREASE_BEER_PINTS_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.DECREASE_BEER_PINTS_FAILURE,
          payload: error,
        })
      );
  };
}
export function createLike(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.CREATE_LIKE_REQUEST });
    s.createLike(auth, id)
      .then((result) =>
        dispatch({
          type: a.CREATE_LIKE_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.CREATE_LIKE_FAILURE,
          payload: error,
        })
      );
  };
}
export function deleteLike(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.DELETE_LIKE_REQUEST });
    s.deleteLike(auth, id)
      .then((result) =>
        dispatch({
          type: a.DELETE_LIKE_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.DELETE_LIKE_FAILURE,
          payload: error,
        })
      );
  };
}
