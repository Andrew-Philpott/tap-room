import requestOptions from "../helpers/request-options";
import handleResponse from "../helpers/handle-response";

export default {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};

const baseUrl = "http://localhost:5000/api/reviews";

async function getReview(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.getOptions).then(
    handleResponse
  );
}

async function getReviews() {
  return await fetch(baseUrl, requestOptions.getOptions).then(handleResponse);
}

async function createReview(review) {
  return await fetch(`${baseUrl}`, requestOptions.postOptions(review)).then(
    handleResponse
  );
}

async function updateReview(id, review) {
  return await fetch(
    `${baseUrl}/${id}`,
    requestOptions.putOptions(review)
  ).then(handleResponse);
}

async function deleteReview(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.deleteOptions).then(
    handleResponse
  );
}
