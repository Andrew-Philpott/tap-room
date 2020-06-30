import { authHeader } from "../helpers";
import { handleResponse } from "../helpers";

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

  return fetch(
    `http://localhost:4000/users/reviews/${id}`,
    requestOptions
  ).then(handleResponse);
}

function getReviews() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`http://localhost:4000/users/reviews`, requestOptions).then(
    handleResponse
  );
}

function createReview(Review) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(Review),
  };

  return fetch(`http://localhost:4000/users/reviews`, requestOptions).then(
    handleResponse
  );
}

function updateReview(Review) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(Review),
  };

  return fetch(`http://localhost:4000/reviews`, requestOptions).then(
    handleResponse
  );
}

function deleteReview(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:4000/users/reviews/${id}`,
    requestOptions
  ).then(handleResponse);
}
