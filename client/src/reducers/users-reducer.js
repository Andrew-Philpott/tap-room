import userConstants from "../constants/user-constants";

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
      };
    case userConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
      };
    case userConstants.GET_USERS_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
