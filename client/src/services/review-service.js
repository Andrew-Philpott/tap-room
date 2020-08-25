import requestOptions from "../helpers/request-options";
import handleResponse from "../helpers/handle-response";

export default {
  getReview,
  getReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
  createLike,
  deleteLike,
};

const baseUrl = "https://taproomapi.azurewebsites.net/api/v1/reviews";

async function getReview(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.getOptions());
}

async function getReviews() {
  return await fetch(baseUrl, requestOptions.getOptions());
}

async function getMyReviews(auth) {
  return await fetch(
    baseUrl + "/me",
    requestOptions.getOptions(await auth)
  ).then(handleResponse);
}

async function createReview(auth, review) {
  return await fetch(
    baseUrl,
    requestOptions.postOptions(await auth, review)
  ).then(handleResponse);
}

async function updateReview(auth, id, review) {
  return await fetch(
    `${baseUrl}/${id}`,
    requestOptions.putOptions(await auth, review)
  ).then(handleResponse);
}

async function deleteReview(auth, id) {
  return await fetch(
    `${baseUrl}/${id}`,
    requestOptions.deleteOptions(await auth)
  ).then(handleResponse);
}

async function createLike(auth, like) {
  return await fetch(
    `${baseUrl}/like`,
    requestOptions.postOptions(await auth, like)
  ).then(handleResponse);
}

async function deleteLike(auth, id) {
  return await fetch(
    `${baseUrl}/like/${id}`,
    requestOptions.deleteOptions(await auth)
  ).then(handleResponse);
}
