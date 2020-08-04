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

async function getBeer(id) {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(
    `http://localhost:5000/users/beers/${id}`,
    requestOptions
  );
  return handleResponse(response);
}

async function getBeers() {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(
    `http://localhost:5000/users/beers`,
    requestOptions
  );
  return handleResponse(response);
}

async function incrementPints(id) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(id),
  };

  const response = await fetch(
    `http://localhost:5000/users/beers/increment/${id}`,
    requestOptions
  );
  return handleResponse(response);
}

async function decrementPints(id) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(id),
  };

  const response = await fetch(
    `http://localhost:5000/users/beers/decrement/${id}`,
    requestOptions
  );
  return await handleResponse(response);
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

  return fetch(`http://localhost:5000/users/beers`, requestOptions).then(
    handleResponse
  );
}

async function updateBeer(id, beer) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(beer),
  };

  const response = await fetch(
    `http://localhost:5000/users/beers/${id}`,
    requestOptions
  );
  return await handleResponse(response);
}

async function deleteBeer(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(
    `http://localhost:5000/users/beers/${id}`,
    requestOptions
  );
  return await handleResponse(response);
}
