import reviewService from "../services/review-service";
import reviewConstants from "../constants/review-constants.js";
import errorActions from "./error-actions";

export default {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};

function getReview(id) {
  return (dispatch) => {
    reviewService.getReview(id).then(
      (review) => {
        dispatch(success(review));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(review) {
    return { type: reviewConstants.GET_SUCCESS, payload: review };
  }
}

function getReviews() {
  return (dispatch) => {
    reviewService.getReviews().then(
      (reviews) => dispatch(success(reviews)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(reviews) {
    return { type: reviewConstants.GETALL_SUCCESS, payload: reviews };
  }
}

function createReview(review) {
  return (dispatch) => {
    reviewService.createReview(review).then(
      (review) => {
        dispatch(success(review));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(reviews) {
    return { type: reviewConstants.CREATE_SUCCESS, payload: reviews };
  }
}

function updateReview(id, Review) {
  return (dispatch) => {
    reviewService.updateReview(id, Review).then(
      (review) => {
        dispatch(success(review));
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(review) {
    return { type: reviewConstants.UPDATE_SUCCESS, payload: review };
  }
}

function deleteReview(id) {
  return (dispatch) => {
    reviewService.deleteReview(id).then(
      (review) => dispatch(success(review)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(review) {
    return { type: reviewConstants.DELETE_SUCCESS, payload: review };
  }
}
