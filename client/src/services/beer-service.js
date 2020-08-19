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

function getBeer(id) {
  return fetch(
    `http://localhost:5000/api/beers/${id}`,
    requestOptions.getOptions()
  ).then(handleResponse);
}

function getBeers() {
  console.log("hello");
  return fetch(
    `http://localhost:5000/api/beers`,
    requestOptions.getOptions
  ).then(handleResponse);
}

function incrementPints(id) {
  return fetch(
    `http://localhost:5000/api/beers/increment/${id}`,
    requestOptions.putOptions({})
  ).then(handleResponse);
}

function decrementPints(id) {
  return fetch(
    `http://localhost:5000/api/beers/decrement/${id}`,
    requestOptions.putOptions({})
  ).then(handleResponse);
}

function createBeer(beer) {
  return fetch(
    `http://localhost:5000/api/beers`,
    requestOptions.postOptions(beer)
  ).then(handleResponse);
}

async function updateBeer(id, beer) {
  return fetch(
    `http://localhost:5000/api/beers/${id}`,
    requestOptions.putOptions(beer)
  ).then(handleResponse);
}

async function deleteBeer(id) {
  return fetch(
    `http://localhost:5000/api/beers/${id}`,
    requestOptions.deleteOptions
  ).then(handleResponse);
}
