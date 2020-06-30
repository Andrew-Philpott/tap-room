import { authHeader } from "../helpers/authentication-header";
import { handleResponse } from "../helpers/handle-response";

export const userService = {
  login,
  logout,
  register,
  updateUser,
  deleteUser,
};

function login(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`http://localhost:4000/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
    });
}

function logout() {
  localStorage.removeItem("user");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`http://localhost:4000/users/register`, requestOptions).then(
    handleResponse
  );
}

function updateUser(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`http://localhost:4000/users`, requestOptions).then(
    handleResponse
  );
}

function deleteUser(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`http://localhost:4000/users/${id}`, requestOptions).then(
    handleResponse
  );
}
