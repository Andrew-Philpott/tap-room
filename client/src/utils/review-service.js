import requestOptions from "./request-options";
import handleResponse from "./handle-response";

const baseUrl = "https://taproomapi.azurewebsites.net/api/v1/reviews";

export async function getMyReviews(auth) {
  return await fetch(
    baseUrl + "/me",
    requestOptions.getOptions(await auth)
  ).then(handleResponse);
}

export async function createReview(auth, review) {
  return await fetch(
    baseUrl,
    requestOptions.postOptions(await auth, review)
  ).then(handleResponse);
}

export async function updateReview(auth, id, review) {
  return await fetch(
    `${baseUrl}/${id}`,
    requestOptions.putOptions(await auth, review)
  ).then(handleResponse);
}

export async function deleteReview(auth, id) {
  return await fetch(
    `${baseUrl}/${id}`,
    requestOptions.deleteOptions(await auth)
  ).then(handleResponse);
}

export const createLike = async (auth, like) => {
  return await fetch(
    `${baseUrl}/like`,
    requestOptions.postOptions(await auth, like)
  ).then(handleResponse);
};

export async function deleteLike(auth, id) {
  return await fetch(
    `${baseUrl}/like/${id}`,
    requestOptions.deleteOptions(await auth)
  ).then(handleResponse);
}
