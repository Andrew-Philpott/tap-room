import reviewService from "../services/review-service";
import reviewConstants from "../constants/review-constants.js";
import errorActions from "./error-actions";

function getReview(id) {
  return (dispatch) => {
    reviewService.getReview(id).then(
      (review) => {
        dispatch(getReviewSuccess(review));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function getReviewSuccess(review) {
  return { type: reviewConstants.GET_REVIEW_SUCCESS, payload: review };
}
function getReviews() {
  return (dispatch) => {
    reviewService.getReviews().then(
      (reviews) => dispatch(getReviewsSuccess(reviews)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function getReviewsSuccess(reviews) {
  return { type: reviewConstants.GET_REVIEWS_SUCCESS, payload: reviews };
}
function createReview(review) {
  return (dispatch) => {
    reviewService.createReview(review).then(
      (review) => {
        dispatch(createReviewSuccess(review));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function createReviewSuccess(reviews) {
  return { type: reviewConstants.CREATE_REVIEW_SUCCESS, payload: reviews };
}
function updateReview(id, Review) {
  return (dispatch) => {
    reviewService.updateReview(id, Review).then(
      (review) => {
        dispatch(updateReviewSuccess(review));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function updateReviewSuccess(review) {
  return { type: reviewConstants.UPDATE_REVIEW_SUCCESS, payload: review };
}
function deleteReview(id) {
  return (dispatch) => {
    reviewService.deleteReview(id).then(
      (review) => dispatch(deleteReviewSuccess(review)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function deleteReviewSuccess(review) {
  return { type: reviewConstants.DELETE_REVIEW_SUCCESS, payload: review };
}

export default {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  success: {
    getReviewSuccess,
    getReviewsSuccess,
    createReviewSuccess,
    updateReviewSuccess,
    deleteReviewSuccess,
  },
};
