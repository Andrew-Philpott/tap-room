import authHeader from "../helpers/authentication-header";
import handleResponse from "../helpers/handle-response";

export const reviewService = {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};

function getReview(id) {
  const requestOptions = {
    method: "GET",
  };

  const response = fetch(
    `http://localhost:5000/api/reviews/${id}`,
    requestOptions
  );
  return handleResponse(response);
}

async function getReviews() {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(
    `http://localhost:5000/api/reviews`,
    requestOptions
  );
  return handleResponse(response);
}

function createReview(review) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(review),
  };

  return fetch(`http://localhost:5000/api/reviews`, requestOptions).then(
    handleResponse
  );
}

function updateReview(id, review) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(review),
  };

  const response = fetch(
    `http://localhost:5000/api/reviews/${id}`,
    requestOptions
  );
  return handleResponse(response);
}

function deleteReview(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = fetch(
    `http://localhost:5000/api/reviews/${id}`,
    requestOptions
  );
  return handleResponse(response);
}
