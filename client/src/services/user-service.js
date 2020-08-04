import authHeader from "../helpers/authentication-header";
import handleResponse from "../helpers/handle-response";

export const userService = {
  login,
  logout,
  register,
  updateUser,
  deleteUser,
};

async function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(
    `http://localhost:5000/users/authenticate`,
    requestOptions
  );
  return await handleResponse(response);
}

function logout() {
  localStorage.removeItem("user");
}

async function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(
    `http://localhost:5000/users/register`,
    requestOptions
  );
  return handleResponse(response);
}

async function updateUser(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(`http://localhost:5000/users`, requestOptions);
  return handleResponse(response);
}

async function deleteUser(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(
    `http://localhost:5000/users/${id}`,
    requestOptions
  );
  return handleResponse(response);
}
