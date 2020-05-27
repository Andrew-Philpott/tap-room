import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers";
import * as c from "../constants/routes";

export const userActions = {
  login,
  logout,
  register,
  updateUser,
  deleteUser,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push(c.ACCOUNT);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push(c.LOG_IN);
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function updateUser(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.updateUser(user).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(user.id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.UPDATE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.UPDATE_FAILURE, id, error };
  }
}

function deleteUser(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
