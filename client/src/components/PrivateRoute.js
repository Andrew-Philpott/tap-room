import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as c from "../constants/routes";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        return (
          <Redirect
            to={{ pathname: c.LANDING, state: { from: props.location } }}
          />
        );
      }

      if (roles && roles.indexOf(user.role) === -1) {
        return <Redirect to={c.LANDING} />;
      }

      return <Component user={user} {...props} />;
    }}
  />
);
