import errorConstants from "../constants/error-constants";

export default (state = {}, action) => {
  switch (action.type) {
    case errorConstants.ERROR:
      return {
        message: action.payload,
      };
    case errorConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
