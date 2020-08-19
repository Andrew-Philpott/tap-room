import { userActionTypes } from "../../actions/user-actions";
import userConstants from "../../constants/user-constants";

describe("user actions", () => {
  const users = [
    {
      userId: 1,
      firstName: "ExampleA",
      lastName: "ExampleA",
      email: "ExampleA",
    },
    {
      userId: 2,
      firstName: "ExampleB",
      lastName: "ExampleB",
      email: "ExampleB",
    },
  ];

  it("getUserSuccess should create GET_USER_SUCCESS", () => {
    expect(userActionTypes.getUserSuccess(users[0])).toEqual({
      type: userConstants.GET_USER_SUCCESS,
      payload: users[0],
    });
  });

  it("getUsersSuccess should create GET_USERS_SUCCESS", () => {
    expect(userActionTypes.getUsersSuccess(users)).toEqual({
      type: userConstants.GET_USERS_SUCCESS,
      payload: users,
    });
  });

  it("loginRequest should create LOGIN_REQUEST", () => {
    expect(userActionTypes.loginRequest(users[0])).toEqual({
      type: userConstants.LOGIN_REQUEST,
    });
  });

  it("loginSuccess should create LOGIN_SUCCESS", () => {
    expect(userActionTypes.loginSuccess(users[0])).toEqual({
      type: userConstants.LOGIN_SUCCESS,
      payload: users[0],
    });
  });

  it("registerRequest should create REGISTER_REQUEST", () => {
    expect(userActionTypes.registerRequest(users[0])).toEqual({
      type: userConstants.REGISTER_REQUEST,
    });
  });

  it("registerSuccess should create REGISTER_SUCCESS", () => {
    expect(userActionTypes.registerSuccess(users[0])).toEqual({
      type: userConstants.REGISTER_SUCCESS,
    });
  });

  it("updateUserSuccess should create UPDATE_USER_SUCCESS", () => {
    expect(userActionTypes.updateUserSuccess(users[0])).toEqual({
      type: userConstants.UPDATE_USER_SUCCESS,
      payload: users[0],
    });
  });

  it("deleteUserSuccess should create DELETE_USER_SUCCESS", () => {
    expect(userActionTypes.deleteUserSuccess(users[0])).toEqual({
      type: userConstants.DELETE_USER_SUCCESS,
    });
  });
});
