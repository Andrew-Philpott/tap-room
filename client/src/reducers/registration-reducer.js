import userConstants from "../constants/user-constants";

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    default:
      return state;
  }
};
