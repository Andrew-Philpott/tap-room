export const msalConfigAAD = {
  auth: {
    clientId: process.env.REACT_APP_AAD_CLIENT_ID,
    authority: process.env.REACT_APP_AAD_AUTHORITY,
    forceRefresh: false,
    redirectUri: process.env.REACT_APP_AAD_REDIRECT,
  },
  cache: {
    cacheLocation: process.env.REACT_APP_AAD_CACHE_LOCATION,

    storeAuthStateInCookie: false,
  },
};
export const loginRequestAAD = {
  scopes: ["openid", "offline_access"],
};
export const tokenRequestAAD = {
  scopes: [process.env.REACT_APP_AAD_ACCESS_AS_USER],
};
