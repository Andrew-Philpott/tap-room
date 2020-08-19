import userService from "../services/user-service";
import userConstants from "../constants/user-constants";
import history from "../helpers/history";
import errorActions from "./error-actions";

function login(username, password) {
  return (dispatch) => {
    dispatch(loginRequest());
    userService.login(username, password).then(
      (user) => {
        dispatch(loginSuccess(user));
        history.push("/account");
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function loginRequest() {
  return { type: userConstants.LOGIN_REQUEST };
}
function loginSuccess(user) {
  return { type: userConstants.LOGIN_SUCCESS, payload: user };
}
function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
function getUser(id) {
  return (dispatch) => {
    userService.getUser(id).then(
      (user) => dispatch(getUserSuccess(user)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function getUserSuccess(user) {
  return { type: userConstants.GET_USER_SUCCESS, payload: user };
}
function getUsers() {
  return (dispatch) => {
    userService.getUsers().then(
      (users) => dispatch(getUsersSuccess(users)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function getUsersSuccess(users) {
  return { type: userConstants.GET_USERS_SUCCESS, payload: users };
}
function register(user) {
  return (dispatch) => {
    dispatch(registerRequest());
    userService.register(user).then(
      (user) => {
        dispatch(registerSuccess());
        history.push("/login");
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function registerRequest() {
  return { type: userConstants.REGISTER_REQUEST };
}
function registerSuccess(user) {
  return { type: userConstants.REGISTER_SUCCESS };
}

function updateUser(id, user) {
  return (dispatch) => {
    userService.updateUser(id, user).then(
      (user) => dispatch(updateUserSuccess(user)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function updateUserSuccess(user) {
  return { type: userConstants.UPDATE_USER_SUCCESS, payload: user };
}

function deleteUser(id) {
  return (dispatch) => {
    userService.deleteUser(id).then(
      (user) => dispatch(deleteUserSuccess(user)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
}
function deleteUserSuccess() {
  return { type: userConstants.DELETE_USER_SUCCESS };
}

export const userActions = {
  login,
  logout,
  getUser,
  getUsers,
  register,
  updateUser,
  deleteUser,
};
export const userActionTypes = {
  loginRequest,
  registerRequest,
  loginSuccess,
  registerSuccess,
  getUserSuccess,
  getUsersSuccess,
  updateUserSuccess,
  deleteUserSuccess,
};
