import requestOptions from "./request-options";
import handleResponse from "./handle-response";

const baseUrl = "https://taproomapi.azurewebsites.net/api/v1/beers";

export async function getBeer(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.getOptions()).then(
    handleResponse
  );
}

export async function getBeers() {
  return await fetch(baseUrl, requestOptions.getOptions()).then(handleResponse);
}

export async function incrementPints(auth, id) {
  return await fetch(
    `${baseUrl}/increment/${id}`,
    requestOptions.putOptions(await auth, {})
  ).then(handleResponse);
}

export async function decrementPints(auth, id) {
  return await fetch(
    `${baseUrl}/decrement/${id}`,
    requestOptions.putOptions(await auth, {})
  ).then(handleResponse);
}

export async function createBeer(auth, beer) {
  return await fetch(
    `${baseUrl}`,
    requestOptions.postOptions(await auth, beer)
  ).then(handleResponse);
}

export async function updateBeer(auth, id, beer) {
  return await fetch(
    `${baseUrl}/${id}`,
    requestOptions.putOptions(await auth, beer)
  ).then(handleResponse);
}

export async function deleteBeer(auth, id) {
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
