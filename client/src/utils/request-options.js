const origin = "http://localhost:6420";
const type = { "Content-Type": "application/json" };

function getOptions(auth) {
  return {
    method: "GET",
    headers: {
      Authorization:
        auth && auth.accessToken ? `Bearer ${auth.accessToken}` : "",
      type,
    },
    origin: origin,
  };
}

const putOptions = (auth, model) => {
  const request = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      type,
    },
    body: JSON.stringify(model),
    origin: origin,
  };
  return request;
};

function deleteOptions(auth) {
  return {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      type,
    },
    origin: origin,
  };
}

const postOptions = (auth, model) => {
  const request = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      type,
    },
    body: JSON.stringify(model),
    origin: origin,
  };
  return request;
};

export default {
  getOptions,
  putOptions,
  deleteOptions,
  postOptions,
};
