import requestOptions from "../helpers/request-options";
import handleResponse from "../helpers/handle-response";

export default {
  login,
  logout,
  getUser,
  getUsers,
  register,
  updateUser,
  deleteUser,
};

const baseUrl = "http://localhost:5000/api/users";

async function login(model) {
  return await fetch(
    `${baseUrl}/authenticate`,
    requestOptions.postOptions(model)
  )
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

async function logout() {
  localStorage.removeItem("user");
}

async function getUser(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.getOptions).then(
    handleResponse
  );
}

async function getUsers() {
  return await fetch(`${baseUrl}`, requestOptions.getOptions).then(
    handleResponse
  );
}

async function register(user) {
  return await fetch(
    `${baseUrl}/register`,
    requestOptions.postOptions(user)
  ).then(handleResponse);
}

async function updateUser(user) {
  return await fetch(`${baseUrl}`, requestOptions.putOptions(user)).then(
    handleResponse
  );
}

async function deleteUser(id) {
  return await fetch(`${baseUrl}/${id}`, requestOptions.deleteOptions).then(
    handleResponse
  );
}
