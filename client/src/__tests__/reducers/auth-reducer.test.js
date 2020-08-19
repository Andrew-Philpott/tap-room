import authReducer from "../../reducers/auth-reducer";
import userConstants from "../../constants/user-constants";

describe("authReducer", () => {
  let action;
  const user = {
    userId: 1,
    username: "ExampleOne",
    firstName: "ExampleOne",
    lastName: "ExampleOne",
    role: "admin",
    token: "ExampleOneToken",
  };

  test("Should return an empty object if no action type was passed into the reducer and there wasn't a user in localstorage", () => {
    expect(authReducer({}, { type: null })).toEqual({});
  });

  test("Should return loggedIn: true and user if the user key was found in localstorage", () => {
    expect(authReducer({ loggedIn: true, user }, { type: null })).toEqual({
      loggedIn: true,
      user,
    });
  });

  test("Should successfully signal that a request has been made to login", () => {
    action = {
      type: userConstants.LOGIN_REQUEST,
      payload: user,
    };
    expect(authReducer({}, action)).toEqual({
      loggingIn: true,
      user: action.payload,
    });
  });

  test("Should successfully signal that the login was a success", () => {
    action = {
      type: userConstants.LOGIN_SUCCESS,
      payload: user,
    };
    expect(authReducer({}, action)).toEqual({
      loggedIn: true,
      user: action.payload,
    });
  });

  test("Should return an empty object when logout was successful", () => {
    expect(
      authReducer(
        {},
        {
          type: userConstants.LOGOUT,
        }
      )
    ).toEqual({});
  });
});
