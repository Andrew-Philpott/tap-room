import authHeader from "./authentication-header";

function getOptions() {
  return { method: "GET", headers: authHeader() };
}

const putOptions = (model) => {
  const request = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return request;
};

function deleteOptions() {
  return {
    method: "DELETE",
    headers: authHeader(),
  };
}

const postOptions = (model) => {
  const request = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return request;
};

export default {
  getOptions,
  putOptions,
  deleteOptions,
  postOptions,
};
