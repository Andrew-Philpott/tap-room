import config from "config";
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

  return fetch(`${config.apiUrl}/users/reviews/${id}`, requestOptions).then(
    handleResponse
  );
}

function getReviews() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${config.apiUrl}/users/reviews`, requestOptions).then(
    handleResponse
  );
}

function createReview(Review) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(Review),
  };

  return fetch(`${config.apiUrl}/users/reviews`, requestOptions).then(
    handleResponse
  );
}

function updateReview(Review) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(Review),
  };

  return fetch(`${config.apiUrl}/reviews`, requestOptions).then(handleResponse);
}

function deleteReview(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/users/reviews/${id}`, requestOptions).then(
    handleResponse
  );
}
