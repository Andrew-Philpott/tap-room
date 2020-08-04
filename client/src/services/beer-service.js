import {
  getOptions,
  putOptions,
  deleteOptions,
  postOptions,
} from "../helpers/request-options";
import handleResponse from "../helpers/handle-response";

export const beerService = {
  getBeer,
  getBeers,
  createBeer,
  updateBeer,
  deleteBeer,
  incrementPints,
  decrementPints,
};

function getBeer(id) {
  return fetch(`http://localhost:5000/api/beers/${id}`, getOptions).then(
    handleResponse
  );
}

function getBeers() {
  return fetch(`http://localhost:5000/api/beers`, getOptions).then(
    handleResponse
  );
}

function incrementPints(id) {
  return fetch(
    `http://localhost:5000/api/beers/increment/${id}`,
    putOptions("")
  ).then(handleResponse);
}

function decrementPints(id) {
  return fetch(
    `http://localhost:5000/api/beers/decrement/${id}`,
    putOptions("")
  ).then(handleResponse);
}

function createBeer(beer) {
  return fetch(`http://localhost:5000/api/beers`, postOptions(beer)).then(
    handleResponse
  );
}

async function updateBeer(id, beer) {
  return fetch(`http://localhost:5000/api/beers/${id}`, putOptions(beer)).then(
    handleResponse
  );
}

async function deleteBeer(id) {
  return fetch(`http://localhost:5000/api/beers/${id}`, deleteOptions).then(
    handleResponse
  );
}
