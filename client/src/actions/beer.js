import * as a from "../constants/beer";
import {
  getBeer,
  getBeers,
  createBeer,
  updateBeer,
  deleteBeer,
  incrementPints,
  decrementPints,
} from "../utils/beer-service";
import { createLike, deleteLike } from "../utils/review-service";

export function getBeerAction(id) {
  return (dispatch) => {
    dispatch({ type: a.GET_BEER_REQUEST });
    getBeer(id)
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
export function getBeersAction() {
  return (dispatch) => {
    dispatch({ type: a.GET_BEERS_REQUEST });
    getBeers()
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
export function createBeerAction(auth, beer) {
  return (dispatch) => {
    dispatch({ type: a.NEW_BEER_REQUEST });
    createBeer(auth, beer)
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
export function deleteBeerAction(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.DELETE_BEER_REQUEST });
    deleteBeer(auth, id)
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
export function updateBeerAction(auth, beer) {
  return (dispatch) => {
    dispatch({ type: a.UPDATE_BEER_REQUEST });
    updateBeer(auth, beer)
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
export function increaseBeerPintsAction(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.INCREASE_BEER_PINTS_REQUEST });
    incrementPints(auth, id)
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
export function decreaseBeerPintsAction(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.DECREASE_BEER_PINTS_REQUEST });
    decrementPints(auth, id)
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
export function createLikeAction(auth, like) {
  return (dispatch) => {
    dispatch({ type: a.CREATE_LIKE_REQUEST });
    createLike(auth, like)
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
export function deleteLikeAction(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.DELETE_LIKE_REQUEST });
    deleteLike(auth, id)
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
