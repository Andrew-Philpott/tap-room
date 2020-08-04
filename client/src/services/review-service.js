import {
  getOptions,
  putOptions,
  deleteOptions,
  postOptions,
} from "../helpers/request-options";
import handleResponse from "../helpers/handle-response";

export const reviewService = {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};

function getReview(id) {
  return fetch(`http://localhost:5000/api/reviews/${id}`, getOptions).then(
    handleResponse
  );
}

async function getReviews() {
  await fetch(`http://localhost:5000/api/reviews`, getOptions).then(
    handleResponse
  );
}

function createReview(review) {
  return fetch(`http://localhost:5000/api/reviews`, postOptions(review)).then(
    handleResponse
  );
}

function updateReview(id, review) {
  return fetch(
    `http://localhost:5000/api/reviews/${id}`,
    putOptions(review)
  ).then(handleResponse);
}

function deleteReview(id) {
  return fetch(`http://localhost:5000/api/reviews/${id}`, deleteOptions).then(
    handleResponse
  );
}
