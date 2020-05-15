import { reviewConstants } from "../constants";
import { reviewService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers";

export const reviewActions = {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};

function getReview(id) {
  return (dispatch) => {
    dispatch(request(id));

    reviewService.getReview(id).then(
      (payload) => dispatch(success(payload)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: reviewConstants.GET_REQUEST, id };
  }
  function success(payload) {
    return { type: reviewConstants.GET_SUCCESS, payload };
  }
  function failure(id, error) {
    return { type: reviewConstants.GET_FAILURE, id, error };
  }
}

function getReviews() {
  return (dispatch) => {
    dispatch(request());

    reviewService.getReviews().then(
      (payload) => dispatch(success(payload)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: reviewConstants.GETALL_REQUEST };
  }
  function success(payload) {
    return { type: reviewConstants.GETALL_SUCCESS, payload };
  }
  function failure(error) {
    return { type: reviewConstants.GETALL_FAILURE, error };
  }
}

function createReview(review) {
  return (dispatch) => {
    dispatch(request(review));

    reviewService.createReview(review).then(
      (payload) => {
        dispatch(success());
        history.push("/reviews");
        dispatch(alertActions.success("Review created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(review) {
    return { type: reviewConstants.CREATE_REQUEST, review };
  }
  function success(payload) {
    return { type: reviewConstants.CREATE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: reviewConstants.CREATE_FAILURE, error };
  }
}

function updateReview(review) {
  return (dispatch) => {
    dispatch(request(review));

    reviewService.updateReview(review).then(
      (review) => {
        dispatch(success(review));
        history.push("/reviews");
        dispatch(alertActions.success("Review updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(review) {
    return { type: reviewConstants.UPDATE_REQUEST, review };
  }
  function success(review) {
    return { type: reviewConstants.UPDATE_SUCCESS, review };
  }
  function failure(error) {
    return { type: reviewConstants.UPDATE_FAILURE, error };
  }
}

function deleteReview(id) {
  return (dispatch) => {
    dispatch(request(id));

    reviewService.delete(id).then(
      (review) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: reviewConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: reviewConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: reviewConstants.DELETE_FAILURE, id, error };
  }
}
