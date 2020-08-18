import userConstants from "../constants/user-constants";

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
      };
    case userConstants.DELETE_SUCCESS:
      return {
        ...state,
      };
    case userConstants.GET_SUCCESS:
      return {
        ...state,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
