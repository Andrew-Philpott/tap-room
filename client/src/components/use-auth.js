import React from "react";
import { UserAgentApplication } from "msal";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  msalConfigB2C,
  loginRequestB2C,
  tokenRequestB2C,
  forgotRequestB2C,
} from "../utils/auth-config-b2c";
import {
  msalConfigAAD,
  loginRequestAAD,
  tokenRequestAAD,
} from "../utils/auth-config-aad";

export default () => {
  const msalB2C = new UserAgentApplication(msalConfigB2C);
  msalB2C.handleRedirectCallback(authRedirectCallback);
  const msalAAD = new PublicClientApplication(msalConfigAAD);
  const [auth, setAuth] = React.useState({
    userName: "",
    roles: [],
    isAuth: false,
    isAdmin: false,
    userId: 0,
    homeId: 0,
  });

  React.useEffect(() => {
    if (!auth.isAuth) {
      const account = msalB2C.getAccount();
      if (account !== null) {
        setAuth({
          userName: account.name,
          roles: [],
          isAuth: true,
          isAdmin: false,
          userId: account.idTokenClaims.oid,
          homeId: account.homeAccountIdentifier,
        });
      }
    }
    console.log(auth);
  }, []);

  function signIn(isAdminSignIn) {
    const request = isAdminSignIn ? loginRequestAAD : loginRequestB2C;
    isAdminSignIn
      ? msalAAD.loginPopup(request).then(handleResponse)
      : msalB2C.loginRedirect(request);
  }

  function signOut() {
    auth.isAdmin === false
      ? msalB2C.logout()
      : msalAAD.logout({
          account: msalAAD.getAccountByUsername(auth.userName),
        });
  }

  function authRedirectCallback(error, response) {
    if (
      error &&
      error.errorMessage &&
      error.errorMessage.indexOf("AADB2C90118") > -1
    ) {
      try {
        msalB2C.loginRedirect(forgotRequestB2C);
      } catch (error) {}
    } else {
      if (response.tokenType === "access_token") {
        setAuth({
          userName: response.idTokenClaims.name,
          roles: [],
          isAuth: true,
          isAdmin: false,
          userId: response.idTokenClaims.oid,
          homeId: response.account.homeAccountId,
        });
        return response;
      }
    }
  }

  function handleResponse(response) {
    setAuth({
      userName: response.idTokenClaims.name,
      roles: response.idTokenClaims.roles,
      isAuth: true,
      isAdmin: true,
      userId: response.idTokenClaims.oid,
      homeId: response.account.homeAccountId,
    });
    return response;
  }

  const getToken = () => {
    if (auth.isAuth === true) {
      if (auth.isAdmin === true) {
        return msalAAD
          .acquireTokenSilent({
            account: msalAAD.getAccountByHomeId(auth.homeId),
            scopes: tokenRequestAAD.scopes,
          })
          .catch(() => {
            return msalAAD.acquireTokenPopup(tokenRequestAAD);
          });
      } else {
        return msalB2C.acquireTokenSilent(tokenRequestB2C).catch(() => {
          msalB2C.acquireTokenRedirect(tokenRequestB2C);
        });
      }
    }
  };

  return { auth, signIn, signOut, getToken };
};
