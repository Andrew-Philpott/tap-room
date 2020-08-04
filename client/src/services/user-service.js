import {
  getOptions,
  putOptions,
  deleteOptions,
  postOptions,
} from "../helpers/request-options";
import handleResponse from "../helpers/handle-response";

export const userService = {
  login,
  logout,
  getUser,
  getUsers,
  register,
  updateUser,
  deleteUser,
};

function getUser(id) {
  return fetch(`http://localhost:5000/api/users/${id}`, getOptions).then(
    handleResponse
  );
}

function getUsers() {
  return fetch(`http://localhost:5000/api/users`, getOptions).then(
    handleResponse
  );
}

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(
    `http://localhost:5000/api/users/authenticate`,
    requestOptions
  ).then(handleResponse);
}

function logout() {
  localStorage.removeItem("user");
}

function register(user) {
  return fetch(
    `http://localhost:5000/api/users/register`,
    postOptions(user)
  ).then(handleResponse);
}

function updateUser(user) {
  return fetch(`http://localhost:5000/api/users`, putOptions(user)).then(
    handleResponse
  );
}

function deleteUser(id) {
  return fetch(`http://localhost:5000/api/users/${id}`, deleteOptions).then(
    handleResponse
  );
}
