import * as a from "../constants/review";
import * as r from "../utils/review-service";

export function getReviews(auth) {
  return (dispatch) => {
    dispatch({ type: a.GET_REVIEWS_REQUEST });
    r.getMyReviews(auth)
      .then((result) => {
        dispatch({
          type: a.GET_REVIEWS_SUCCESS,
          payload: result,
        });
      })
      .catch((error) =>
        dispatch({
          type: a.GET_REVIEWS_FAILURE,
          payload: error,
        })
      );
  };
}
export function createReview(auth, review) {
  return (dispatch) => {
    dispatch({ type: a.NEW_REVIEW_REQUEST });
    r.createReview(auth, review)
      .then((result) =>
        dispatch({
          type: a.NEW_REVIEW_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.NEW_REVIEW_FAILURE,
          payload: error,
        })
      );
  };
}
export function deleteReview(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.DELETE_REVIEW_REQUEST });
    r.deleteReview(auth, id)
      .then((result) =>
        dispatch({
          type: a.DELETE_REVIEW_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.DELETE_REVIEW_FAILURE,
          payload: error,
        })
      );
  };
}
export function updateReview(auth, review) {
  return (dispatch) => {
    dispatch({ type: a.UPDATE_REVIEW_REQUEST });
    r.updateReview(auth, review)
      .then((result) =>
        dispatch({
          type: a.UPDATE_REVIEW_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.UPDATE_REVIEW_FAILURE,
          payload: error,
        })
      );
  };
}
