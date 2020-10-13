import * as a from "../constants/review";

export const getReviews = () => ({
  type: a.GET_REVIEWS,
  payload: result,
});
export const newReview = () => ({
  type: a.NEW_REVIEW,
  payload: result,
});
export const deleteReview = () => ({
  type: a.DELETE_REVIEW,
  payload: result,
});
export const updateReview = () => ({
  type: a.UPDATE_REVIEW,
  payload: result,
});
export const createLike = () => ({
  type: a.CREATE_LIKE,
  payload: result,
});
export const deleteLike = () => ({
  type: a.DELETE_LIKE,
  payload: result,
});
