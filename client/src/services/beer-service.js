import config from "config";
import { authHeader } from "../helpers";
import { handleResponse } from "../helpers";

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
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${config.apiUrl}/users/beers/${id}`, requestOptions).then(
    handleResponse
  );
}

function getBeers() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${config.apiUrl}/users/beers`, requestOptions).then(
    handleResponse
  );
}

function incrementPints(id) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(id),
  };

  return fetch(
    `${config.apiUrl}/users/beers/increment/${id}`,
    requestOptions
  ).then(handleResponse);
}

function decrementPints(id) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(id),
  };

  return fetch(
    `${config.apiUrl}/users/beers/decrement/${id}`,
    requestOptions
  ).then(handleResponse);
}

function createBeer(beer) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(beer),
  };

  return fetch(`${config.apiUrl}/users/beers`, requestOptions).then(
    handleResponse
  );
}

function updateBeer(id, beer) {
  console.log("In update beer service");
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(beer),
  };

  return fetch(`${config.apiUrl}/users/beers/${id}`, requestOptions).then(
    handleResponse
  );
}

function deleteBeer(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/users/beers/${id}`, requestOptions).then(
    handleResponse
  );
}
