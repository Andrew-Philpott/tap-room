import userConstants from "../constants/user-constants";

export default function users(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
      }
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
      }
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case userConstants.DELETE_SUCCESS:
      return {
        ...state,
      }
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case userConstants.GET_SUCCESS:
      return {
        ...state,
      }
    case userConstants.GET_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
      }
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
  }
}