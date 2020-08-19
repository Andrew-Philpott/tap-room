import errorActions from "../../actions/error-actions";
import errorConstants from "../../constants/error-constants";

describe("error actions", () => {
  it("error should create ERROR", () => {
    let message = "This is a message.";
    expect(errorActions.error(message)).toEqual({
      type: errorConstants.ERROR,
      message,
    });
  });

  it("getBeersSuccess should create GET_BEERS_SUCCESS", () => {
    expect(errorActions.clear()).toEqual({
      type: errorConstants.CLEAR,
    });
  });
});
