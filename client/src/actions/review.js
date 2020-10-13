import * as a from "../constants/review";
import * as s from "../utils/review-service";

export function getReviewsAction(auth) {
  return (dispatch) => {
    dispatch({ type: a.GET_REVIEWS_REQUEST });
    s.getMyReviews(auth)
      .then((result) =>
        dispatch({
          type: a.GET_REVIEWS_SUCCESS,
          payload: result,
        })
      )
      .catch((error) =>
        dispatch({
          type: a.GET_REVIEWS_FAILURE,
          payload: error,
        })
      );
  };
}
export function createReviewAction(auth, review) {
  return (dispatch) => {
    dispatch({ type: a.NEW_REVIEW_REQUEST });
    s.createReview(auth, review)
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
export function deleteReviewAction(auth, id) {
  return (dispatch) => {
    dispatch({ type: a.DELETE_REVIEW_REQUEST });
    s.deleteReview(auth, id)
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
export function updateReviewAction(auth, review) {
  return (dispatch) => {
    dispatch({ type: a.UPDATE_REVIEW_REQUEST });
    s.updateReview(auth, review)
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
