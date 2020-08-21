import registrationReducer from "../../reducers/registration-reducer";
import userConstants from "../../constants/user-constants";

describe("registrationReducer", () => {
  test("Should return an empty object if no action type was passed into the reducer", () => {
    expect(registrationReducer({}, { type: null })).toEqual({});
  });

  test("Should return registering: true if a register request was sent.", () => {
    expect(
      registrationReducer({}, { type: userConstants.REGISTER_REQUEST })
    ).toEqual({ registering: true });
  });

  test("Should return an empty object if registration was successful.", () => {
    expect(
      registrationReducer({}, { type: userConstants.REGISTER_SUCCESS })
    ).toEqual({});
  });
});
