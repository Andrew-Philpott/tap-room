const initialState = {
  userName: "",
  roles: [],
  isAuth: false,
  isAdmin: false,
  userId: 0,
  homeId: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USER_FROM_STORAGE":
      return {
        ...state,
        userName: action.payload.name,
        roles: [],
        isAuth: true,
        isAdmin: false,
        userId: action.payload.idTokenClaims.oid,
        homeId: action.payload.homeAccountIdentifier,
      };
    case "SET_USER":
      return {
        ...state,
        userName: action.payload.idTokenClaims.name,
        roles: [],
        isAuth: true,
        isAdmin: false,
        userId: action.payload.idTokenClaims.oid,
        homeId: action.payload.account.homeAccountId,
      };
    default:
      return state;
  }
};
