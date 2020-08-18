import authHeader from "./authentication-header";

export default {
  getOptions,
  putOptions,
  deleteOptions,
  postOptions,
};

function getOptions() {
  return { method: "GET", headers: authHeader() };
}

function putOptions(model) {
  const request = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return request;
}

function deleteOptions() {
  return {
    method: "DELETE",
    headers: authHeader(),
  };
}

function postOptions(model) {
  const request = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return request;
}
