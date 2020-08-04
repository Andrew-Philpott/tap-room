import authHeader from "./authentication-header";

export const getOptions = {
  method: "GET",
  headers: authHeader(),
};

export const putOptions = (model) => {
  const request = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return request;
};

export const deleteOptions = {
  method: "DELETE",
  headers: authHeader(),
};

export const postOptions = (model) => {
  const request = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return request;
};
