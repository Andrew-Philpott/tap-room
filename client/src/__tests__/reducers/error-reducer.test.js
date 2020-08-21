import errorReducer from "../../reducers/error-reducer";
import errorConstants from "../../constants/error-constants";

describe("errorReducer", () => {
  let action;
  const errorMessage = "An error";

  test("Should return an empty object if no action type was passed into the reducer", () => {
    expect(errorReducer({}, { type: null })).toEqual({});
  });

  test("Should return an error message when an error is raised", () => {
    action = { type: errorConstants.ERROR, payload: errorMessage };
    expect(errorReducer({}, action)).toEqual({
      message: action.payload,
    });
  });

  test("Should clear any error message", () => {
    expect(
      errorReducer({ message: errorMessage }, { type: errorConstants.CLEAR })
    ).toEqual({});
  });
});
