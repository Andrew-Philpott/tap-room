import React from "react";
import { UserAgentApplication } from "msal";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  msalConfigB2C,
  loginRequestB2C,
  tokenRequestB2C,
  forgotRequestB2C,
} from "../other/auth-config-b2c";
import {
  msalConfigAAD,
  loginRequestAAD,
  tokenRequestAAD,
} from "../other/auth-config-aad";

const AuthContext = React.createContext();

export function AuthProvider(props) {
  const msalB2C = new UserAgentApplication(msalConfigB2C);
  msalB2C.handleRedirectCallback((error, response) => {
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
        return response;
      }
    }
  });
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
  }, []);

  const signInSignOut = (isAdminView) => {
    if (isAdminView) {
      if (!auth.isAuth && !auth.isAdmin) {
        msalAAD.loginPopup(loginRequestAAD).then(handleResponse);
      } else {
        msalAAD.logout({
          account: msalAAD.getAccountByUsername(auth.userName),
        });
      }
      if (auth.isAuth && auth.isAdmin) {
        msalAAD.logout({
          account: msalAAD.getAccountByUsername(auth.userName),
        });
      }
    } else {
      if (!auth.isAuth) {
        msalB2C.loginRedirect(loginRequestB2C);
      } else {
        msalB2C.logout();
      }
    }
  };

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

  return (
    <AuthContext.Provider
      value={{
        isAuth: auth.isAuth,
        isAdmin: auth.isAdmin,
        userId: auth.userId,
        userName: auth.userName,
        roles: auth.roles,
        signInSignOut: signInSignOut,
        getToken: getToken,
      }}
      {...props}
    />
  );
}
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a Auth Provider");
  }
  return context;
}
export default { AuthProvider, useAuth };
