import requestOptions from "../helpers/request-options";
import handleResponse from "../helpers/handle-response";

export default {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};

function getReview(id) {
  return fetch(
    `http://localhost:5000/api/reviews/${id}`,
    requestOptions.getOptions
  ).then(handleResponse);
}

async function getReviews() {
  await fetch(
    `http://localhost:5000/api/reviews`,
    requestOptions.getOptions
  ).then(handleResponse);
}

function createReview(review) {
  return fetch(
    `http://localhost:5000/api/reviews`,
    requestOptions.postOptions(review)
  ).then(handleResponse);
}

function updateReview(id, review) {
  return fetch(
    `http://localhost:5000/api/reviews/${id}`,
    requestOptions.putOptions(review)
  ).then(handleResponse);
}

function deleteReview(id) {
  return fetch(
    `http://localhost:5000/api/reviews/${id}`,
    requestOptions.deleteOptions
  ).then(handleResponse);
}
