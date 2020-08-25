export const msalConfigB2C = {
  auth: {
    clientId: process.env.REACT_APP_B2C_CLIENT_ID,
    authority: process.env.REACT_APP_B2C_AUTHORITY,
    redirectUri: process.env.REACT_APP_AAD_REDIRECT,
    validateAuthority: false,
  },
  cache: {
    cacheLocation: process.env.REACT_APP_B2C_CACHE_LOCATION,
    storeAuthStateInCookie: false,
  },
};
export const loginRequestB2C = {
  scopes: ["openid", "profile"],
};
export const tokenRequestB2C = {
  scopes: [process.env.REACT_APP_B2C_ACCESS_AS_USER],
};
export const forgotRequestB2C = {
  scopes: [process.env.REACT_APP_B2C_FORGOT_PASSWORD],
};
