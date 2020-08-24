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

const baseUrl = "http://localhost:5000/api/v1/beers";

async function getBeer(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.getOptions()).then(
    handleResponse
  );
}

async function getBeers() {
  return await fetch(baseUrl, requestOptions.getOptions()).then(handleResponse);
}

async function incrementPints(id) {
  return await fetch(
    `${baseUrl}/increment/${id}`,
    requestOptions.putOptions({})
  ).then(handleResponse);
}

async function decrementPints(id) {
  return await fetch(
    `${baseUrl}/decrement/${id}`,
    requestOptions.putOptions({})
  ).then(handleResponse);
}

async function createBeer(beer) {
  return await fetch(`${baseUrl}`, requestOptions.postOptions(beer)).then(
    handleResponse
  );
}

async function updateBeer(id, beer) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.putOptions(beer)).then(
    handleResponse
  );
}

async function deleteBeer(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.deleteOptions()).then(
    handleResponse
  );
}
