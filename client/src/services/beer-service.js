import requestOptions from "../helpers/request-options";
import handleResponse from "../helpers/handle-response";

export default {
  getBeer,
  getBeers,
  createBeer,
  updateBeer,
  deleteBeer,
  incrementPints,
  decrementPints,
};

const baseUrl = "https://taproomapi.azurewebsites.net/api/v1/beers";

async function getBeer(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.getOptions()).then(
    handleResponse
  );
}

async function getBeers() {
  return await fetch(baseUrl, requestOptions.getOptions()).then(handleResponse);
}

async function incrementPints(auth, id) {
  return await fetch(
    `${baseUrl}/increment/${id}`,
    requestOptions.putOptions(await auth, {})
  ).then(handleResponse);
}

async function decrementPints(auth, id) {
  return await fetch(
    `${baseUrl}/decrement/${id}`,
    requestOptions.putOptions(await auth, {})
  ).then(handleResponse);
}

async function createBeer(auth, beer) {
  return await fetch(
    `${baseUrl}`,
    requestOptions.postOptions(await auth, beer)
  ).then(handleResponse);
}

async function updateBeer(auth, id, beer) {
  return await fetch(
    `${baseUrl}/${id}`,
    requestOptions.putOptions(await auth, beer)
  ).then(handleResponse);
}

async function deleteBeer(auth, id) {
  return await fetch(
    `${baseUrl}/${id}`,
    requestOptions.deleteOptions(await auth)
  ).then(handleResponse);
}
