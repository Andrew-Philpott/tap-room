import userService from "../services/user-service";
import userConstants from "../constants/user-constants";
import history from "../helpers/history";
import errorActions from "./error-actions";

export default {
  login,
  logout,
  getUser,
  getUsers,
  register,
  updateUser,
  deleteUser,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request());
    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/account");
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, payload: user };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function getUser(id) {
  return (dispatch) => {
    userService.getUser(id).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(user) {
    return { type: userConstants.GET_SUCCESS, payload: user };
  }
}

function getUsers() {
  return (dispatch) => {
    userService.getUsers().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, payload: users };
  }
}

function register(user) {
  return (dispatch) => {
    dispatch(request());
    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/login");
      },
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success(users) {
    return { type: userConstants.REGISTER_SUCCESS, payload: users };
  }
}

function updateUser(id, user) {
  return (dispatch) => {
    userService.updateUser(id, user).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, payload: user };
  }
}

function deleteUser(id) {
  return (dispatch) => {
    userService.deleteUser(id).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(errorActions.error(error.toString()))
    );
  };
  function success() {
    return { type: userConstants.DELETE_SUCCESS };
  }
}
