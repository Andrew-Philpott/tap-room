import React from "react";
import { UserAgentApplication } from "msal";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  msalConfigB2C,
  loginRequestB2C,
  tokenRequestB2C,
  forgotRequestB2C,
} from "../helpers/auth-config-b2c";
import {
  msalConfigAAD,
  loginRequestAAD,
  tokenRequestAAD,
} from "../helpers/auth-config-aad";

export default function withAuth(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userName: "",
        roles: [],
        isAuth: false,
        isAdmin: false,
        userId: 0,
        homeId: 0,
      };

      this.msalB2C = new UserAgentApplication(msalConfigB2C);
      this.AuthRedirectCallback = this.AuthRedirectCallback.bind(this);
      this.msalB2C.handleRedirectCallback(this.AuthRedirectCallback);
      this.HandleResponse = this.HandleResponse.bind(this);
      this.msalAAD = new PublicClientApplication(msalConfigAAD);
    }

    componentDidMount() {
      if (!this.state.isAuth) {
        const account = this.msalB2C.getAccount();
        if (account !== null) {
          this.setState({
            userName: account.name,
            roles: [],
            isAuth: true,
            isAdmin: false,
            userId: account.idTokenClaims.oid,
            homeId: account.homeAccountIdentifier,
          });
        }
      }
    }

    render() {
      return (
        <WrappedComponent
          signIn={(isAdmin) => this.SignIn(isAdmin)}
          signOut={(isAdmin) => this.SignOut(isAdmin)}
          getToken={() => this.GetToken()}
          userId={this.state.userId}
          userName={this.state.userName}
          isAuth={this.state.isAuth}
          isAdmin={this.state.isAdmin}
          roles={this.state.roles}
        />
      );
    }

    AuthRedirectCallback(error, response) {
      if (
        error &&
        error.errorMessage &&
        error.errorMessage.indexOf("AADB2C90118") > -1
      ) {
        try {
          this.msalB2C.loginRedirect(forgotRequestB2C);
        } catch (error) {}
      } else {
        if (response.tokenType === "access_token") {
          return response;
        }
      }
    }

    SignIn(isAdminSignIn) {
      const request = isAdminSignIn ? loginRequestAAD : loginRequestB2C;
      isAdminSignIn
        ? this.msalAAD.loginPopup(request).then(this.HandleResponse)
        : this.msalB2C.loginRedirect(request);
    }

    SignOut() {
      this.state.isAdmin === false
        ? this.msalB2C.logout()
        : this.msalAAD.logout({
            account: this.msalAAD.getAccountByUsername(this.state.userName),
          });
    }

    HandleResponse(response) {
      this.setState({
        userName: response.idTokenClaims.name,
        roles: response.idTokenClaims.roles,
        isAuth: true,
        isAdmin: true,
        userId: response.idTokenClaims.oid,
        homeId: response.account.homeAccountId,
      });
      return response;
    }

    GetToken() {
      if (this.state.isAuth === true) {
        if (this.state.isAdmin === true) {
          return this.msalAAD
            .acquireTokenSilent({
              account: this.msalAAD.getAccountByHomeId(this.state.homeId),
              scopes: tokenRequestAAD.scopes,
            })
            .catch(() => {
              return this.msalAAD.acquireTokenPopup(tokenRequestAAD);
            });
        } else {
          return this.msalB2C.acquireTokenSilent(tokenRequestB2C).catch(() => {
            this.msalB2C.acquireTokenRedirect(tokenRequestB2C);
          });
        }
      }
    }
  };
}
