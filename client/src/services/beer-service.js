import authHeader from "../helpers/authentication-header";
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
  const requestOptions = {
    method: "GET",
  };

  return fetch(`http://localhost:5000/api/beers/${id}`, requestOptions).then(
    handleResponse
  );
}

function getBeers() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`http://localhost:5000/api/beers`, requestOptions).then(
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
    `http://localhost:5000/api/beers/increment/${id}`,
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
    `http://localhost:5000/api/beers/decrement/${id}`,
    requestOptions
  ).then(handleResponse);
}

function createBeer(beer) {
  const userString = localStorage.getItem("user");
  let user = {};
  if (userString) {
    user = JSON.parse(userString);
  }
  console.log(userString);
  console.log(user);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(beer),
  };

  return fetch(`http://localhost:5000/api/beers`, requestOptions).then(
    handleResponse
  );
}

async function updateBeer(id, beer) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(beer),
  };

  return fetch(`http://localhost:5000/api/beers/${id}`, requestOptions).then(
    handleResponse
  );
}

async function deleteBeer(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`http://localhost:5000/api/beers/${id}`, requestOptions).then(
    handleResponse
  );
}
